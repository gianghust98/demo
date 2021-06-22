import moment from 'moment';
import gql from 'graphql-tag'

const query =  gql` 
query queryLifelogBloodPressures($year: Int!,$month: Int!,$day: Int){
  lifelogBloodPressures(year:$year, month:$month, day:$day){
    id
    maximum
    minimum
    pulse
    recordDevice
    inspectedAt
  }
  currentUser{
    id
    baseLine{
      maximum
      minimum
    }
  }
}
`
export default query