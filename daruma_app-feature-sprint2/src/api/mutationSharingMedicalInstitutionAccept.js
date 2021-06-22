import gql from 'graphql-tag'

export default gql` 
mutation mutationSharingMedicalInstitutionAccept($medicalInstitutionUserId: Int!){
  sharingMedicalInstitutionAccept(medicalInstitutionUserId: $medicalInstitutionUserId){
    id
    setting{
      id
      name
    }
  }
}
`
