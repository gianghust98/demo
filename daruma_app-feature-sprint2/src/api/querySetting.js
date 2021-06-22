import gql from 'graphql-tag'

export default gql` 
query queryProfile{
  currentUser{
    id
    setting{
      id
      showStepDownMedicineState
      showBodyWeight
      showSaltConcentration
      showBodyTemperature
    }
  }
}
`
