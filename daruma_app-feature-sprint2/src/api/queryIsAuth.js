import gql from 'graphql-tag'

export default gql` 
query queryIsAuth{
  currentUser{
    id
    isAuthApple
    isAuthLine
  }
}
`
