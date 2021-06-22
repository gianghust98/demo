import React, {Component} from 'react';
import { SectionList, StyleSheet, Text, View, Dimensions, Alert, Platform } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Navigation } from 'react-native-navigation';
import { graphql } from '@apollo/client/react/hoc';
import {caesar} from "../utils/caesar-crypt"
import GraphqlView from '../components/GraphqlView';
import fitbitOauth from '../utils/FitbitOauth';
import omronOauth from '../utils/OmronOauth';
import DarumaServer from '../utils/DarumaServer';
import queryWearableDevice from '../api/queryWearableDevice'
import mutationFitbitToken from "../api/mutationFitbitToken"
import mutationFitbitUnlink from "../api/mutationFitbitUnlink"
import mutationOmronToken from "../api/mutationOmronToken"
import mutationOmronUnlink from "../api/mutationOmronUnlink"

import Images from '../../res/img'
import { Colors, Theme } from '../styles'

import { QueryWearableDevice } from '../api/types';

const { width, height } = Dimensions.get('window');


type Props = {
  queryWearableDevice:QueryWearableDevice
};


@graphql(queryWearableDevice, { name: 'queryWearableDevice'}) 
export default class SettingWearableDevice extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'デバイス連携',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    };
  }
  constructor(props){
    super(props)
    this.state={
    }
  }


  async fitbitLink() {
    const secret = 2
    try {
      const oauth = await fitbitOauth()
      // Check server user
      console.log("fitbitOauth", oauth)
      let fitbitAuth = JSON.stringify({
        fitbitUserId:  oauth.tokenAdditionalParameters.user_id, //(Platform.OS === 'android')? oauth.additionalParameters.user_id: oauth.tokenAdditionalParameters.user_id, 
        accessToken: oauth.accessToken,
        refreshToken: oauth.refreshToken,
        accessTokenExpirationDate: new Date(oauth.accessTokenExpirationDate),
      })

      fitbitAuth = caesar(fitbitAuth, secret)
      GraphqlView.mutateLoadingView(
        DarumaServer.graphq.client.mutate({
          mutation: mutationFitbitToken,
          variables: { fitbitAuth },
        })
      )
    } catch (error) {
      console.log("errorerror",error)
    }
  }

  fitbitUnlink() {
    Alert.alert(
      `Fitbit®️の連携を解除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '解除', onPress: () => {
          GraphqlView.mutateLoadingView(
            DarumaServer.graphq.client.mutate({
              mutation: mutationFitbitUnlink,
            })
          )
        }, style: 'destructive'},
      ],
      { cancelable: false },
    )
  }

  async omronLink() {
    const secret = 4
    const oauth = await omronOauth()

    // Linking.openURL("omronconnect://")
    // .catch(()=>Linking.openURL(Platform.OS==="android" ?
    //   "https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile" :
    //   "https://itunes.apple.com/jp/app/fitbit/id462638897"))
    // const oauth = await fitbitOauth()
    // console.log(oauth)

    // Check server user
    // console.log("oauthoauthoauth", oauth)
    let omronAuth = JSON.stringify({
      omronUserId: oauth.tokenAdditionalParameters.id, //(Platform.OS === 'android')? oauth.additionalParameters.id: oauth.tokenAdditionalParameters.id,
      accessToken: oauth.accessToken,
      refreshToken: oauth.refreshToken,
      accessTokenExpirationDate: new Date(oauth.accessTokenExpirationDate),
    })

    omronAuth = caesar(omronAuth, secret)
    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: mutationOmronToken,
        variables: { omronAuth },
      })
    )
  }
  omronUnlink() {
    Alert.alert(
      `オムロンコネクトの連携を解除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '解除', onPress: () => {
          GraphqlView.mutateLoadingView(
            DarumaServer.graphq.client.mutate({
              mutation: mutationOmronUnlink,
            })
          )
        }, style: 'destructive'},
      ],
      { cancelable: false },
    )
  }
  render() {
    const {queryWearableDevice}= this.props
    const noneRightTitleStyle={
      color: Colors.LAPALMA, fontSize: 16, borderWidth: 1, borderColor: Colors.LAPALMA, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 15 
    }
    const hasRightTitleStyle={ 
      color: Colors.MANDY, fontSize: 16, borderWidth: 1, borderColor: Colors.MANDY, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 15,
      }
    const listdata = [
      { title: '', type:"device", data: [
        {
          name:'Fitbit®️',
          type:"fitbit",
          avatar:Images.appicon_fitbit,
          rightTitleStyle: !queryWearableDevice.loading && !queryWearableDevice.error && queryWearableDevice.currentUser.fitbitLink.linked && hasRightTitleStyle || noneRightTitleStyle,
          rightTitle : (queryWearableDevice.loading && "読み込み"|| queryWearableDevice.error && "エラー"|| queryWearableDevice.currentUser.fitbitLink.linked && "解除する" || "連携する")
        },
        {
            name:'オムロンコネクト',
            type:"omron",
            avatar:Images.appicon_omron,
            rightTitleStyle: !queryWearableDevice.loading && !queryWearableDevice.error && queryWearableDevice.currentUser.omronLink.linked && hasRightTitleStyle || noneRightTitleStyle,
            rightTitle : (queryWearableDevice.loading && "読み込み"|| queryWearableDevice.error && "エラー"|| queryWearableDevice.currentUser.omronLink.linked && "解除する" || "連携する")
        },
      ]},
    ]
    // const settings = querySetting.currentUser && querySetting.currentUser.setting || {}
    return (
      <View style={{flex:1, backgroundColor: Colors.WHITESMOKE}}>
        <SectionList
          style={{flex:1}}
          sections={listdata}
          keyExtractor={(item, index) => item.name + index}
          renderSectionHeader={({section: {title}}) => (title) ? 
            <ListItem
              containerStyle={{backgroundColor: Colors.WHITESMOKE, paddingTop: 20, borderBottomColor: Colors.LIGHTGRAY, borderTopColor: Colors.LIGHTGRAY}}
              rightIcon={<View />}
              title={title}
              titleStyle={Theme.textDimGray20}
            /> : null}
          renderItem={({item, index, section: {type}}) => {
            return ( 
              <ListItem
                containerStyle={{ backgroundColor: '#FFF', borderBottomColor: Colors.LIGHTGRAY, borderTopColor: Colors.LIGHTGRAY }}
                avatar={item.avatar}
                avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
                hideChevron
                rightTitle={item.rightTitle}
                rightTitleStyle={item.rightTitleStyle}
                title={item.name}
                titleStyle={Theme.textBlack16Bold}
                onPress={async ()=>{
                  switch(item.type){
                    case "fitbit":
                     if(!queryWearableDevice.currentUser.fitbitLink.linked){
                      this.fitbitLink()
                     }else{
                      this.fitbitUnlink()
                     }
                      break
                    case "omron":
                      if(!queryWearableDevice.currentUser.omronLink.linked){
                      this.omronLink()
                      }else{
                      this.omronUnlink()
                      }
                      break
                    default:
                      break
                  }
                }}
              />)
            }}
        />

        <GraphqlView query={queryWearableDevice}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
