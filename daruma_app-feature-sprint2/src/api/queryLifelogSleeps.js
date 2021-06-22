import gql from 'graphql-tag'

export default gql` 
query queryLifelogSleeps($year: Int!,$month: Int!){
  lifelogSleeps(year:$year, month:$month){
    id
    sleepTime
    recordDevice
    inspectedAt
  }
}
`
