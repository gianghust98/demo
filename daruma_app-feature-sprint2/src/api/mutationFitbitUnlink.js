import gql from 'graphql-tag'

export default gql` 
mutation mutationFitbitUnlink{
  fitbitUnlink{
    id
    fitbitLink{
      linked
      lastSync
    }
  }
}
`
