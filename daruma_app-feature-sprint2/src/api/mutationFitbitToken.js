import gql from 'graphql-tag'

export default gql` 
mutation mutationFitbitToken($fitbitAuth: String!){
  fitbitToken(fitbitAuth: $fitbitAuth){
    id
    fitbitLink{
      linked
      lastSync
    }
  }
}
`
