import gql from 'graphql-tag'

export default gql` 
mutation mutationOmronToken($omronAuth: String!){
  omronToken(omronAuth: $omronAuth){
    id
    omronLink{
      linked
      lastSync
    }
  }
}
`
