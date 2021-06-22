/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import moment from 'moment'
import Svg, {
  Text as SVGText,
  Path,
  Line,
  Circle,
} from 'react-native-svg'
import { Colors } from '../styles'
import { scale } from '../utils/Scaling'

const { height, width } = Dimensions.get('window')
const HEIGHT = 500
const WIDTH = scale(240)
const MARGIN_TOP = 40
const Y_SCALE = 1.7
const X_MARKS = [1, 6, 11, 16, 21, 26]
const Y_MARKS = [50, 100, 150, 200]
function convertXValue(x) {
  return Math.round(x * WIDTH / 32)
}

function convertYValue(y) {
  return Math.round((200 - y) * Y_SCALE + MARGIN_TOP)
}

export default class Graph extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  makeXAxisMarks() {
    const xAxisMarks = []
    for (const value of X_MARKS) {
      const x = convertXValue(value)
      if (value === X_MARKS[X_MARKS.length - 1]) { // 右端のx目盛り
        xAxisMarks.push(this.makeXAxisMark(`${value}日`, x, Colors.BLACK))
      } else {
        xAxisMarks.push(this.makeXAxisMark(value, x, Colors.BLACK))
      }
    }
    return xAxisMarks
  }

  makeXAxisAndYAxisMarks() {
    const xAxis = []
    const yAxisMarks = []
    // zero
    const zeroY = convertYValue(0)
    xAxis.push(this.makeXAxis(0, zeroY, Colors.DARKGRAY))
    yAxisMarks.push(this.makeYAxisMark(0, zeroY, Colors.BLACK))

    // y
    for (const value of Y_MARKS) {
      const y = convertYValue(value)
      xAxis.push(this.makeXAxis(value, y, Colors.LIGHTGRAY))
      yAxisMarks.push(this.makeYAxisMark(value, y, Colors.BLACK))
    }

    // baseLine
    const { baseLine } = this.props
    if (baseLine) {
      const maximumY = convertYValue(baseLine.maximum)
      const minimumY = convertYValue(baseLine.minimum)
      xAxis.push(this.makeXAxis(baseLine.maximum, maximumY, Colors.VENETIANRED))
      yAxisMarks.push(this.makeYAxisBaseMark(baseLine.maximum, maximumY, Colors.MANDY))
      xAxis.push(this.makeXAxis(baseLine.minimum, minimumY, Colors.VENETIANRED))
      yAxisMarks.push(this.makeYAxisBaseMark(baseLine.minimum, minimumY, Colors.MANDY))
    }

    return { xAxis, yAxisMarks }
  }

  makeXAxisMark(value, x, fill) {
    return (<SVGText
      key={`${value}XAxisMark`}
      fill={fill}
      fontSize="14"
      fontWeight="500"
      x={x}
      y={convertYValue(0) + 30}
      textAnchor="middle">
      {value}
            </SVGText>)
  }
  makeXAxis(value, y, stroke) {
    return (<Line
      key={`${value}line${Math.random()}`}
      x1="0"
      x2={width}
      y1={y}
      y2={y}
      stroke={stroke}
      strokeWidth="1" />)
  }
  makeYAxisMark(value, y, fill) {
    return (<SVGText
      key={`${value}YAxisMark`}
      fill={fill}
      fontSize="16"
      fontWeight="500"
      x={0 + 30}
      y={y + 5}
      textAnchor="end">
      {value}
            </SVGText>)
  }
  makeYAxisBaseMark(value, y, fill) {
    return (<SVGText
      key={`${value}YAxisBaseMark${Math.random()}`}
      fill={fill}
      fontSize="16"
      fontWeight="500"
      x={width - 40}
      y={y + 5}
      textAnchor="start">
      {value}
            </SVGText>)
  }

  getData(rawData) {
    const formattedData = []
    const topBps = []
    const bottomBps = []
    const recordDate = []
    for (let i = 1; i <= 31; i++) {
      const oneDayData = rawData.filter(value => (moment(value.inspectedAt).date() === i))
      if (oneDayData.length > 0) {
        const date = i
        const oneDayTopBpArr = []
        const oneDayBottomBpArr = []
        for (value of oneDayData) {
          oneDayTopBpArr.push(value.maximum)
          oneDayBottomBpArr.push(value.minimum)
        }
        if (oneDayTopBpArr.length > 0) { // TODO
          const topBpSum = oneDayTopBpArr.reduce((prev, current) => prev + current)
          const topBpAvr = topBpSum / oneDayTopBpArr.length
          const bottomBpSum = oneDayBottomBpArr.reduce((prev, current) => prev + current)
          const bottomBpAvr = bottomBpSum / oneDayBottomBpArr.length
          formattedData.push({ date, topBp: topBpAvr, bottomBp: bottomBpAvr })
        } else {
          formattedData.push({ date, topBp: oneDayTopBpArr[0], bottomBp: oneDayBottomBpArr[0] })
        }
      }
    }
    // console.log('-----', formattedData)

    for (const value of formattedData) {
      topBps.push(value.topBp)
      bottomBps.push(value.bottomBp)
      recordDate.push(value.date) // TODO
    }
    return { topBps, bottomBps, recordDate }
  }

  drawLineChart(xArray, yArray, line2) {
    const x = []
    for (const value of xArray) {
      x.push(convertXValue(value))
    }
    const y = []
    for (const value of yArray) {
      y.push(convertYValue(value))
    }

    // console.log(x, y)
    let axisPath = ''
    for (let i = 0; i < x.length; i++) {
      if (i === 0) {
        axisPath += `M${x[i]} ${y[i]}`
      } else {
        axisPath += `L${x[i]} ${y[i]}`
      }
    }

    return (
      <Path
        key={line2 ? 'line2' : 'line1'}
        d={axisPath}
        fill="none"
        stroke={line2 ? Colors.TOPAZ : Colors.LAPALMA}
        strokeWidth="1" />
    )
  }

  drawSquires(xArray, yArray, line2) {
    const x = []
    for (const value of xArray) {
      x.push(convertXValue(value))
    }
    const y = []
    for (const value of yArray) {
      y.push(convertYValue(value))
    }

    const squires = []
    for (let i = 0; i < x.length; i++) {
      squires.push(<Circle
        key={line2 ? `${x[i]}circle2` : `${x[i]}circle`}
        cx={x[i]}
        cy={y[i]}
        r={1}
        fill={line2 ? Colors.TOPAZ : Colors.LAPALMA}
        strokeWidth="3"
        stroke={line2 ? Colors.TOPAZ : Colors.LAPALMA} />)
    }
    return squires
  }

  render() {
    const rawData = this.props.data
    const { topBps, bottomBps, recordDate } = this.getData(rawData)
    const { yAxisMarks, xAxis } = this.makeXAxisAndYAxisMarks()
    return (
      <View style={styles.container}>
        <Text style={styles.textUnit}>mmHg</Text>
        <Svg height={HEIGHT} width={WIDTH} style={styles.content} key={`graph${Math.random()}` /* android bug */} >
          {this.makeXAxisMarks()}
          {xAxis}
          {this.drawLineChart(recordDate, topBps)}
          {this.drawLineChart(recordDate, bottomBps, 'line2')}
          {this.drawSquires(recordDate, topBps)}
          {this.drawSquires(recordDate, bottomBps, 'line2')}
        </Svg>
        <Svg height={HEIGHT} width="100%" style={styles.yAxisMarks} key={`mark${Math.random()}` /* android bug */} >
          {yAxisMarks}
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textUnit: {
    position: 'absolute',
    left: 4,
    top: 4,
    fontSize: 12,
    color: Colors.DIMGRAY,
  },
  content: {
    backgroundColor: 'transparent',
  },
  yAxisMarks: {
    position: 'absolute',
    top: 0,
    left: 5,
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
})
