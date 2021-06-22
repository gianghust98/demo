import React, { Component } from 'react';
import {
  StyleSheet, 
  TouchableOpacity,
  View, 
  Text,
  Image,
} from 'react-native';
import Images from '../../res/img';
import PropTypes from 'prop-types';
import { scale, verticalScale } from '../utils/Scaling';
import { Theme, Colors } from '../styles';

export default class MedalBar extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    width: PropTypes.number
  }

  render() {
    const data = this.props.data
    return (
      <View style={[styles.medalBar, {width: this.props.width}]}>
        <View style={styles.medalWrapper}>
          <Image style={styles.img} source={Images.img_medal_mini_gold}/>
          <Text
            style={styles.text}
            allowFontScaling={false}>
            {data && data.currentUser && data.currentUser.medalCount.gold}
          </Text>
        </View>
        <View style={styles.medalWrapper}>
          <Image style={styles.img} source={Images.img_medal_mini_silver}/>
          <Text 
            allowFontScaling={false}
            style={styles.text}>
            {data && data.currentUser && data.currentUser.medalCount.silver}
          </Text>
        </View>
        <View style={styles.medalWrapper}>
          <Image style={styles.img} source={Images.img_medal_mini_bronze}/>
          <Text 
            style={styles.text}
            allowFontScaling={false}>
            {data && data.currentUser && data.currentUser.medalCount.bronze}
          </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  medalBar: { 
    flexDirection: 'row', 
    borderRadius: 19.5, 
    paddingVertical: 2, 
    paddingHorizontal: 10, 
    backgroundColor: Colors.CREAM,
    justifyContent: 'space-between',
    width: scale(240),
  },
  medalWrapper: {
    flexDirection: 'row', 
    width: scale(70),
    alignItems: 'center', 
  },
  img: {
    width: scale(30),
    height: scale(30), 
    marginRight: scale(3),
    resizeMode: 'contain'
  },
  text: {
    ...Theme.textBlack18,
    width: scale(40)
  }
})
