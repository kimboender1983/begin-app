import gql from 'graphql-tag'

export const REMOVE_USERS_MUTATION = gql`
  mutation removeUsers($ids: [ID!]!) {
    removeUsers(ids: $ids) {
      status
    }
  }
`
