import gql from 'graphql-tag'

export default gql` 
mutation mutationProfile(
  $postalCode: String,
  $gender: GenderType,
  $birthYear: Int,
  $showStepDownMedicineState: Boolean,
  $smokingStatus:SmokingStatusType,
  $diabetesStatus:Boolean,
  $cerebrovascularDiseasStatus:Boolean,
  $heartLesionStatus:Boolean,
  $kidneySiseaseStatus:Boolean,
  $vascularLesionStatus:Boolean,
  $diseaseDeathRelativesStatus:Boolean) {
  profile(
    postalCode: $postalCode,
    gender: $gender,
    birthYear: $birthYear,
    showStepDownMedicineState: $showStepDownMedicineState,
    smokingStatus:$smokingStatus,
    diabetesStatus:$diabetesStatus, 
    cerebrovascularDiseasStatus:$cerebrovascularDiseasStatus, 
    heartLesionStatus:$heartLesionStatus, 
    kidneySiseaseStatus:$kidneySiseaseStatus, 
    vascularLesionStatus:$vascularLesionStatus, 
    diseaseDeathRelativesStatus:$diseaseDeathRelativesStatus){
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
