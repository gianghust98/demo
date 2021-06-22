import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../styles';
import Images from '../../res/img';

export default class ChangeMonthBar extends React.Component {
  static propTypes = {
    changedMonth: PropTypes.func.isRequired,
    date: PropTypes.any.isRequired,
    now: PropTypes.any.isRequired,
  }

  changeMonth(changeMode, date){
    let newDate;
    if(changeMode === 'prev') {
      newDate = date.clone().subtract(1,'month');
    } else if (changeMode === 'next') {
      newDate = date.clone().add(1,'month');
    }
    this.props.changedMonth(newDate)
  }

  render () {
    const {date} = this.props
    return (
      <View style={styles.changeMonthBar}>
        <TouchableOpacity onPress={() => this.changeMonth('prev', date)} style={[styles.btnArrow, {marginLeft: 5,} ]}>
          <Image style={styles.btnArrow} source={Images.btn_left} />
        </TouchableOpacity>
        <Text style={styles.textDate}>{date.format('YYYY年 MM月')}</Text>
        {date.format('YYYYMM') === this.props.now.format('YYYYMM')? 
          <View  style={styles.btnArrow}/> :
          <TouchableOpacity onPress={() =>this.changeMonth('next', date)} style={[styles.btnArrow, {marginRight: 5,} ]}>
          <Image style={styles.btnArrow} source={Images.btn_right} />
        </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  changeMonthBar: {
    backgroundColor: '#4d9634',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  btnArrow: {
    height: 40,
    width: 40,
  },
  textDate: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '500',
  },
});
