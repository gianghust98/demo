import gql from 'graphql-tag'

export default gql` 
mutation mutationLifelogBodyWeight($inspectedAt: Date!,$bodyWeight: Float){
  lifelogBodyWeight(inspectedAt:$inspectedAt, bodyWeight: $bodyWeight){
    id
    bodyWeight
    recordDevice
    inspectedAt
  }
}
`
