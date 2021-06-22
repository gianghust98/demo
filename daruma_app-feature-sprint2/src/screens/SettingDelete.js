import React, {Component} from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import LineLogin from '@xmartlabs/react-native-line'
import SInfo from 'react-native-sensitive-info';

import { goToAuth } from './navigation'
import DarumaServer from '../utils/DarumaServer';
import mutationDeleteUser from '../api/mutationDeleteUser';
import GraphqlView from '../components/GraphqlView';

import { Theme, Colors } from '../styles';

const { width, height } = Dimensions.get('window');

export default class SettingDelete extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'データの削除',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    };
  }
  constructor(props){
    super(props)
    this.state={
      statusEditModal:null
    }
  }

  deleteAllData(){
    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: mutationDeleteUser,
      })
      .then(
        async ()=>{
          await SInfo.deleteItem('currentUserIdentifier', {});
          await SInfo.deleteItem('currentUserIdentityToken', {});
          LineLogin.logout()
          DarumaServer.graphq.clearAuth()
          Navigation.dismissAllModals();
          setTimeout(()=>{
            goToAuth()  
          },500)
        }
      )
    )
  }
  showAlert() {
    Alert.alert(
      ``,
      `削除した場合のデータの取り扱いについては確認しましたか？`,
      [
        {text: 'キャンセル'},
        {text: '確認した', onPress: () => this.showAlert2()},
      ],
      { cancelable: false },
    )
  }

  showAlert2() {
    Alert.alert(
      ``,
      `本当に削除しますが${'\n'}よろしいですか？`,
      [
        {text: 'キャンセル'},
        {text: '削除する', onPress: () => this.deleteAllData(), style: 'destructive'},
      ],
      { cancelable: false },
    )
  }

  render() {
    const {querySetting}= this.props
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.container} bounces={false}>
          <View style={styles.topWrapper}>
            <Text style={[Theme.textBlack16, { marginBottom: 25 }]}>データの削除をしたい場合は登録されていた情報は以下のような取り扱いとなります。</Text>
           
              <Text style={[Theme.textBlack16Bold, { marginBottom: 10 }]}>
                ・医療機関とのデータ共有の解除
              </Text>
              <Text style={[Theme.textBlack16, {width: '90%', marginLeft: 15, marginBottom: 30 }]}>
                医療機関からはあなたの情報は一切見れなくなります。
              </Text>
          
              <Text style={[Theme.textBlack16Bold, { marginBottom: 10 }]}>
                ・データの削除
              </Text>
              <Text style={[Theme.textBlack16, {width: '90%', marginLeft: 15, marginBottom: 50}]}>
                登録されている情報は全て削除され{'\n'}処理実行後、復旧することもできません
              </Text>
            </View>
            <Text style={styles.textDelete} onPress={() => this.showAlert()}>削除する</Text>
        </ScrollView>
        <GraphqlView query={querySetting}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITESMOKE,
    paddingTop: 20,
  },
  topWrapper: {
    paddingHorizontal: 20, 
    justifyContent: 'space-around',
  }, 
  textDelete: {
    fontSize: 18,
    color: Colors.MANDY,
    paddingVertical: 20,
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: width
  }
});
