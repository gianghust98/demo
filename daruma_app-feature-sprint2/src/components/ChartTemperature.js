import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native'
import Svg, {
  Text as SVGText,
  Path,
  Line,
  Circle,
  G,
} from 'react-native-svg'
import PropTypes from 'prop-types'
import { scale } from '../utils/Scaling'
import moment from '../utils/moment'
import { Colors, Theme } from '../styles'

const deviceWidth = Dimensions.get('window').width
const Y_MARKS = [33.0, 33.5, 34.0, 34.5, 35.0, 35.5, 36.0, 36.5, 37.0, 37.5, 38.0, 38.5, 39.0, 39.5, 40.0, 40.5, 41, 41.5, 42, 42.5, 43]
// const Y_MARKS = [0, 30, 42, 47]
const Y_MARKS_WIDTH = 35
const MARGIN_VERTICAL = 40
const MARGIN_HORIZONTAL = 15
const CHART_INSET = 15
const WIDTH = (deviceWidth - (Y_MARKS_WIDTH + (MARGIN_HORIZONTAL * 2))) // gridのwidth
const CHART_WIDTH = WIDTH - (CHART_INSET * 2) // gridの両端ギリギリは開けてグラフを描画したいため
const CHART_HEIGHT = Math.max(...Y_MARKS)
const Y_SCALE = 9
const HEIGHT = (CHART_HEIGHT * Y_SCALE) + (MARGIN_VERTICAL * 3.3) // svgのheight

export default class ChartTemperature extends Component {
  getXAxisMarks(dateLength) {
    if (!dateLength) return null
    const xAxisMarks = []
    for (let i = 0; i < dateLength; i += 1) {
      if (i === 0 || i % 5 === 0) {
        xAxisMarks.push(<SVGText
          key={`text${i}`}
          fontSize="14"
          fontWeight="500"
          stroke={Colors.Black}
          x={this.convertXValue(i, dateLength)}
          textAnchor="middle">{(i + 1).toString()}
        </SVGText>)
      }
    }
    return xAxisMarks
  }

  getXAxis() {
    const xAxis = Y_MARKS.map((elm) => {
      const value = this.convertYValue(elm)
      const strokeColor = elm === 0 ? Colors.DARKGRAY : Colors.LIGHTGRAY
      return (
        <Line
          key={`${value}line${Math.random()}`}
          x1="0"
          x2={WIDTH}
          y1={value}
          y2={value}
          stroke={strokeColor}
          strokeWidth="1" />
      )
    })
    return xAxis
  }

  getYAxisMarks() {
    const yAxisMarks = Y_MARKS.map((elm) => {
      const value = this.convertYValue(elm)
      return (
        <SVGText
          stroke={Colors.Black}
          key={`${value}yAxisMark${Math.random()}`}
          x={Y_MARKS_WIDTH}
          fontSize="15"
          fontWeight="600"
          y={value}
          textAnchor="end">
          {elm.toFixed(1)}
        </SVGText>
      )
    })
    return yAxisMarks
  }

  getPath = (pathData) => {
    if (!pathData) return null
    let path = ''
    for (let i = 0; i < pathData.length; i += 1) {
      if (i === 0) {
        path += `M${pathData[i].x} ${pathData[i].y}`
      } else {
        path += `L${pathData[i].x} ${pathData[i].y}`
      }
    }
    return path
  }

  getDecorator = (pathData) => {
    if (!pathData) return null
    const decorators = []
    for (let i = 0; i < pathData.length; i += 1) {
      decorators.push(<Circle
        key={`${pathData[i].x}circle`}
        cx={pathData[i].x}
        cy={pathData[i].y}
        r={1}
        fill={Colors.LAPALMA}
        strokeWidth="3"
        stroke={Colors.LAPALMA} />)
    }
    return decorators
  }

  getPathData(data, dateLength) {
    if (!data || !data.length || !dateLength) return null
    const pathData = []
    for (let i = 0; i < dateLength; i += 1) {
      const oneDayData = data.filter(value => (moment(value.inspectedAt).date() - 1 === i))
      // 1日に複数回記録されている場合、グラフに表示するのは1日の平均値にする。
      if (oneDayData.length > 0) {
        const oneDayDataValue = oneDayData.map(elm => elm.bodyTemperature)
        const sum = oneDayDataValue.reduce((prev, current) => prev + current)
        const avr = sum / oneDayDataValue.length
        pathData.push({ x: this.convertXValue(i, dateLength), y: this.convertYValue(avr) })
      }
    }
    return pathData
  }

  convertXValue = (x, dateLength) => Math.round((((x * (CHART_WIDTH / dateLength)) + CHART_INSET)))

  convertYValue = y => Math.round(((CHART_HEIGHT - y) * Y_SCALE * 5) + MARGIN_VERTICAL)

  render() {
    const { date, data } = this.props
    const dateLength = moment(date).endOf('month').date()
    console.log("dateLength", date)
    // ---Grid---
    const xAxisMarks = this.getXAxisMarks(dateLength)
    const xAxis = this.getXAxis()
    const yAxisMarks = this.getYAxisMarks()
    // ---Chart---
    const pathData = this.getPathData(data, dateLength) // props.data → 記録のない月は空の配列を受け取る
    const path = this.getPath(pathData)
    const decorators = this.getDecorator(pathData)

    return (
      <View style={{ flex: 1, marginVertical: 15 }}>
        <Text style={{
          position: 'absolute', top: 0, left: scale(MARGIN_HORIZONTAL), color: Colors.BLACK,
          }}>℃
        </Text>
        <Svg height={HEIGHT} width={deviceWidth} key={`${Math.random()}`}>
          <G x={5}>
            {yAxisMarks}
          </G>
          <G x={Y_MARKS_WIDTH + MARGIN_HORIZONTAL}>
            {xAxis}
            { path &&
              <Path
                d={path}
                fill="none"
                strokeWidth="1"
                stroke={Colors.LAPALMA} />
            }
            {decorators}
          </G>
          <G x={Y_MARKS_WIDTH + MARGIN_HORIZONTAL} y={HEIGHT - 3} >
            {/* -3しているのは<Text/>と<SVGText/>のフォント差調整のため */}
            {xAxisMarks}
          </G>
        </Svg>
        <Text style={{
          ...Theme.textBlack14, position: 'absolute', bottom: 0, right: scale(MARGIN_HORIZONTAL),
          }}>日
        </Text>
      </View>
    )
  }
}
ChartTemperature.propTypes = {
  date: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
}

