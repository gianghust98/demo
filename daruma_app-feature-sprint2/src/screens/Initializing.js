///<reference path="../api/types.d.ts" />

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { goToInitializing, goToAuth, goHome } from './navigation'
import LineLogin from '@xmartlabs/react-native-line'
import Config from 'react-native-config'
import SInfo from 'react-native-sensitive-info';
import {caesar} from "../utils/caesar-crypt"
import DarumaServer from '../utils/DarumaServer';
import GraphqlView from '../components/GraphqlView';
import mutationLineLogin from "../api/mutationLineLogin"
import mutationLineRegister from "../api/mutationLineRegister"
import mutationAppleLogin from "../api/mutationAppleLogin"
import mutationAppleRegister from "../api/mutationAppleRegister"
import { Mutation } from '../api/types';
import moment, { setServerTime } from "../utils/moment"
import { Theme, Colors } from '../styles';

const secret = 4
  
type Props = {
};
export default class Initializing extends Component {
  constructor(props){
    super(props)
    this.state={
      // lineUserId: null,
      // accessToken: null,
      // lineAuth:  null,
    }
  }

  componentDidMount() {
    this.checkLoginAppleUser()
    .catch(this.checkLoginLineUser)
    // this.checkLoginLineUser()
    .catch(async ()=>{
      await SInfo.deleteItem('currentUserIdentifier', {});
      await SInfo.deleteItem('currentUserIdentityToken', {});
      LineLogin.logout()
      .then((res)=>{})
      .catch((error)=>{})
      .then((res)=>{
        goToAuth()
      })
    })
  }

  async checkLoginAppleUser() {
    // try {
      console.log("checkLoginAppleUser")
      const currentUserIdentifier = await SInfo.getItem('currentUserIdentifier', {});
      console.log("currentUserIdentifier",currentUserIdentifier)
      if(!currentUserIdentifier)  throw new Error()
      const currentUserIdentityToken = await SInfo.getItem('currentUserIdentityToken', {});
      console.log("currentUserIdentityToken",currentUserIdentityToken)
      if(!currentUserIdentityToken)  throw new Error()

      // try {
      //   const credentialState = await appleAuth.getCredentialStateForUser(currentUserIdentifier);
      //   if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
          //　認証
          // Check server user
          let appleAuth = JSON.stringify({
            appleUserId: currentUserIdentifier,
            identityToken: currentUserIdentityToken,
          })
          //appleAuth 暗号化
          appleAuth = caesar(appleAuth, secret);

          return DarumaServer.graphq.client.mutate({
            mutation: mutationAppleLogin,
            variables: { appleAuth },
          })
          .then((res)=>{
            setServerTime(moment(res.data.now))
            const data/*:Mutation["lineLogin"]*/ = res.data.appleLogin

            DarumaServer.graphq.setAuth(data.accessToken, data.user.id)
            goHome()
            
          })
          // .catch((error)=>{
          //   console.log("mutationLineLogin error",error)
          //   // Register
          //   DarumaServer.graphq.client.mutate({
          //     mutation: mutationAppleRegister,
          //     variables: { appleAuth },
          //   })
          //   .then((res)=>{
          //     console.log("mutationLineRegister res",res)
          //     setServerTime(moment(res.data.now))
          //     const data/*:Mutation["lineRegister"]*/ = res.data.appleRegister
          //     DarumaServer.graphq.setAuth(data.accessToken, data.user.id)
          //     goHome()
              
          //   })
            // .catch(GraphqlView.errorAlertView)
            // .catch(GraphqlView.errorCodeCheck)
            // .catch(()=>goToInitializing())
          // })
        // }
      // } catch (error) {
      //   console.log(error)
      //   try {
      //     await appleAuth.performRequest({
      //       requestedOperation: AppleAuthRequestOperation.LOGOUT
      //     });
      //   } catch (error) {
      //   }
      //   return null
      // }  

      // console.log("currentUserIdentifier",currentUserIdentifier) 
    // } catch (error) {
    //   console.log("currentUserIdentifier error",error)
    //   return null
    // }
  }
  async checkLoginLineUser() {
    console.log("checkLoginLineUser")
    // Check line token 
    const accessToken = await LineLogin.getCurrentAccessToken()
    const userProfile = await LineLogin.getProfile()
    console.log("accessToken",accessToken)
    console.log("userProfile",userProfile)

    // Check server user
    let lineAuth = JSON.stringify({
        lineUserId: userProfile.userID,
        accessToken: accessToken.access_token,
        refreshToken: null, //lineAuthInfo.refresh_token,
        expiresIn: null, //new Date(accessToken.expirationDate),
    })
    //lineAuth 暗号化
    lineAuth = caesar(lineAuth, secret);
    // this.setState({
    //   lineUserId: userProfile.userID,
    //   accessToken: accessToken.accessToken,
    //   lineAuth: lineAuth,
    // })
    // Login
    return DarumaServer.graphq.client.mutate({
      mutation: mutationLineLogin,
      variables: { lineAuth },
    })
    .then((res)=>{
      setServerTime(moment(res.data.now))
      const data/*:Mutation["lineLogin"]*/ = res.data.lineLogin

      DarumaServer.graphq.setAuth(data.accessToken, data.user.id)
      goHome()
      
    })
    // .catch((error)=>{
    //   console.log("mutationLineLogin error",error)
    //   // Register
    //   DarumaServer.graphq.client.mutate({
    //     mutation: mutationLineRegister,
    //     variables: { lineAuth },
    //   })
    //   .then((res)=>{
    //     console.log("mutationLineRegister res",res)
    //     setServerTime(moment(res.data.now))
    //     const data/*:Mutation["lineRegister"]*/ = res.data.lineRegister
    //     DarumaServer.graphq.setAuth(data.accessToken, data.user.id)
    //     goHome()
        
    //   })
    //   .catch(GraphqlView.errorAlertView)
    //   .catch(GraphqlView.errorCodeCheck)
    //   .catch(()=>goToInitializing())
    // })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.darumaWrapper}>
          <Image source={Images.img_daruma_green} style={styles.img}/>
          <Text style={styles.text}>ログイン中..</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#DDD'
  },
  darumaWrapper: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 106,
    height: 106,
  },
  img: {
    marginBottom: 5
  },
  text: {
    color: Colors.LAPALMA,
    fontWeight: 'bold',
    fontSize: 12,
  },
  textw: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
