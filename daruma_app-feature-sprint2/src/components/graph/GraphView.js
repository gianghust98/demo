import React from 'react';
import { View, Dimensions, StyleSheet, Text as TextValue} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import numeral from 'numeral'
import moment from 'moment'


import GraphSetting from './GraphSetting';
import PeriodCalculation from '../../utils/PeriodCalculation';
import BirthdayCalculation from '../../utils/BirthdayCalculation';

const { width,height } = Dimensions.get('window');

const dp = 1
export default class Chart extends React.Component {
    
    dataY = 0
    lastValue = {x:0, y:0, value:0}

    render () {
        const height = this.props.height
        const width = this.props.width
        this.dataY = height - this.props.mSetting.MARGIN_DATA_BOTTOM

        return (
            <View>
                <Svg
                    height={this.props.height}
                    width={this.props.width}>
                    {this.drawBg()}
                    {this.drawDataText()}
                    {this.drawDataRange()}
                    {this.drawGridColumn()}
                    {this.drawGridRow()}
                    {this.drawGrid()}
                    {this.drawDataLine()}
                </Svg>
                {this.dispValue(this.lastValue.value, this.lastValue.x, this.lastValue.y)}
            </View>
        )
    }

    drawBg(){
        //背景
        let mSetting = this.props.mSetting

        return (<Rect
                    x={mSetting.MARGIN_DATA_LEFT - dp * 4}
                    y={mSetting.MARGIN_DATA_TOP - dp * 4}
                    width={(this.props.width - mSetting.MARGIN_DATA_RIGHT - mSetting.MARGIN_DATA_LEFT) + dp * 8}
                    height={this.dataY + dp * 4}
                    fill="white"
                />)
    }

    drawDataText(){

        let mSetting = this.props.mSetting
        var views = []
        for ( var row =0; row < mSetting.mScale.length; row++ ) {
            // if ( row == mSetting.mScale.length - 1 ) {
            //     continue
            // }
            let scale = mSetting.mScale[row]
            let rowY = this.getPositionY(scale)
            var scaleText = String(scale)
            if  (mSetting.mLowTextFormat)  {
                scaleText = numeral(scale).format(mSetting.mLowTextFormat);
            }
            
            views.push(
                <Text
                key={row}
                fill="black"
                fontSize="9"
                x={mSetting.MARGIN_DATA_LEFT - dp * 6}
                y={rowY - 7}
                textAnchor="end">
                {scaleText}</Text>
            )
        }
        return views
    }

    drawDataRange(){

        let mSetting = this.props.mSetting
        var rangePath = "";

        for ( var i =0; i < mSetting.LEFT_DATA_RANGE_HEIGHT.length; i++ ) {
            let data = mSetting.LEFT_DATA_RANGE_HEIGHT[i]
            if  (i == 0)  {
                let first = mSetting.LEFT_DATA_RANGE_LOW[0]
                rangePath += `M${this.getPositionX(first.dataX)} ${this.getPositionY(first.dataY)}`
                rangePath += ` L${this.getPositionX(data.dataX)} ${this.getPositionY(data.dataY)}`
            } else {
                rangePath += ` L${this.getPositionX(data.dataX)} ${this.getPositionY(data.dataY)}`
            }
        }
        
        for ( var i = mSetting.LEFT_DATA_RANGE_LOW.length-1; 0 <= i; i-- ) {
            let data = mSetting.LEFT_DATA_RANGE_LOW[i]
            rangePath += ` L${this.getPositionX(data.dataX)} ${this.getPositionY(data.dataY)}`
        }
        return (<Path
            d={rangePath}
            fill={mSetting.COLOR_RANGE} />)
    }

    drawGridColumn(){
        let mSetting = this.props.mSetting
        var views = []
        if (mSetting.COLUMN_DATA.length == 0) {
            this.getColumnValue()
        }

        let textY = this.dataY + dp * 8;
        for ( var i =0; i < mSetting.COLUMN_DATA.length; i++ ) {
            let value = mSetting.COLUMN_DATA[i];
            let x = this.getPositionX(value);
            if (  0 < i && i <  mSetting.COLUMN_DATA.length - 1) {
                views.push(
                    <Line
                    key={i+"line"}
                    x1={x} y1={mSetting.MARGIN_DATA_TOP}
                    x2={x} y2={this.dataY}
                    stroke="gray"
                    strokeWidth="0.1"
                    strokeDasharray='3,3'
                    />
                )
            }
            
            //列テキスト
            var text = ""
            if (mSetting.mColumnText == GraphSetting.COLUMN_TEXT_DATE) {
                text = moment(value).format("M/d")
            } else if ( mSetting.mColumnText == GraphSetting.COLUMN_TEXT_AGE ) {
                let age = PeriodCalculation.dateDiffMonth(mSetting.mColumnAgeBirthday, new Date(value)) / 12.0;
                text = numeral(age).format("0.#") + "歳"
            } else if ( mSetting.mColumnText == GraphSetting.COLUMN_TEXT_AGE_MONTH ) {
                let age = BirthdayCalculation.calculationAge(mSetting.mColumnAgeBirthday, new Date(value))
                text =  age[0] + "歳" + age[1] + "月";
            }

            views.push(
                <Text
                key={i+"text"}
                fill="black"
                fontSize="9"
                x={x}
                y={textY}
                textAnchor="middle">
                {text}</Text>
            )
        }
        return views

    }

    drawGridRow(){
        //Grid枠
        let mSetting = this.props.mSetting
        var views = []
        for ( var row =0; row < mSetting.mScale.length; row++ ) {
            let scale = mSetting.mScale[row]
            let y = this.getPositionY(scale)
            if (  0 < row && row <  mSetting.mScale.length - 1) {
                views.push(
                    <Line
                    key={row}
                    x1={mSetting.MARGIN_DATA_LEFT} y1={y}
                    x2={this.props.width - mSetting.MARGIN_DATA_RIGHT} y2={y}
                    stroke="gray"
                    strokeWidth="0.1"
                    strokeDasharray='3,3'
                    />
                )
            }
        }
        return views
    }

    drawGrid(){
         //Grid枠
        let mSetting = this.props.mSetting
        return (<Rect
                    x={mSetting.MARGIN_DATA_LEFT}
                    y={mSetting.MARGIN_DATA_TOP}
                    width={this.props.width - mSetting.MARGIN_DATA_RIGHT - mSetting.MARGIN_DATA_LEFT}
                    height={this.props.height - mSetting.MARGIN_DATA_BOTTOM - mSetting.MARGIN_DATA_TOP}
                    fillOpacity="0"
                    stroke="black"
                    strokeWidth="0.1"
                />)
    }

    drawDataLine(){

        let mSetting = this.props.mSetting
        var rangePath = ""
        var count = 0
        var views = []
        for (data of mSetting.LEFT_DATA) {
            //線を引㝝
            let x = this.getPositionX(data.dataX);
            let y = this.getPositionY(data.dataY);
            if ( count == 0 ) {
                rangePath += `M${x} ${y}`
            } else {
                rangePath += ` L${x} ${y}`
            }
            //点を杝㝝
            if( count == mSetting.LEFT_DATA.length-1){
                views.push(
                    <Path
                    key={"line"}
                    d={rangePath}
                    fill="none"
                    stroke={mSetting.COLOR_DATA_LINE}
                    strokeWidth="2" />
                )

                views.push(
                    <Circle
                    key={"circle"}
                    cx={x}
                    cy={y}
                    r={dp * 5}
                    fill={mSetting.COLOR_DATA_LINE}
                    />
                )
                this.lastValue = {
                    value: data.dataY,
                    x: x,
                    y: y,
                }
            }
            count += 1
        }
        return views
    }
    
    getPositionY(value){
        let mSetting = this.props.mSetting
        let maxData = mSetting.mScale[0];
        let minData = mSetting.mScale[mSetting.mScale.length - 1];

        let result = parseFloat((maxData - value) / (maxData - minData) ) * ( this.props.height - mSetting.MARGIN_DATA_BOTTOM - mSetting.MARGIN_DATA_TOP)

        return result + mSetting.MARGIN_DATA_TOP
    }
    
    getPositionX( value ){
        let mSetting = this.props.mSetting
        let dataWidth = this.props.width -  mSetting.MARGIN_DATA_LEFT - mSetting.MARGIN_DATA_RIGHT

        let minData = mSetting.mDataMinX;
        let maxData  = mSetting.mDataMaxX;

        let result = parseFloat((value - minData) / (maxData - minData) ) * dataWidth;

        return result + mSetting.MARGIN_DATA_LEFT;
    }
    
    
    getColumnValue() {
        let mSetting = this.props.mSetting
        mSetting.COLUMN_DATA = []

        for ( var i =0; i < mSetting.COLUMN_COUNT; i++ ) {
            let minData = mSetting.mDataMinX
            let maxData = mSetting.mDataMaxX

            let length = (maxData - minData) / (parseFloat(mSetting.COLUMN_COUNT) - 1.0) * parseFloat(i)

            mSetting.COLUMN_DATA.push(minData + length);
        }
    }
    
    setGraphSetting( setting ) {
        this.setState({mSetting:setting})
    }
    
    dispValue( value, x, y ) {
        let mSetting = this.props.mSetting
        var xPos = x + 8
        var yPos = y - 36
        
        let length = 20
        if ( xPos + length + 10 > this.props.width ) {
            xPos = xPos - length - 32
        }
        if ( yPos - 4 <  0) {
            yPos = yPos + 44
        }

        return (
            <View style={{position: "absolute", marginLeft:xPos, marginTop:yPos, backgroundColor:"#E5D9DA", borderRadius:20, padding: 5}}>
                <TextValue style={{fontSize: 9, color:"#8A787A"}}>
                    {numeral(value).format(mSetting.mLowTextFormat) + mSetting.mUnitText}
                </TextValue>
            </View>
        )
    }
}
