import gql from 'graphql-tag'

export default gql` 
mutation appleRegister($appleAuth: String!){
  appleRegister(appleAuth:$appleAuth){
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
