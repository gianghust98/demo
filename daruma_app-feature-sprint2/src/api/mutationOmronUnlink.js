import gql from 'graphql-tag'

export default gql` 
mutation mutationOmronUnlink{
   omronUnlink{
    id
    omronLink{
      linked
      lastSync
    }
  }
}
`
