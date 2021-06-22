import gql from 'graphql-tag'

export default gql` 
mutation lineLogin($lineAuth: String!){
  lineLogin(lineAuth:$lineAuth){
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
