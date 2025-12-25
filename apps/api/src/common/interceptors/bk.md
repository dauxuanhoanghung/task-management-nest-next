import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isGraphQL = context.getType<GqlExecutionContext>() === 'graphql';
    const now = Date.now();

    let req: Request | undefined;
    let operationName: string | undefined;
    let variables: any;
    let query: string | undefined;
    let headers: Record<string, any> = {};

    if (isGraphQL) {
      // ---- GraphQL Context ----
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext<{ req: Request }>();
      req = ctx.req;

      const body = req?.body || {};
      operationName = body.operationName;
      variables = body.variables;
      query = body.query;
      headers = req?.headers ?? {};
    } else {
      // ---- HTTP / REST Context ----
      req = context.switchToHttp().getRequest<Request>();
      headers = req?.headers ?? {};
      operationName = `${req.method} ${req.url}`;
      variables = req.body;
    }

    // Avoid leaking tokens or massive payloads
    const safeVariables =
      variables && Object.keys(variables).length
        ? JSON.parse(
            JSON.stringify(variables, (key, value) => {
              if (key.toLowerCase().includes('password')) return '******';
              if (key.toLowerCase().includes('token')) return '******';
              return value;
            }),
          )
        : undefined;

    // Log request only if enabled
    if (process.env.LOG_REQUESTS !== 'false') {
      this.logger.log(
        [
          '→ REQUEST',
          `Operation: ${operationName ?? 'Anonymous'}`,
          isGraphQL && query
            ? `Query: ${query.trim().slice(0, 400)}${query.length > 400 ? '…' : ''}`
            : undefined,
          safeVariables
            ? `Variables: ${JSON.stringify(safeVariables)}`
            : undefined,
          `Headers: ${JSON.stringify({
            authorization: headers['authorization'] ? '[REDACTED]' : null,
            'user-agent': headers['user-agent'] || null,
          })}`,
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now;
        if (process.env.LOG_RESPONSES !== 'false') {
          this.logger.log(
            [
              '← RESPONSE',
              `Operation: ${operationName ?? 'Anonymous'}`,
              `Time: ${responseTime}ms`,
              data
                ? `Data: ${JSON.stringify(data).slice(0, 500)}${JSON.stringify(data).length > 500 ? '…' : ''}`
                : '',
            ]
              .filter(Boolean)
              .join('\n'),
          );
        }
      }),
      catchError((err) => {
        const responseTime = Date.now() - now;
        this.logger.error(
          [
            '⚠ ERROR RESPONSE',
            `Operation: ${operationName ?? 'Anonymous'}`,
            `Time: ${responseTime}ms`,
            `Message: ${err.message}`,
          ].join('\n'),
        );
        throw err;
      }),
    );
  }
}
