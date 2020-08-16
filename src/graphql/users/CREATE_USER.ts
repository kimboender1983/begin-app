import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $avatar: String!
    $active: Boolean!
  ) {
    createUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      avatar: $avatar
      active: $active
    ) {
      id
      first_name
      last_name
      email
      avatar
      active
    }
  }
`
