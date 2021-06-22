/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { scale } from '../utils/Scaling'
import moment from '../utils/moment'
import { Colors } from '../styles'

export default class CustomBarChart extends Component {
  getChartData = (data, dateLength, columnName) => {
    const chartData = []
    const calcMaxArr = []
    if (data && data.length && dateLength && columnName) {
      for (let i = 0; i < dateLength; i += 1) {
        const oneDayData = data.filter(elm => (moment(elm.inspectedAt).date() - 1 === i))
        // 1日に複数回記録されている場合、グラフに表示するのは1日の平均値にする。
        if (oneDayData.length > 0) {
          const oneDayDataValues = oneDayData.map(elm => elm[columnName])
          const sum = oneDayDataValues.reduce((prev, current) => prev + current)
          const avr = sum / oneDayDataValues.length
          const result = this.props.isHour ? avr / 60 : avr
          chartData.push({ value: result })
          calcMaxArr.push(result)
        } else {
          chartData.push({ value: undefined }) // ただの配列の形ではなく{ key : value }の形にしているのは、配列の形で最初の要素がundefinedだと(例えば[undefined, 2, 2.4, 1]など)、<BarChart />に渡した時にエラーになるため
          calcMaxArr.push(0) // 描画対象のデータの要素の最大値が、ある一定の数a以下の場合y軸の最大値をaにして、データの要素の最大値がaより上の場合はデータの要素の最大値をy軸の最大値に設定するための、最大値算出用の配列
        }
      }
      return { chartData, calcMaxArr }
    }
    for (let i = 0; i < dateLength; i += 1) {
      chartData.push({ value: undefined })
      calcMaxArr.push(0)
    }
    return { chartData, calcMaxArr }
  }
  render() {
    const {
      yMax, columnName, data, date, yMarksSize, yLabel, yAxisWidth,
    } = this.props
    const dateLength = moment(date).endOf('month').date()
    const { chartData, calcMaxArr } = this.getChartData(data, dateLength, columnName)
    const maxNum = Math.max(...calcMaxArr)
    const max = yMax && maxNum <= yMax ? yMax : maxNum
    const min = 0
    const ticks = 5
    const yAxisInset = {
      top: 10, bottom: 20, left: 0, right: 0,
    }
    const xAxisInset = {
      left: 5, right: 5,
    }
    const barChartInset = {
      top: 10, bottom: 10, left: 0, right: 0,
    }
    const yAxisSvg = {
      fill: 'black',
      fontSize: yMarksSize || 12,
      fontWeight: '500',
    }
    const xAxisSvg = {
      fill: 'black',
      fontSize: 12,
    }
    const barChartSvg = {
      stroke: Colors.LAPALMA,
      fill: 'rgba(154,212,135,0.6)',
    }
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 12 }}>{yLabel}
        </Text>
        <View style={{ height: 400, flexDirection: 'row', marginTop: 5 }}>
          <YAxis
            style={{ width: yAxisWidth }}
            data={chartData}
            contentInset={yAxisInset}
            max={max}
            min={min}
            numberOfTicks={ticks}
            yAccessor={({ item }) => item.value}
            svg={yAxisSvg}
            formatLabel={value => `${value}`} />
          <View
            style={{
              height: '100%', flex: 1, marginRight: 15, marginLeft: 10,
          }} >
            <BarChart
              key={`${Math.random()}`}
              data={chartData}
              contentInset={barChartInset}
              yMax={max}
              yMin={min}
              numberOfTicks={ticks}
              yAccessor={({ item }) => item.value}
              svg={barChartSvg}
              style={{ flex: 1 }}>
              <Grid />
            </BarChart>
            <XAxis
              data={chartData}
              contentInset={xAxisInset}
              formatLabel={(value, index) => (index % 5 === 0 ? index + 1 : null)}
              svg={xAxisSvg} />
          </View>
          <Text
            style={{
              fontSize: 12, position: 'absolute', bottom: scale(2), right: 0,
          }}>
          日
          </Text>
        </View>
      </View>
    )
  }
}

CustomBarChart.propTypes = {
  date: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
  columnName: PropTypes.string.isRequired,
  yMax: PropTypes.number,
  yLabel: PropTypes.string,
  yAxisWidth: PropTypes.number,
  isHour: PropTypes.bool,
}
CustomBarChart.defaultProps = {
  yMax: null,
  yLabel: null,
  yAxisWidth: null,
  isHour: false,
}
