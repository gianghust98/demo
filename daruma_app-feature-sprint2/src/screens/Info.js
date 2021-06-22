import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { Navigation } from 'react-native-navigation';
import Modal from 'react-native-modal';
import { graphql } from '@apollo/client/react/hoc';
import moment from 'moment';
import InfoMessage from '../components/InfoMessage';

import { pagingCursorInputFromOutput,pagingUpdateQuery } from '../utils/DarumaGraphql';
import DarumaServer,{HOST} from '../utils/DarumaServer';
import queryInformations from '../api/queryInformations';
import queryHome from '../api/queryHome';
import mutationReadInformation from '../api/mutationReadInformation';
import { QueryInfomations,MutationReadInformation } from '../api/types';
import { Colors, Theme } from '../styles';
import Images from '../../res/img';
import { scale } from '../utils/Scaling';

type Props = {
  queryInformations:QueryMedicalCertificates
};


@graphql(queryInformations, { name: 'queryInformations'}) 
export default class Info extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'お便りボックス',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    }
  }
  constructor(props){
    super(props)
    Navigation.events().bindComponent(this)
    this.state={
      openModalInfo:null
    }
    this.fetchMoreLoading = false
  }
  navigationButtonPressed({ buttonId }) {
    switch(buttonId){
      case 'backButton':
      default:
        Navigation.dismissModal(this.props.componentId);
        break
    }
  }
  openModal(infoItem){
    this.setState({openModalInfo: infoItem})
    //既読処理
    if(infoItem.readAt) return 
    DarumaServer.graphq.client.mutate({
      mutation: mutationReadInformation,
      variables: {informationId:infoItem.id},
    })
    .then((res)=>{})
    .catch((error)=>{
      console.log("error",error)
    })
  }
  dismissModal() {
    this.setState({openModalInfo: null})
  }
  render() {
    const {queryInformations} = this.props
    return (
      <View style={{flex:1}}>
        <Modal 
          isVisible={this.state.openModalInfo!== null}
          onBackButtonPress={() => this.dismissModal()} // andorid
          onBackdropPress={() => this.dismissModal()}
        >
          <InfoMessage
            openLink = {()=>{
              console.log(`${HOST}${this.state.openModalInfo.informationMessage.linkUrl}`)
              Navigation.push(this.props.componentId, {component: {name: `navigation.WebViewScreen`, passProps:{useToken:true, url:`${HOST}${this.state.openModalInfo.informationMessage.linkUrl}`}}});
              this.dismissModal()
            }}
            infoData = {this.state.openModalInfo}
            dismissModal={() => this.dismissModal()}
          />
        </Modal>
        <FlatList
          bounces={true}
          style={{flex:1}}
          data={queryInformations.informations && queryInformations.informations.list || []}
          keyExtractor={(item) => `${item.id}`}
          onEndReached={()=>{
            if(!this.fetchMoreLoading && !queryInformations.loading && queryInformations.informations && queryInformations.informations.hasNext){
              this.fetchMoreLoading = true
                queryInformations.fetchMore({
                  variables:pagingCursorInputFromOutput(queryInformations.informations.cursors),
                  updateQuery:pagingUpdateQuery("informations"),
                }).then(()=>{
                  this.fetchMoreLoading = false
                  this.forceUpdate()
                })
            }else{
              console.log(this.fetchMoreLoading , queryInformations.loading , queryInformations.informations && queryInformations.informations.hasNext)
            }
          }}
          
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={()=>{
                this.openModal(item)
              }}
              style={{...styles.infoList, ...{backgroundColor:item.readAt? 'white': "#E9F5E5"}}}>
              {item.informationMessage.iconUrl? 
                <View style={styles.avatorWrapper}>
                  <Image style={styles.avator} source={{uri:HOST+item.informationMessage.iconUrl}}/>
                </View>:null}
              <View style={styles.textWrapper}>
                <Text 
                  style={item.readAt? [styles.textDate, {fontWeight: '400'}]: [styles.textDate]}>
                  {moment(item.createdAt).format("YYYY/MM/DD")}
                </Text>
                <Text
                  numberOfLines={2}
                  style={item.readAt? [Theme.textBlack18, { lineHeight: 20 }]: [Theme.textBlack18Bold, { lineHeight: 20 }]}>{item.message}</Text>
              </View>
              <Icon name='chevron-right' color={Colors.GRAY} />
            </TouchableOpacity>
          )}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  infoList: {
    paddingVertical: 20, 
    backgroundColor: 'white', 
    justifyContent: 'flex-end',
    flexDirection: 'row', 
    borderColor: Colors.LIGHTGRAY, 
    borderBottomWidth: 1
  },
  textWrapper: {
    width: scale(225),
  },
  avatorWrapper: {
    width: scale(70),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avator: {
    width: scale(60),
    height: scale(60)
  },
  textDate: {
    ...Theme.textBlack16Bold,
    marginBottom: 5,
  }
});
