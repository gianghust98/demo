import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../res/img';
import { scale } from '../utils/Scaling';
import TalkBubble from '../components/TalkBubble';

export default class DarumaMessage extends Component{
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
  }
  static propTypes = {
    stampInfo: PropTypes.object,
    unreadInformationCount: PropTypes.number
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TalkBubble stampInfo={this.props.stampInfo} unreadInformationCount={this.props.unreadInformationCount}/>
        <Image source={(this.props.unreadInformationCount>0) ? Images.img_daruma_attention:Images.img_daruma_happy} style={styles.img_daruma}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  img_daruma: {
    width: scale(65),
    height: scale(65),
    marginLeft: scale(7),
    marginBottom: scale(-3)
  },
});
