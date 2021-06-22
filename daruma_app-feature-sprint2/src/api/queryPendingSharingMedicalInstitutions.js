import gql from 'graphql-tag'

export default gql` 
query queryPendingSharingMedicalInstitutions{
  pendingSharingMedicalInstitutions{
    id
    setting{
      id
      name
    }
  }
}
`
