import gql from 'graphql-tag'

export default gql` 
query queryProfile{
  currentUser{
    id
    healthStatus{
      id
      smokingStatus
      diabetesStatus
      cerebrovascularDiseasStatus
      heartLesionStatus
      kidneySiseaseStatus
      vascularLesionStatus
      diseaseDeathRelativesStatus
    }
  }
}
`
