import gql from 'graphql-tag'

export default gql` 
mutation mutationLifelogBodyTemperature($inspectedAt: Date!,$bodyTemperature: Float!){
  lifelogBodyTemperature(inspectedAt:$inspectedAt, bodyTemperature: $bodyTemperature){
    id
    bodyTemperature
    recordDevice
    inspectedAt
  }
}
`
