import gql from 'graphql-tag'

export default gql` 
query queryInformations($cursors: [CursorInput]){
  informations(cursors: $cursors){
    cursors{
      col
      value
    }
    hasNext
    list{
      id
      readAt
      message
      createdAt
      informationMessage{
        id
        title
        iconUrl
        linkText
        linkUrl
      }
    }
  }
}
`
