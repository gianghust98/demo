import gql from 'graphql-tag'

export default gql` 
mutation mutationLifelogMedicineState($inspectedAt: Date!,$drinkStepDownMedicineState: Boolean!){
  lifelogMedicineState(inspectedAt:$inspectedAt, drinkStepDownMedicineState: $drinkStepDownMedicineState){
    id
    drinkStepDownMedicineState
    recordDevice
    inspectedAt
  }
}
`
