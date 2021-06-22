import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../res/img';
import { scale } from '../utils/Scaling';
import { Theme, Colors } from '../styles';

export default class TalkBubble extends Component<Props> {

  static propTypes = {
    text: PropTypes.string,
    stampInfo: PropTypes.object,
    unreadInformationCount: PropTypes.number
  }
  render() {
    const stampInfo = this.props.stampInfo
    const stamp = stampInfo && stampInfo.nextMedalRemainStamp
    const nextMedal = stampInfo && stampInfo.nextMedal
    let nextMedalText
    switch(nextMedal) {
      case 'bronze':
        nextMedalText = '銅'
      break
      case 'silver':
        nextMedalText = '銀'
      break;
      case 'gold':
        nextMedalText = '金'
      break;
      default:
        nextMedalText = ''
      break;
    }
    return (
      <View style={[{ flexDirection: 'row' },{opacity:stampInfo?1:1}]}>
        <View style={styles.talkBubbleWrapper}>
          {
            (!stampInfo)?<Text style={styles.talkBubble}>　{"\n"}　</Text>:
            (this.props.unreadInformationCount>0 )?
            <Text style={styles.talkBubble}>お!お便りボックスに何か届いておるぞ。読んでみるのじゃ!</Text>:
            nextMedalText!==""?
            <Text style={styles.talkBubble}>あと<Text style={[Theme.textBlack22, { color: Colors.VENETIANRED}]}>{stamp? stamp : '-' }</Text>個押せると、{nextMedalText? nextMedalText: '-'}ダルマになるぞ!頑張るのじゃ!</Text>:
            <Text style={styles.talkBubble}>素晴らしい!!今週は金だるまじゃ!!よぅ、頑張ったのう!</Text>
          }
        </View> 
        <Image source={Images.img_hukidashi} style={styles.triangle}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  talkBubbleWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    width: scale(235),
  },
  talkBubble: {
    paddingVertical: 3,
    backgroundColor: 'white',
    borderRadius: 20,
    ...Theme.textBlack20
  },
  triangle: {
    position: 'absolute',
    left: scale(230),
    bottom: scale(7)
  }
});
