import moment from 'moment';
import gql from 'graphql-tag'

const query =  gql` 
query queryHomeLog($year: Int!,$month: Int!,$day: Int!){
  currentUser{
    id
    medalCount{
      gold
      silver
      bronze
    }
    fitbitLink{
      linked
      lastSync
    }
    omronLink{
      linked
      lastSync
    }
  }
  lifelogBloodPressures(year:$year, month:$month, day:$day){
    id
    maximum
    minimum
    pulse
    periodOfTime
    recordDevice
    inspectedAt
  }
  lifelogStepCount(year:$year, month:$month, day:$day){
    id
    stepCount
    caloriesOut
    recordDevice
    inspectedAt
  }
  lifelogSleep(year:$year, month:$month, day:$day){
    id
    sleepTime
    recordDevice
    inspectedAt
  }
  lifelogMedicineState(year:$year, month:$month, day:$day){
    id
    drinkStepDownMedicineState
    recordDevice
    inspectedAt
  }
  lifelogBodyWeight(year:$year, month:$month, day:$day){
    id
    bodyWeight
    recordDevice
    inspectedAt
  }
  lifelogBodyTemperature(year:$year, month:$month, day:$day){
    id
    bodyTemperature
    recordDevice
    inspectedAt
  }
  lifelogSaltConcentration(year:$year, month:$month, day:$day){
    id
    saltConcentration
    recordDevice
    inspectedAt
  }
  stampInfo{ 
    weeklyStamps{
      stampDate
      morning
      night
    }
    nowMedal
    nextMedal
    nextMedalRemainStamp
  }
}
`
export default query

// lifelogs(year:$year, month:$month, day:$day){
//   id
//   stepCount
//   caloriesOut
//   stepCounAchievement
//   sleepTime
//   bodyWeight
//   drinkStepDownMedicineState
//   saltConcentration
//   inspectedAt
// }