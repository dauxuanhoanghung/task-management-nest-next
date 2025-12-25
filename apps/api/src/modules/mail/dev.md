```ts
  providers: [
    {
      provide: SMTP_CONFIG,
      useValue: {
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'user',
          pass: 'pass',
        },
      } satisfies SmtpConfig,
    },
  ],
```

Can use this way to import in feature