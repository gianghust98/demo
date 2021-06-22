import gql from 'graphql-tag'

export default gql` 
query queryProfile{
  currentUser{
    id
    setting{
      id
      gender
      birthYear
      postalCode
      gender
      birthYear
      showStepDownMedicineState
    }
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
