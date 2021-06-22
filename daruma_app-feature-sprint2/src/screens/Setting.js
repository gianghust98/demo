import React, {Component} from 'react';
import { SafeAreaView, SectionList, StyleSheet, View, Text, Switch, TouchableOpacity, Platform } from 'react-native';
import { ListItem, Divider } from 'react-native-elements'
import { Navigation } from 'react-native-navigation';
import { graphql } from '@apollo/client/react/hoc';
import Config from 'react-native-config';

import SettingWearableDevice from "./SettingWearableDevice"
import GraphqlView from '../components/GraphqlView';
import SettingDelete from './SettingDelete';
import OpenLicenseListScreen from './OpenLicenseListScreen';

import DarumaServer,{HOST} from '../utils/DarumaServer';
import querySetting from '../api/querySetting';
import mutationSetting from '../api/mutationSetting';

import { QuerySetting } from '../api/types';
import { Theme, Colors } from '../styles';

import SettingDataSharingManagement from './SettingDataSharingManagement';
import WebViewScreen from './WebViewScreen';
type Props = {
  querySetting:QuerySetting
};


@graphql(querySetting, { name: 'querySetting'}) 
export default class Setting extends Component<Props> {
  static listdata = [
    { title: '', type:"doctor", data: [
      {name:'データの共有先管理', push:{component: {name: `navigation.SettingDataSharingManagement`}}},
      {name:'高血圧について学ぶ',push:{component: {name: `navigation.WebViewScreen`, passProps:{useToken:true, url:`${HOST}/learning/index?a=1`}}}},
    ]},
    { title: 'ログイン', type:"device", data: [
      {name:'認証サービス',push:{component: {name:`navigation.SettingAuth`}}},
    ]},
    { title: '連携', type:"device", data: [
      {name:'デバイス連携',push:{component: {name:`navigation.SettingWearableDevice`}}},
    ]},
    { title: '入力項目設定', type:"settingOptions", data: [
      {name:'体重',parameter:"showBodyWeight"},
      {name:'血圧を下げる薬',parameter:"showStepDownMedicineState"},
      {name:'塩分摂取量',parameter:"showSaltConcentration"},
      {name:'体温',parameter:"showBodyTemperature"},
    ]},
    { title: 'サポート', type:"support", data: [
      {name:'よくあるご質問', push:{component: {name: `navigation.WebViewScreen`, passProps:{useToken:false, url:'https://tayori.com/faq/f3849cb250d846ac1830a3df98f01180b6c4b0d6'}}}} ,
      {name:'お問い合わせ', push:{component: {name: `navigation.WebViewScreen`, passProps:{useToken:false, url:'https://tayori.com/form/8ec878bed9de64f6453f99f540a04e60baf35a01'}}}},
      {name:'利用規約',push:{component: {name: `navigation.WebViewScreen`, passProps:{useToken:false, url:`${HOST}/public/terms.html`}}}},
      {name:'プライバシーポリシー',push:{component: {name: `navigation.WebViewScreen`, passProps:{useToken:false, url:`https://www.orso.jp/privacypolicy.html`}}}},
      {name:'オープンソースライセンス',push:{component: {name: `navigation.OpenLicenseListScreen`}}},
      {name:'データの削除',push:{component: {name: `navigation.SettingDelete`}}},
    ]},
  ]
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '設定',
          color: Colors.GRAY,
          fontWeight: 'bold',
        }
      }
    }
  }

  
  constructor(props){
    super(props)
    this.state={
      statusEditModal:null,
    }


  }
  onChangeSwitch(data, item){
    const params = {}
    params[item.parameter] = data
    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: mutationSetting,
        variables: params,
      })
    )
  }

  render() {
    const {querySetting}= this.props
    const settings = querySetting.currentUser && querySetting.currentUser.setting || {}
    return (
        <View style={styles.container}>
          <SectionList
            bounces={true}
            style={{ flex: 1 }}
            sections={this.constructor.listdata}
            keyExtractor={(item, index) => item.name + index}
            ListFooterComponent={() =>
              <Text style={[Theme.textBlack16, { textAlign: 'center', padding: 10, color: Colors.DIMGRAY }]}>{`version   ${Config.VER_NAME}`}</Text>
            }
            renderSectionHeader={({section: {title}}) => (title) ? 
              <ListItem
                containerStyle={{ backgroundColor: Colors.WHITESMOKE, paddingTop: 30, borderTopColor: Colors.LIGHTGRAY, borderBottomColor: Colors.LIGHTGRAY }}
                rightIcon={<View />}
                title={title}
                titleStyle={Theme.textDimGray20}
              /> : null}
            renderItem={({item, index, section: {type}}) => {
              switch(type){
                case "settingOptions":
                return (
                  <View 
                    style={styles.listContainer}>
                    <Text style={Theme.textBlack20Bold}>{item.name}</Text>
                    <Switch 
                      disabled={querySetting.loading}
                      value={settings[item.parameter]}
                      onValueChange={(data)=>this.onChangeSwitch(data, item)}
                      thumbColor={Platform.OS === 'android'? Colors.WHITESMOKE : null}
                      trackColor={{true: Colors.LAPALMA, false: null}}
                      ios_backgroundColor={Colors.LIGHTGRAY}
                      />
                  </View>
                )
                default:
                  return (
                    <ListItem
                      containerStyle={{ backgroundColor: Colors.WHITE, paddingTop: 20, paddingBottom: 20, borderBottomWidth:1, borderBottomColor: Colors.LIGHTGRAY,}}
                      titleStyle={Theme.textBlack20Bold}
                      title={item.name}
                      onPress={()=>{
                        if(item.push){
                          Navigation.push(this.props.componentId, item.push);
                        }
                      }}
                      rightIcon={{
                        name: 'chevron-right',
                        type: 'evilicon',
                        color: Colors.LIGHTGRAY,
                      }}
                    />)
                }
              }}
          />
          <GraphqlView query={querySetting}/>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITESMOKE
  },
  listContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: Colors.LIGHTGRAY,
    borderBottomColor: Colors.LIGHTGRAY,
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  }
});
