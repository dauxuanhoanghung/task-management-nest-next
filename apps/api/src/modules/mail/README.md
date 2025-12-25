```sh Structure
./src/modules/mail/
├── application
│   ├── dto
│   │   ├── create-email-template.dto.ts
│   │   ├── send-email.dto.ts
│   │   └── update-email-template.dto.ts
│   └── services
│       ├── email-template.service.ts # CRUD template
│       └── mail.service.ts # email template sender (both text, html)
├── domain
│   ├── entities
│   │   ├── email-template.entity.ts
│   │   ├── email-template.factory.ts
│   │   ├── email-template.interface.ts # Email template interface
│   │   ├── mail-message.builder.ts
│   │   └── mail-message.ts # Object to
│   ├── ports
│   │   ├── mail-transport.interface.ts
│   │   └── template-engine.interface.ts
│   ├── repositories
│   │   └── email-template.repository.interface.ts
│   └── value-objects
│       ├── mail-address.vo.ts
│       ├── mail-attachment.vo.ts
│       └── mail-header.vo.ts
├── infrastructure
│   ├── mappers # mappers between domain entities - schema
│   │   └── email-template.mapper.ts
│   ├── persistence
│   │   ├── repositories # implement domain/repositories
│   │   │   └── email-template.repository.ts
│   │   └── schemas # Use TypeORM for storing data to DB
│   │       └── email-template.schema.ts
│   ├── template-engines # implement template-engine.interface.ts
│   │   └── handlebars.engine.ts
│   └── transports # implement mail-transport.interface.ts
│       ├── console.transport.ts
│       ├── sendmail.transport.ts
│       └── smtp.transport.ts
├── mail.module.ts # Module declaration (forRoot, forRootAsync, provide default for global scope)
└── presentation
    ├── graphql # Expose GraphQL API
    │   ├── inputs # GraphQL inputs
    │   │   ├── create-email-template.input.ts
    │   │   ├── send-email.input.ts
    │   │   └── update-email-template.input.ts
    │   ├── models # GraphQL models
    │   │   └── email-template.model.ts
    │   └── resolvers # GraphQL resolvers
    │       └── email-template.resolver.ts
    └── rest # Expose REST API
        └── email-template.controller.ts
```
