import gql from 'graphql-tag'

export default gql` 
mutation appleRemoveAuth{
  appleRemoveAuth{
    id
    isAuthApple
    isAuthLine
  }
}
`
