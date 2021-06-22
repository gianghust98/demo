import gql from 'graphql-tag'

export default gql` 
query queryBloodPressureLogs($year: Int, $month: Int, $day: Int){
  bloodPressureLogs(year:$year, month:$month, day:$day){
    id
    maximum
    minimum
    pulse
    periodOfTime
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
