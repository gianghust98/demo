import gql from 'graphql-tag'

export default gql` 
mutation lineRegister($lineAuth: String!){
  lineRegister(lineAuth:$lineAuth){
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
