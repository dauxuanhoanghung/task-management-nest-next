import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql",
  documents: ["./gql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/api.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
};

export default config;
