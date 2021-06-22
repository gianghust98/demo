import gql from 'graphql-tag'

export default gql` 
mutation mutationLifelogSaltConcentration($inspectedAt: Date!,$saltConcentration: Float){
  lifelogSaltConcentration2(inspectedAt:$inspectedAt, saltConcentration: $saltConcentration){
    id
    saltConcentration
    recordDevice
    inspectedAt
  }
}
`
