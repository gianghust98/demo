import gql from 'graphql-tag'

export default gql` 
mutation mutationSyncOmron($syncData: Date!){
  syncOmron(syncData: $syncData){
    id
  }
}
`
