import gql from 'graphql-tag'

export default gql` 
query queryLifelogBodyTemperatures($year: Int!,$month: Int!){
  lifelogBodyTemperatures(year:$year, month:$month){
    id
    bodyTemperature
    recordDevice
    inspectedAt
  }
}
`
