import gql from 'graphql-tag'

export default gql` 
mutation mutationSharingMedicalInstitutionRemove($medicalInstitutionUserId: Int!){
  sharingMedicalInstitutionRemove(medicalInstitutionUserId: $medicalInstitutionUserId){
    id
    setting{
      id
      name
    }
  }
}
`
