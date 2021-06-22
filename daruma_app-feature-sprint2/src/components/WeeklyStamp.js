import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, View, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import Images from '../../res/img';
import {scale} from '../utils/Scaling';

const jsonData = require('../../res/animations/json_file/data.json');
const stampFull = require('../../res/animations/stamp_All/data.json');
const stampHalfDown = require('../../res/animations/stamp_LowerHalf/data.json');
const stampHalfUp = require('../../res/animations/stamp_UpperHalf/data.json');
export default class WeeklyStamp extends Component<Props> {
  constructor(props) {
    super(props);
    this.calenderSource;
    this.medalSource = Images.img_medal_none;
    this.stamps = [];
    this.stampsJson = [];
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.stampInfo !== prevProps.stampInfo) {
      this.getStampSource(this.props.stampInfo);
      this.getMedalSource(this.props.stampInfo);
      this.forceUpdate();
      // console.log('@WeeklyStamp.js/stampInfo', this.props.stampInfo)
    }
  }
  // componentDidMount() {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 2000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  //   // console.log('this.stamps: ', this.getCalenderSource);
  //   // console.log('this.calendar: ', this.calenderSource);
  // }

  getCalenderSource() {
    switch (`${this.props.date.day()}`) {
      case '0':
        this.calenderSource = Images.img_calender_0;
        break;
      case '1':
        this.calenderSource = Images.img_calender_1;
        break;
      case '2':
        this.calenderSource = Images.img_calender_2;
        break;
      case '3':
        this.calenderSource = Images.img_calender_3;
        break;
      case '4':
        this.calenderSource = Images.img_calender_4;
        break;
      case '5':
        this.calenderSource = Images.img_calender_5;
        break;
      case '6':
        this.calenderSource = Images.img_calender_6;
        break;
    }
  }

  getStampSource(stampInfo) {
    for (let i = 0; i < 7; i++) {
      let data =
        stampInfo && stampInfo.weeklyStamps && stampInfo.weeklyStamps[i];

      if (data && data.morning && !data.night) {
        this.stamps[i] = stampHalfUp;
        // this.stamps[i] = Images.img_stamp_half_up;
      } else if (data && data.morning && data.night) {
        this.stamps[i] = stampFull;
        // this.stamps[i] = Images.img_stamp_full;
      } else if (data && !data.morning && data.night) {
        this.stamps[i] = stampHalfDown;
        // this.stamps[i] = Images.img_stamp_half_down;
      } else {
        this.stamps[i] = null;
      }
    }
  }

  getMedalSource(stampInfo) {
    switch (stampInfo && stampInfo.nowMedal) {
      case 'bronze':
        this.medalSource = Images.img_medal_bronze;
        break;
      case 'silver':
        this.medalSource = Images.img_medal_silver;
        break;
      case 'gold':
        this.medalSource = Images.img_medal_gold;
        break;
      default:
        this.medalSource = Images.img_medal_none;
    }
  }

  render() {
    this.getCalenderSource();
    return (
      <View style={styles.stampWrapper}>
        <Image source={this.calenderSource} style={styles.img_calender} />
        {this.stamps[0] && (
          <LottieView
            source={this.stamps[0]}
            autoPlay
            loop={false}
            style={styles.stampjson0}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[1] && (
          <LottieView
            source={this.stamps[1]}
            autoPlay
            loop={false}
            style={styles.stampjson1}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[2] && (
          <LottieView
            source={this.stamps[2]}
            autoPlay
            loop={false}
            style={styles.stampjson2}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[3] && (
          <LottieView
            source={this.stamps[3]}
            autoPlay
            loop={false}
            style={styles.stampjson3}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[4] && (
          <LottieView
            source={this.stamps[4]}
            autoPlay
            loop={false}
            style={styles.stampjson4}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[5] && (
          <LottieView
            source={this.stamps[5]}
            autoPlay
            loop={false}
            style={styles.stampjson5}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {this.stamps[6] && (
          <LottieView
            source={this.stamps[6]}
            autoPlay
            loop={false}
            style={styles.stampjson6}
            // progress={this.state.progress}
            resizeMode="cover"
          />
        )}
        {/* <Image source={this.calenderSource} style={styles.img_calender}/> */}
        {/* <Image source={this.stamps[0]} style={styles.stamp0}/>
        <Image source={this.stamps[1]} style={styles.stamp1}/>
        <Image source={this.stamps[2]} style={styles.stamp2}/>
        <Image source={this.stamps[3]} style={styles.stamp3}/>
        <Image source={this.stamps[4]} style={styles.stamp4}/>
        <Image source={this.stamps[5]} style={styles.stamp5}/>
        <Image source={this.stamps[6]} style={styles.stamp6}/>
        <Image source={this.medalSource} style={styles.stamp7}/> */}
        <Image source={this.medalSource} style={styles.stamp7} />
      </View>
    );
  }
}

WeeklyStamp.propTypes = {};

const styles = StyleSheet.create({
  stampWrapper: {
    marginVertical: 10,
  },
  img_calender: {
    width: scale(314 * 0.85),
    height: scale(136 * 0.85),
    marginLeft: scale(10),
  },
  stamp0: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    top: scale(23),
    left: scale(12),
  },
  stampjson0: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    top: scale(1.5),
    left: scale(-4),
  },
  stamp1: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    bottom: scale(3),
    left: scale(44),
  },
  stampjson1: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    bottom: scale(-9),
    left: scale(11.5),
  },
  stamp2: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    top: scale(23),
    left: scale(81),
  },
  stampjson2: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    top: scale(1.5),
    left: scale(30.5),
  },
  stamp3: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    bottom: scale(3),
    left: scale(116),
  },
  stampjson3: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    bottom: scale(-9),
    left: scale(47.5),
  },
  stamp4: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    top: scale(23),
    left: scale(151),
  },
  stampjson4: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    top: scale(1.5),
    left: scale(65),
  },
  stamp5: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    bottom: scale(3),
    left: scale(186),
  },
  stampjson5: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    bottom: scale(-9),
    left: scale(83),
  },
  stamp6: {
    position: 'absolute',
    width: scale(39),
    height: scale(39),
    top: scale(23),
    left: scale(222),
  },
  stampjson6: {
    position: 'absolute',
    width: scale(79),
    height: scale(79),
    top: scale(1.5),
    left: scale(101),
  },
  stamp7: {
    position: 'absolute',
    bottom: scale(-15),
    left: scale(236),
    width: scale(80),
    height: scale(80),
  },
});
