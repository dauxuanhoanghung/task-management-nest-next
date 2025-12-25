import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AccountModule } from './modules/account/account.module';
import { SmtpTransport } from './modules/mail/infrastructure/transports/smtp.transport';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.dev'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isLocal =
          configService.get<string>('MODE', 'dev').toLowerCase() === 'dev';

        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          autoLoadEntities: true,
          synchronize: true,
          logging: isLocal,
          logger: isLocal ? 'advanced-console' : undefined,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          graphiql: false,
          playground: false,
          path: '/graphql',
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
      },
    }),
    MailModule.forRoot({
      useFactory: (config: ConfigService) =>
        new SmtpTransport({
          host: config.get<string>('MAIL_HOST', ''),
          port: config.get<number>('MAIL_PORT', 587),
          auth: {
            user: config.get<string>('MAIL_USER', ''),
            pass: config.get<string>('MAIL_PASS', ''),
          },
        }),
      inject: [ConfigService],
      config: {
        from: 'noreply@app.com',
      },
    }),
    UserModule,
    AccountModule,
  ],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
