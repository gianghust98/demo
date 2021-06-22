import React, {Component} from 'react';
import { SectionList, StyleSheet, Text, View, Dimensions, Alert, Platform } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Navigation } from 'react-native-navigation';
import { graphql } from '@apollo/client/react/hoc';
import LineLogin from '@xmartlabs/react-native-line'
import SInfo from 'react-native-sensitive-info';

import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'

import {caesar} from "../utils/caesar-crypt"
import GraphqlView from '../components/GraphqlView';
import fitbitOauth from '../utils/FitbitOauth';
import omronOauth from '../utils/OmronOauth';
import DarumaServer from '../utils/DarumaServer';
import queryIsAuth from '../api/queryIsAuth'
import mutationLineAddAuth from "../api/mutationLineAddAuth"
import mutationLineRemoveAuth from "../api/mutationLineRemoveAuth"
import mutationAppleAddAuth from "../api/mutationAppleAddAuth"
import mutationAppleRemoveAuth from "../api/mutationAppleRemoveAuth"


import Images from '../../res/img'
import { Colors, Theme } from '../styles'

const secret = 4

@graphql(queryIsAuth, { name: 'queryIsAuth'}) 
export default class SettingAuth extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '認証',
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

  async AppleLink() {
    if(appleAuth.isSupported && appleAuth.isSignUpButtonSupported){
      // user cancelled Apple Sign-in
      // console.log("AppleLink")
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME
        ],
      });
      const {
        user,
        identityToken,
      } = appleAuthRequestResponse;

      let appleAuthaa = JSON.stringify({
        appleUserId: user,
        identityToken: identityToken,
      })
      //appleAuth 暗号化
      appleAuthaa = caesar(appleAuthaa, secret);

      GraphqlView.mutateLoadingView(
        DarumaServer.graphq.client.mutate({
          mutation: mutationAppleAddAuth,
          variables: { appleAuth:appleAuthaa },
        })
      ).then(async ()=>{
        await SInfo.setItem('currentUserIdentifier', user, {});
        await SInfo.setItem('currentUserIdentityToken', identityToken, {});
      }).catch(async (error)=>{
        await SInfo.deleteItem('currentUserIdentifier', {});
        await SInfo.deleteItem('currentUserIdentityToken', {});
      }).then(()=>{
        this.props.queryIsAuth.refetch()
      })
    }else{
      Alert.alert(
        `この端末ではApplの認証を設定できません`,
        '',
        [
          {text: 'キャンセル'},
        ],
        { cancelable: false },
      )
    }
    
  }
  async AppleUnlink() {
    Alert.alert(
      `Applの認証を解除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '解除', onPress: () => {
          GraphqlView.mutateLoadingView(
            DarumaServer.graphq.client.mutate({
              mutation: mutationAppleRemoveAuth,
            })
          ).then(async ()=>{
            await SInfo.deleteItem('currentUserIdentifier', {});
            await SInfo.deleteItem('currentUserIdentityToken', {});
          })
        }, style: 'destructive'},
      ],
      { cancelable: false },
    )
  }

  async LineLink() {

    // console.log("LineLink")
    const user = await LineLogin.login()
    // console.log(user)

    const accessToken = await LineLogin.getCurrentAccessToken()
    const userProfile = await LineLogin.getProfile()
    // console.log("accessToken",accessToken)
    // console.log("userProfile",userProfile)

    // Check server user
    let lineAuth = JSON.stringify({
        lineUserId: userProfile.userID,
        accessToken: accessToken.access_token,
        refreshToken: null, //lineAuthInfo.refresh_token,
        expiresIn: null, //new Date(accessToken.expirationDate),
    })
    //lineAuth 暗号化
    lineAuth = caesar(lineAuth, secret);

    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: mutationLineAddAuth,
        variables: { lineAuth },
      })
    ).catch(async (error)=>{
      await LineLogin.logout()
    }).then(()=>{
      this.props.queryIsAuth.refetch()
    })

  }
  async LineUnlink() {
    Alert.alert(
      `LINEの認証を解除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '解除', onPress: () => {
          GraphqlView.mutateLoadingView(
            DarumaServer.graphq.client.mutate({
              mutation: mutationLineRemoveAuth,
            })
          )
        }, style: 'destructive'},
      ],
      { cancelable: false },
    )
  }

  
  render() {
    const {queryIsAuth}= this.props
    const noneRightTitleStyle={
      color: Colors.LAPALMA, fontSize: 16, borderWidth: 1, borderColor: Colors.LAPALMA, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 15 
    }
    const hasRightTitleStyle={ 
      color: Colors.MANDY, fontSize: 16, borderWidth: 1, borderColor: Colors.MANDY, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 15,
      }
    const listdata = [
      { title: '', type:"device", data: [
        {
          name:'Sign in with Apple',
          type:"Apple",
          // avatar:Images.appicon_fitbit,
          rightTitleStyle: !queryIsAuth.loading && !queryIsAuth.error && queryIsAuth.currentUser.isAuthApple && hasRightTitleStyle || noneRightTitleStyle,
          rightTitle : (queryIsAuth.loading && "読み込み"|| queryIsAuth.error && "エラー"|| queryIsAuth.currentUser.isAuthApple && "解除する" || "連携する")
        },
        {
          name:'LINE',
          type:"Line",
          // avatar:Images.appicon_omron,
          rightTitleStyle: !queryIsAuth.loading && !queryIsAuth.error && queryIsAuth.currentUser.isAuthLine && hasRightTitleStyle || noneRightTitleStyle,
          rightTitle : (queryIsAuth.loading && "読み込み"|| queryIsAuth.error && "エラー"|| queryIsAuth.currentUser.isAuthLine && "解除する" || "連携する")
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
                    case "Apple":
                     if(!queryIsAuth.currentUser.isAuthApple){
                      this.AppleLink()
                     }else{
                      this.AppleUnlink()
                     }
                      break
                    case "Line":
                      if(!queryIsAuth.currentUser.isAuthLine){
                        this.LineLink()
                      }else{
                        this.LineUnlink()
                      }
                      break
                    default:
                      break
                  }
                }}
              />)
            }}
        />

        <GraphqlView query={queryIsAuth}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
