import gql from 'graphql-tag'

export default gql` 
mutation mutationEditLifelogBloodPressure($id:Int!, $inspectedAt: Date, $maximum: Int, $minimum: Int, $pulse: Int){
  editLifelogBloodPressure(id: $id, inspectedAt: $inspectedAt,  maximum: $maximum, minimum: $minimum, pulse: $pulse){
    id
    maximum
    minimum
    pulse
    periodOfTime
    inspectedAt
  }
}
`
33