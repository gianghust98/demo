import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../res/img';
import { Theme, Colors } from '../styles';
import moment from 'moment';
import {recordDeviceName} from "../utils/config"

const { width, height } = Dimensions.get('window');

export default class RecordList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {bloodPressureLog} = this.props
    let time = moment(bloodPressureLog.inspectedAt).format('H:mm')
    let timeIconSource = null;
    if (bloodPressureLog.periodOfTime === "morning" ) {
      timeIconSource = Images.ic_sunset_on
    } else if (bloodPressureLog.periodOfTime === "night" ) {
      timeIconSource = Images.ic_night_on
    } 
    return (
      <View>
        <TouchableOpacity 
          onPress={() => this.props.bloodPressureLog.recordDevice!== "omron" && this.props.showModalContent(this.props.bloodPressureLog)}
          style={[styles.bottomLine, {borderBottomWidth:this.props.isLastRecord? 0 : 1}]}>
          <View style={[styles.row]}>
            <View style={styles.timeWrapper}>
              <Image source={timeIconSource} style={{ height: 30, width: 30, marginHorizontal: 15 }} />
              <Text style={Theme.textBlack20Bold}>{time}</Text>
            </View>

            <View style={styles.bpContainer}>
              <View style={styles.bpContent}>
                <Text style={styles.textSmall}>最高</Text>
                {this.props.bloodPressureLog.maximum ?
                  <Text style={Theme.textBlack22Bold}>{this.props.bloodPressureLog.maximum}</Text>
                  : <Text style={Theme.textBlack22Bold}>-</Text>
                }
              </View>
              <View style={styles.bpContent}>
                <Text style={styles.textSmall}>最低</Text>
                {this.props.bloodPressureLog.minimum ?
                  <Text style={Theme.textBlack22Bold}>{`${this.props.bloodPressureLog.minimum}`}</Text>
                  : <Text style={Theme.textBlack20Bold}>-</Text>
                }
              </View>
              <View style={styles.bpContent}>
                <Text style={styles.textSmall}>脈拍</Text>
                {this.props.bloodPressureLog.pulse ?
                  <Text style={Theme.textBlack22Bold}>{`${this.props.bloodPressureLog.pulse}`}</Text>
                  : <Text style={Theme.textBlack20Bold}>-</Text>
                }
              </View>
            </View>
          </View>
          <View style={{}}><Text style={styles.recordDevice}>{recordDeviceName(this.props.bloodPressureLog.recordDevice)}</Text></View>
        </TouchableOpacity>
       </View>
    )
  }
}

RecordList.propTypes = {
  showModalContent: PropTypes.func.isRequired,
  bloodPressureLog:PropTypes.object.isRequired,
  isLastRecord: PropTypes.bool
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHTGRAY,
    paddingVertical: 10,
  },
  timeWrapper: {
    flexDirection: 'row',
    width: '40%',
  },
  textSmall: {
    fontSize: 16,
  },
  recordDevice:{
    color: Colors.DARKGRAY,
    fontSize: 12,
    textAlign: "right",
    paddingHorizontal: 10,
  },
  bpContainer: {
    width: '60%',
    // backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  bpContent: {
    // marginHorizontal: 10,
    // backgroundColor: 'ivory',
    alignItems: 'center',
    width: '33%',
  },
});
