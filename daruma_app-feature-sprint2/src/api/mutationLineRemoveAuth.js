import gql from 'graphql-tag'

export default gql` 
mutation lineRemoveAuth{
  lineRemoveAuth{
    id
    isAuthApple
    isAuthLine
  }
}
`
