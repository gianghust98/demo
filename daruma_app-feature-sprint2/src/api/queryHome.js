import gql from 'graphql-tag'

export default gql` 
query queryHome{
  currentUser{
    id
    setting{
      id
      sharelingCode
      gender
      postalCode
      birthYear
      showBodyWeight
      showSaltConcentration
      showStepDownMedicineState
      showBodyTemperature
    }
  }
  unreadInformationCount
  now
}
`
