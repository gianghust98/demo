import gql from 'graphql-tag'

export default gql` 
query queryLifelogSaltConcentrations($year: Int!,$month: Int!){
  lifelogSaltConcentrations(year:$year, month:$month){
    id
    saltConcentration
    recordDevice
    inspectedAt
  }
}
`
