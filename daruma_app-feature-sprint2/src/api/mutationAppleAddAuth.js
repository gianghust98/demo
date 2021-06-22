import gql from 'graphql-tag'

export default gql` 
mutation appleAddAuth($appleAuth: String!){
  appleAddAuth(appleAuth:$appleAuth){
    id
    isAuthApple
    isAuthLine
  }
}
`
