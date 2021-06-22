import gql from 'graphql-tag'

export default gql` 
mutation appleLogin($appleAuth: String!){
  appleLogin(appleAuth:$appleAuth){
    accessToken
    user{
      id
      medicalCertificates{
        id
      }
    }
    now
  }
}
`
