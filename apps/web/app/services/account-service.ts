'use server'

import { getClient } from '@/lib/apollo-client'
import { RegisterDocument, AccountModel, LoginDocument, LoginInput, RegisterInput, LoginMutation, RegisterMutation } from '@/gql'


export const register = async (
  input: RegisterInput
): Promise<RegisterMutation["register"] | null> => {
  const client = getClient()

  try {
    const { data } = await client.mutate({
      mutation: RegisterDocument,
      variables: { input },
    })

    return data?.register ?? null
  } catch (error) {
    console.error('❌ Register API error:', error)
    throw error
  }
}

export const login = async (
  input: LoginInput
): Promise<LoginMutation["login"] | null> => {
  const client = getClient()

  try {
    const { data } = await client.mutate({
      mutation: LoginDocument,
      variables: { input },
    })

    return data?.login ?? null
  } catch (error: any) {
    // ApolloError có thể chứa nhiều lỗi GraphQL
    const gqlError = error?.graphQLErrors?.[0]?.message
    const networkError = error?.networkError?.message

    const message =
      gqlError || networkError || error.message || "Unexpected login error"

    console.error("❌ Login API error:", message)
    throw new Error(message)
  }
}