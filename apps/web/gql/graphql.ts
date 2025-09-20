/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AccountModel = {
  __typename?: 'AccountModel';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: AccountStatus;
  updatedAt: Scalars['DateTime']['output'];
};

/** The status of the account */
export enum AccountStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: AccountModel;
  createUser: UserModel;
  deleteAccount: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
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
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateAccountArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAccountInput;
};

export type Query = {
  __typename?: 'Query';
  findActiceAccount: Array<AccountModel>;
  findAllAccounts: Array<AccountModel>;
  findByEmailAccount: AccountModel;
  findByIdAccount: AccountModel;
  getUser?: Maybe<UserModel>;
  getUsers: Array<UserModel>;
};


export type QueryFindByEmailAccountArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindByIdAccountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};

export type UpdateAccountInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AccountStatus>;
};

export type UserModel = {
  __typename?: 'UserModel';
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AccountModel = {
  __typename?: 'AccountModel';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: AccountStatus;
  updatedAt: Scalars['DateTime']['output'];
};

/** The status of the account */
export enum AccountStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: AccountModel;
  createUser: UserModel;
  deleteAccount: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
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
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateAccountArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAccountInput;
};

export type Query = {
  __typename?: 'Query';
  findActiceAccount: Array<AccountModel>;
  findAllAccounts: Array<AccountModel>;
  findByEmailAccount: AccountModel;
  findByIdAccount: AccountModel;
  getUser?: Maybe<UserModel>;
  getUsers: Array<UserModel>;
};


export type QueryFindByEmailAccountArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindByIdAccountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};

export type UpdateAccountInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AccountStatus>;
};

export type UserModel = {
  __typename?: 'UserModel';
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
};
