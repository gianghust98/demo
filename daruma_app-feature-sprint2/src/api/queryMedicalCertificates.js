import gql from 'graphql-tag'

export default gql` 
query queryMedicalCertificates($year: Int, $month: Int, $day: Int){
  medicalCertificates(year:$year, month:$month, day:$day){
    id
    bodyHeight
    bodyWeight
    bodyWaist
    maximum
    minimum
    pulse
    hdlCholesterol
    ldlCholesterol
    totalCholesterol
    neutralFat
    bloodSugarLevel
    bloodSugarLevelMeasureState
    hba1c
    inspectedAt
  }
}
`
