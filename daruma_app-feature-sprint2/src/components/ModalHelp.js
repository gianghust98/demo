import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, ScrollView, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import Images from '../../res/img';
import { Theme } from '../styles';
import ModalHeader from '../components/ModalHeader';

const { width, height } = Dimensions.get('window');

export default class ModalHelp extends Component<Props> {
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
            title='ヘルプ'
            dismissModal={() => this.dismissModal()}/>
          <View style={styles.imgWrapper}>
            <Image 
              source={Images.img_help} 
              style={styles.image} />
          </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 500,
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
    justifyContent: 'center',
  }
});
