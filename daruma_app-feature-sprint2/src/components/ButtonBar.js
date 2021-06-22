import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Theme, Colors } from '../styles';

export default class ButtonBar extends React.Component {
  render () {
    let buttonLeftStyle = [styles.buttonLeft]
    let buttonRightStyle = [styles.buttonRight]
    let textLeftStyle = [Theme.textWhite20Bold]
    let textRightStyle = [Theme.textGray20]
    if (this.props.isRight) {
      buttonLeftStyle.push({ backgroundColor: 'white' })
      buttonRightStyle.push({ backgroundColor: Colors.LAPALMA })
      textLeftStyle.push(Theme.textGray20, {fontWeight: '400'})
      textRightStyle.push(Theme.textWhite20Bold)
    }
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => this.props.onPressLeft()}
          style={buttonLeftStyle}>
          <Text allowFontScaling={false} style={textLeftStyle}>{this.props.textLeft}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.onPressRight()}
          style={buttonRightStyle}>
          <Text allowFontScaling={false} style={textRightStyle}>{this.props.textRight}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
ButtonBar.propTypes = {
  onPressLeft: PropTypes.func.isRequired,
  onPressRight: PropTypes.func.isRequired,
  textLeft: PropTypes.string,
  textRight: PropTypes.string
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  buttonLeft: {
    backgroundColor: Colors.LAPALMA,
    width: '50%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: Colors.LAPALMA,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 0,
  },
  buttonRight: {
    backgroundColor: 'white',
    width: '50%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: Colors.LAPALMA,
    alignItems: 'center',
    borderLeftWidth: 0,
    paddingVertical: 10
  },
  textDate: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '500',
  },
});
