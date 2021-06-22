import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { showModalMyPage } from '../screens/navigation';
import Images from '../../res/img';
import { scale } from '../utils/Scaling';
import { Colors } from '../styles';

const { height, width } = Dimensions.get('window');

type Props = {};
export default class HomeHeader extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      unreadInformationCount:0
    }
    this.props.setHeaderStateFunc((state)=>this.setStateFnc(state))
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  setStateFnc(state){
    // console.log("setStateFnc",state)
    this.setState(state)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => this.props.leftPress()}>
            <Image style={styles.icon} source={Images.ic_mypage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.goToShareCodeScreen()}>
            <Image
              style={[styles.icon, {marginLeft: 10}]}
              source={Images.ic_barcode}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Image source={Images.img_typelogo} style={styles.img_typelogo} />
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => this.props.rightPress()}>
            <Image style={styles.icon} source={this.state.unreadInformationCount>0? Images.ic_mail_attention: Images.ic_mail}/>
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
    backgroundColor: '#FFF',
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
  },
  right: {
    alignItems: 'center',
  },
  img_typelogo: {
    width: 170,
    height: 26,
    resizeMode: 'contain'
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 0,
  },
  titleText: {
    color: Colors.LAPALMA,
    fontSize: 18
  }
});
