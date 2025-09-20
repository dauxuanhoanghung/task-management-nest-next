import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql",
  documents: ["gql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    /*
     * Example of index-style generation where all types and hooks go to one file.
     * Once migrated, you can remove this completely
     */
    // 'src/generated/types-and-hooks.ts': {
    //  plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    // },

    // "graphql/": defineConfig({
    //   tsConfigFilePath: "./tsconfig.json",
    //   gqlTag: {
    //     name: "graphql",
    //     importFrom: "./gql",
    //     importType: "relative",
    //   },
    //   hooksImportFrom: "@apollo/client/react", // Use @apollo/client for v3
    // }),
    "./gql/": {
      preset: "near-operation-file-preset",
    },
  },
};

export default config;
