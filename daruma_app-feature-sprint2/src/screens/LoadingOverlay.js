import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Theme, Colors } from '../styles';
export default class LoadingOverlay extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      forcedLoadingMode:false,
    }
    if(this.props.componentId){
      Navigation.events().bindComponent(this);
      props.toComponentId && props.toComponentId(this.props.componentId)
    }
  }
  static options(passProps) {
    return {
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.overlay} />
          <View style={styles.darumaWrapper}>
            <Image source={Images.img_daruma_green} style={styles.darumaImg}/>
            <Text style={styles.text}>{this.props.isMutate? '保存中..': '読み込み中..'}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    opacity: 0.3,
    backgroundColor: '#DDD',
  },
  darumaWrapper: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    opacity: 1,
    width: 106,
    height: 106,
  },
  darumaImg: {
    marginBottom: 5
  },
  text: {
    color: Colors.LAPALMA,
    fontWeight: 'bold',
    fontSize: 12,
  },
});