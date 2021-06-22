import gql from 'graphql-tag'

export default gql` 
mutation mutationReadInformation($informationId:Int!){
  readInformation(informationId:$informationId){
    id
    readAt
  }
}
`
