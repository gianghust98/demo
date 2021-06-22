import React, { Component } from 'react';
import { Text, Dimensions, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { HOST } from '../utils/DarumaServer';
import ModalHeader from './ModalHeader';
import { Theme } from '../styles';
import { scale } from '../utils/Scaling';
import Images from '../../res/img';

const { width, height } = Dimensions.get('window');

export default class InfoMessage extends Component {
  constructor(props) {
    super(props);
  }

  openLink(){
    if(this.props.openLink)this.props.openLink(this.props.infoData)
  }

  render() {
    if(!this.props.infoData) return null
    const {infoData} = this.props
    const {informationMessage} = infoData
    return (
      <View style={styles.modalContainer}>
        <ScrollView
          bounces={false}
        >
        <View style={styles.container}>

        <ModalHeader 
          title={informationMessage.title}
          dismissModal={() => this.props.dismissModal()}/>
        {informationMessage.iconUrl ? 
          <Image
            style={styles.img} 
            source={{uri:HOST+informationMessage.iconUrl}} /> : null}
        <View style={styles.messageWrapper}>
          <Text style={[Theme.textBlack18, { marginBottom: 10 }]}>{moment(infoData.createdAt).format("YYYY/MM/DD")}</Text>
          <Text style={[Theme.textBlack20, { lineHeight: 22 }]}>{infoData.message}</Text>
        </View>
        {(informationMessage.linkText && informationMessage.linkUrl) ? 
          <TouchableOpacity
            onPress={()=>this.openLink()}
            style={styles.button}>
            <Text style={styles.textButton}>{informationMessage.linkText}</Text>
          </TouchableOpacity>
          :
          null
        }
        </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 450,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
  },
  container: {
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  img: {
    alignSelf: 'center',
    width: scale(80),
    height: scale(80),
    marginBottom: 10,
  },
  messageWrapper: {
    paddingHorizontal: 10,
    flex: 1,
  },
  button: {
    backgroundColor: '#4d9634',
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    width: scale(220),
    marginVertical: 10,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
