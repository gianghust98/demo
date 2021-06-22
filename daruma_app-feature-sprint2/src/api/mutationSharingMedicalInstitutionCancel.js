import gql from 'graphql-tag'

export default gql` 
mutation mutationSharingMedicalInstitutionCancel($medicalInstitutionUserId: Int!){
  sharingMedicalInstitutionCancel(medicalInstitutionUserId: $medicalInstitutionUserId){
    id
    setting{
      id
      name
    }
  }
}
`
