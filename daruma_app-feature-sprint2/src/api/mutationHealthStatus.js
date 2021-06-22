import gql from 'graphql-tag'

export default gql` 
mutation mutationHealthStatus(
  $smokingStatus:SmokingStatusType,
  $diabetesStatus:Boolean,
  $cerebrovascularDiseasStatus:Boolean,
  $heartLesionStatus:Boolean,
  $kidneySiseaseStatus:Boolean,
  $vascularLesionStatus:Boolean,
  $diseaseDeathRelativesStatus:Boolean){
  healthStatus(
    smokingStatus:$smokingStatus,
    diabetesStatus:$diabetesStatus, 
    cerebrovascularDiseasStatus:$cerebrovascularDiseasStatus, 
    heartLesionStatus:$heartLesionStatus, 
    kidneySiseaseStatus:$kidneySiseaseStatus, 
    vascularLesionStatus:$vascularLesionStatus, 
    diseaseDeathRelativesStatus:$diseaseDeathRelativesStatus){
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
`
