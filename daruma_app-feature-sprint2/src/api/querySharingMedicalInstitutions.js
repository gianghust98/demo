import gql from 'graphql-tag'

export default gql` 
query querySharingMedicalInstitutions{
  currentUser{
    id
    setting{
      id
      sharelingCode
    }
  }
  sharingMedicalInstitutions{
    id
    setting{
      id
      name
    }
  }
}
`
