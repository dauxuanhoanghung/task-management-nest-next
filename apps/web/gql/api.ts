import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AccountModel = {
  __typename?: "AccountModel";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  status: AccountStatus;
  updatedAt: Scalars["DateTime"]["output"];
};

/** The status of the account */
export enum AccountStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
}

export type CreateAccountInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type CreateUserInput = {
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAccount: AccountModel;
  createUser: UserModel;
  deleteAccount: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  login: AccountModel;
  updateAccount: AccountModel;
};

export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteAccountArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationUpdateAccountArgs = {
  id: Scalars["Int"]["input"];
  input: UpdateAccountInput;
};

export type Query = {
  __typename?: "Query";
  findActiceAccount: Array<AccountModel>;
  findAllAccounts: Array<AccountModel>;
  findByEmailAccount: AccountModel;
  findByIdAccount: AccountModel;
  getUser?: Maybe<UserModel>;
  getUsers: Array<UserModel>;
};

export type QueryFindByEmailAccountArgs = {
  email: Scalars["String"]["input"];
};

export type QueryFindByIdAccountArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["Float"]["input"];
};

export type UpdateAccountInput = {
  password?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<AccountStatus>;
};

export type UserModel = {
  __typename?: "UserModel";
  firstName: Scalars["String"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  isActive: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{
    __typename?: "UserModel";
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
  }>;
};

export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "isActive" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
