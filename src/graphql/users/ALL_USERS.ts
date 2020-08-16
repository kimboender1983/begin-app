import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query allUsers {
    users {
      id
      first_name
      last_name
      email
      avatar
      active
    }
  }
`
