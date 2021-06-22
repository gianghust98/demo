import gql from 'graphql-tag'

export default gql` 
mutation mutationAddLifelogBloodPressure($inspectedAt: Date!, $maximum: Int, $minimum: Int, $pulse: Int){
  addLifelogBloodPressure(inspectedAt: $inspectedAt,  maximum: $maximum, minimum: $minimum, pulse: $pulse){
    id
    maximum
    minimum
    pulse
    periodOfTime
    inspectedAt
  }
}
`
