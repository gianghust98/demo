import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors } from '../styles';

let { height, width } = Dimensions.get('window');

type Props = {};
export default class ProfileHeader extends Component<Props> {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  render() {  
    // console.log("headerCheckFilled",this.state.isFilled)
    
    return (
      <View style={styles.container}>
        {(!this.props.fromHome)?<Text allowFontScaling={false} onPress={() => this.props.leftPress()} style={styles.textLeft}>キャンセル</Text> :null}
        <Text allowFontScaling={false} style={styles.textCenter}>あなたへの質問</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // 【android】backgroundColor設定しないとheaderが表示されない
  },
  textLeft: {
    position: 'absolute',
    left: 0,
    fontSize: 18,
    color: 'gray',
    fontWeight: '400'
  },
  textCenter: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold'
  },
  textRight: {
    position: 'absolute',
    right: 0,
    fontSize: 18,
    color: 'gray',
    fontWeight: '400'
  },
});
