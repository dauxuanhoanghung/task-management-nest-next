import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.org/graphql/",
  documents: ["example/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./example/": {
      preset: "client",
    },
  },
};

export default config;
