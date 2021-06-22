export function recordDeviceName(recordDevice){
  switch(recordDevice){
    case "application":
      return "手動入力"
    case "clova":
      return "LINE Clova"
    case "omron":
      return "オムロンコネクト"
    case "fitbit":
      return "fitbit"
    default:
      return ""
  }
}
