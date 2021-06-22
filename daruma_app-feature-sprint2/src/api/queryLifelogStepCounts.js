import gql from 'graphql-tag'

export default gql` 
query queryLifelogStepCounts($year: Int!,$month: Int!){
  lifelogStepCounts(year:$year, month:$month){
    id
    stepCount
    caloriesOut
    recordDevice
    inspectedAt
  }
}
`
