import gql from 'graphql-tag'

export default gql` 
query queryWearableDevice{
  currentUser{
    id
    fitbitLink{
      linked
      lastSync
    }
    omronLink{
      linked
      lastSync
    }
  }
}
`
