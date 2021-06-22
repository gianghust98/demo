import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Images from '../../res/img';
import { Theme, Colors } from '../styles';

let { height, width } = Dimensions.get('window');

type Props = {};
export default class MyPageHeader extends Component<Props> {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => this.props.leftPress()}>
            <Image style={styles.icon} source={Images.btn_close}/>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text allowFontScaling={false} style={Theme.textGray18Bold}>マイページ</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => this.props.rightPress()}>
            <Image style={styles.icon} source={Images.ic_setting}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS === 'ios'? width * 0.95: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // 【android】backgroundColor設定しないとheaderが表示されない
  },
  left: {
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'ivory',
  },
  right: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  titleText: {
    color: Colors.LAPALMA,
    fontSize: 18
  }
});
