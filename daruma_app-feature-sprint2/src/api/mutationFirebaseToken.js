import gql from 'graphql-tag'

export default gql` 
mutation mutationFirebaseToken($firebaseToken: String!){
  firebaseToken(firebaseToken: $firebaseToken){
    id
  }
}
`
