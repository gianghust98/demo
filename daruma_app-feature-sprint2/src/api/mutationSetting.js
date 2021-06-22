import gql from 'graphql-tag'

export default gql` 
mutation mutationSetting(
  $showStepDownMedicineState: Boolean,
  $showBodyWeight:Boolean,
  $showSaltConcentration: Boolean,
  $showBodyTemperature: Boolean) {
  setting(
    showStepDownMedicineState: $showStepDownMedicineState,
    showBodyWeight:$showBodyWeight,
    showSaltConcentration:$showSaltConcentration,
    showBodyTemperature:$showBodyTemperature){
      id
      showStepDownMedicineState
      showBodyWeight
      showSaltConcentration
      showBodyTemperature
  }
}
`
