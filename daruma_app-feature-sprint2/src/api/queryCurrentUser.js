import gql from 'graphql-tag'

export default gql` 
query currentUser{
  currentUser{
    id
  }
}
`
