import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { Navigation } from 'react-native-navigation';
import DarumaServer,{HOST} from '../utils/DarumaServer';
import { Colors } from '../styles';


type Props = {};
export default class WebViewScreen extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    };
  }
  render() {
    //  let jsCode = ""
    // if(this.props.useToken){
    //   const cookie = `token=${DarumaServer.graphq.accessToken};`;
    //   jsCode = `document.cookie='${cookie};domain=${HOST.match(/^https?:\/{2,}(.*?)(?:\/|\:|\?|#|$)/i)[1]}'`;
    // }
    // console.log("jsCode",jsCode)
    return (
      <WebView 
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled ={true}
        // injectedJavaScript={jsCode}
        source={{
          uri: this.props.url,
          headers: {Authorization: `Bearer ${DarumaServer.graphq.accessToken}`}
        }}
        style={styles.container}>
      </WebView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
