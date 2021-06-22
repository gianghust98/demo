import gql from 'graphql-tag'

export default gql` 
mutation mutationDeleteMedicalCertificate(
  $id:Int!){
  deleteMedicalCertificate(
    id:$id){
      id
      inspectedAt
    }
  }

`
