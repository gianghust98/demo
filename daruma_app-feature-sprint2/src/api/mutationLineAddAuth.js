import gql from 'graphql-tag'

export default gql` 
mutation lineAddAuth($lineAuth: String!){
  lineAddAuth(lineAuth:$lineAuth){
    id
    isAuthApple
    isAuthLine
  }
}
`
