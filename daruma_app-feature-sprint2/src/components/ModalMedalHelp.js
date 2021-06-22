import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, ScrollView, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import Images from '../../res/img';
import { Theme } from '../styles';
import ModalHeader from '../components/ModalHeader';

const { width, height } = Dimensions.get('window');

export default class ModalMedalHelp extends Component<Props> {
  constructor(props) {
    super(props);
    // this.goToInfo = this.goToInfo.bind(this)
    this.state = {
      visibleModal:false
    }
  }
  openModal(){
    this.setState({visibleModal:true})
  }
  dismissModal(){
    this.setState({visibleModal:false})
  }

  render() {
    return (
      <Modal 
        isVisible={this.state.visibleModal} 
        onBackButtonPress={() => this.dismissModal()} // andorid
        onBackdropPress={() => this.dismissModal()}
      >
        <View style={styles.modalContainer}>
        <ScrollView
          bounces={false} 
          contentContainerStyle={styles.container}>
          <ModalHeader 
            title='目指そう！金ダルマ！'
            dismissModal={() => this.dismissModal()}/>
          <View style={styles.imgWrapper}>
            <Image source={Images.img_about_medal} style={styles.image} />
          </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 430,
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 520,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
  },
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    flex: 1,
  },
  imgWrapper: {
    flex: 1,
  }
});
