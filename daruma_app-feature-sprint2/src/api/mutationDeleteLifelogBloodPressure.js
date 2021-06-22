import gql from 'graphql-tag'

export default gql` 
mutation mutationDeleteLifelogBloodPressure($id:Int!){
  deleteLifelogBloodPressure(id: $id){
    id
    maximum
    minimum
    pulse
    inspectedAt
  }
}
`