import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../styles';
import { scale } from '../utils/Scaling';

const { width, height } = Dimensions.get('window');

export default class SaveButton extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[styles.button, this.props.buttonStyle, this.props.disabled ? styles.disableButton : {}]}>
        <Text style={Theme.textWhite20Bold}>{this.props.title || "保存する"}</Text>
      </TouchableOpacity>
    )
  }
}

SaveButton.propTypes = {
  buttonStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4d9634',
    padding: Platform.OS === 'ios' ? 15 : 10 ,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    width: scale(220)
  },
  disableButton: {
    backgroundColor: '#999',
  },
});
