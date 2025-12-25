# Default Handlebars templates

## Location

- Source: `apps/api/src/templates`
- Build output: `apps/api/dist/templates` (copied via `nest-cli.json` assets)

## Usage modes

- Application service compiled templates (recommended):
  - Store editable templates in DB.
  - Use `templateCode` in DB (e.g. `verify-user`) and render via `MailSenderService.sendTemplatedEmail`.
  - Default .hbs files here serve as fallbacks/reference content for initial seeding.

- Direct Mailer template rendering (infrastructure shortcut):
  - Call `IMailSenderService.sendTemplatedMail({ templateCode, context, ... })`.
  - The `templateCode` should match a file name in this folder (without extension).

## Conventions

- File name must equal `templateCode` (e.g., `verify-user.hbs` → `templateCode = "verify-user"`).
- Use Handlebars variables like `{{userName}}`, `{{actionUrl}}`.
- Inline styles are supported by the application flow (DB templates) by placing CSS in the template `style` field. For file-based templates, include a `<style>` tag at the top.

## Samples

- `verify-user.hbs`: Email verification message.
- `welcome.hbs`: Simple welcome email.

## Seeding suggestion

At boot, you can read these files and seed initial DB templates if they don't exist. This repo doesn't include a seeder by default.
