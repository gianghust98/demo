import { Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
// import inAppMessaging from '@react-native-firebase/in-app-messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

export async function bgMessaging(message) {
  console.log(message)
  return Promise.resolve();
}

export default class Messaging {
  constructor(props) {
    this.messageListener =  null
    this.notificationDisplayedListener = null
    this.notificationListener = null
    this.notificationOpenedListener = null
    this.openInfoFunc = null
  }

  get firebase(){
    return firebase
  }

  setOpenInfoFunc(openInfoFunc){
    this.openInfoFunc = openInfoFunc
  }

  async messagingDidMount(){
    messaging().onMessage(this.onMessage);
  }

  messagingWillUnmount(){
    // this.messageListener();
    // this.notificationDisplayedListener();
    // this.notificationListener();
    // this.notificationOpenedListener();
    console.log("remove messageListener")
  }

  async onMessageInit(){
    // console.log("onMessageInit ==============================================")
    const authStatus = await messaging().requestPermission();
    
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      // Must be outside of any component LifeCycle (such as `componentDidMount`).


    PushNotification.createChannel(
      {
        channelId: "default", // (required)
        channelName: "お知らせ", // (required)
        channelDescription: "おしらせが届きます'", // (optional) default: undefined.
        // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    const fcmToken = await messaging().getToken();
    // Alert.alert(fcmToken.toString())
    return fcmToken
  }

  onMessage(message){
    console.log("onMessage",message.notification)
    Alert.alert(message.notification.title, message.notification.body)
    // console.log(
    // // PushNotificationIOS.presentLocalNotification({
    // //   alertBody:message.notification.body,
    // //   alertTitle:message.notification.title,
    // // })
    //   PushNotification.localNotification({
    //     /* Android Only Properties */
    //     channelId: "default", 
      
    //     /* iOS and Android properties */
    //     title: message.notification.title,
    //     message: message.notification.body,
    //   })
    // )
  }
}