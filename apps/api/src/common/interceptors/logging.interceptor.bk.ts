import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const req = gqlCtx.getContext<{ req: Request }>().req;

    const { operationName, variables, query } = req.body;
    const headers = req.headers;
    const now = Date.now();

    this.logger.log('=> REQUEST');
    console.log(`Operation: ${operationName ?? 'Anonymous'}`);
    if (query) console.log('Query:', query.trim());
    if (variables && Object.keys(variables).length) {
      console.log('Variables:', variables);
    }
    console.log('Headers:', {
      authorization: headers['authorization'] || null,
      'user-agent': headers['user-agent'] || null,
    });
    console.log('\n');

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now;
        console.log('\n');
        console.log('=> RESPONSE');
        console.log(`Operation: ${operationName ?? 'Anonymous'}`);
        console.log(`Time: ${responseTime}ms`);
        console.log('Data:', data);
        console.log('\n');
      }),
    );
  }

  private isAllowedLogging(): boolean {
    return process.env.LOG_RESPONSES !== 'false';
  }
}
