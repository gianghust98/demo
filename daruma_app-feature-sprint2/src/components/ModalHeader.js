import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from '../styles';
import Images from '../../res/img';
import { scale } from '../utils/Scaling';

const { width, height } = Dimensions.get('window');

export default class ModalHeader extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.modalHeader}>
        <Text
          style={styles.textModalTitle}>{this.props.title}</Text>
        <TouchableOpacity 
          style={styles.img} 
          onPress={() => this.props.dismissModal()}>
          <Image style={styles.img} source={Images.btn_close}/>
        </TouchableOpacity>
      </View>
    )
  }
}

ModalHeader.propTypes = {
  dismissModal: PropTypes.func.isRequired,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textModalTitle: {
    ...Theme.textBlack18Bold,
    width: scale(200),
    textAlign: 'center',
  },
  img: {
    width: 30,
    height: 28,
    resizeMode: 'contain',
    position: 'absolute',
    right: scale(5),
  }
});
