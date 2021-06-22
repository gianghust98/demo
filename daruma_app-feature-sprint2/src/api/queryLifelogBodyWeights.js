import gql from 'graphql-tag'

export default gql` 
query queryLifelogBodyWeights($year: Int!,$month: Int!){
  lifelogBodyWeights(year:$year, month:$month){
    id
    bodyWeight
    recordDevice
    inspectedAt
  }
}
`
