import gql from 'graphql-tag'

export default gql` 
mutation mutationDeleteUser{
  deleteUser{
    id
  }
}
`
