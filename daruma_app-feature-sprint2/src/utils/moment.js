import moment from 'moment-timezone'
// import 'moment/locale/ja';
// moment.locale('ja');

moment.tz.setDefault('Asia/Tokyo')

export default moment

let serverDiffTimer = 0
export function setServerTime(serverNowMoment){
  serverDiffTimer = serverNowMoment.unix() - moment().unix()
}
export function getServerMoment() {
  return moment().add(serverDiffTimer, "seconds")
}

export function betweenDate(year, month, day) {
  const startDate = moment([year, month && month - 1 || 0, day || 1])
  let endtDate = startDate.clone()
  endtDate = endtDate.endOf(day && 'day' || month && 'month' || 'year')
  return { startDate, endtDate }
}

export function periodOfTime(moment) {
  const hour = moment.hours()
  let period = 'other'
  if (hour >= 4 && hour < 12) {
    period = 'morning'
  } else if (hour < 2 || hour >= 19) {
    period = 'night'
  }
  return period
}
