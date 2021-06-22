import React, {Component} from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import { ListItem, Divider } from 'react-native-elements'
import { graphql } from '@apollo/client/react/hoc';
import { Navigation } from 'react-native-navigation';

import SettingWearableDevice from "./SettingWearableDevice"

import DarumaServer from '../utils/DarumaServer';
import querySharingMedicalInstitutions from '../api/querySharingMedicalInstitutions';
import queryPendingSharingMedicalInstitutions from '../api/queryPendingSharingMedicalInstitutions';
import mutationSharingMedicalInstitutionAccept from '../api/mutationSharingMedicalInstitutionAccept';
import mutationSharingMedicalInstitutionCancel from '../api/mutationSharingMedicalInstitutionCancel';

import mutationSetting from '../api/mutationSetting';
import GraphqlView from '../components/GraphqlView';

import { QuerySharingMedicalInstitutions } from '../api/types';
import { Theme, Colors } from '../styles';
import SettingCancelDataSharing from './SettingCancelDataSharing';

const { width, height } = Dimensions.get('window');

type Props = {
  querySharingMedicalInstitutions:QuerySharingMedicalInstitutions,
  queryPendingSharingMedicalInstitutions:QueryPendingSharingMedicalInstitutions
};
@graphql(querySharingMedicalInstitutions, { name: 'querySharingMedicalInstitutions'}) 
// @graphql(queryPendingSharingMedicalInstitutions, { name: 'queryPendingSharingMedicalInstitutions' ,options:{pollInterval: 3000}}) 
@graphql(mutationSharingMedicalInstitutionAccept, { name: 'mutationSharingMedicalInstitutionAccept'}) 
@graphql(mutationSharingMedicalInstitutionCancel, { name: 'mutationSharingMedicalInstitutionCancel'}) 

export default class SettingDataSharingManagement extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'データ共有管理',
          color: Colors.GRAY,
          fontWeight: 'bold',
        }
      },
    };
  }
  constructor(props){
    super(props)
    Navigation.events().bindComponent(this);
    this.state={
      statusEditModal:null
    }
    this.pendingViewing = false
    this.polingPendingTimer = 0
  }

  componentDidAppear() {
    this.polingPendingTimer = 0
    if(!this.pendingViewing)this.polingPending()
    if(!this.props.querySharingMedicalInstitutions.loading)this.props.querySharingMedicalInstitutions.refetch()
  }
  componentDidDisappear(){
    clearTimeout(this.polingPendingTimer)
    this.polingPendingTimer = null
  }

  componentWillReceiveProps(nextProps){
  }

  polingPending(){
    this.polingPendingTimer = 0
    DarumaServer.graphq.client.query({
      query:queryPendingSharingMedicalInstitutions
    })
    .then(res=>{
      // console.log(res)
      if(res.data.pendingSharingMedicalInstitutions.length > 0){
        if(!this.pendingViewing){
          this.pendingViewing = true
          this.showPendingView(res.data.pendingSharingMedicalInstitutions[0])
        }
      }else{
        if(this.polingPendingTimer !==null) this.polingPendingTimer = setTimeout(()=>this.polingPending(),3000)
      }
    })

  }

  showPendingView(next){
    Alert.alert(
      `データ共有申請`,
      next.setting.name +" がデータ共有を求めています。許可しますか?",
      [
        {text: 'キャンセル', onPress: () => this.onCancelPendingView(next)},
        {text: '許可', style: 'destructive', onPress: () => this.onAcceptPendingView(next)},
      ],
      { cancelable: false },
    )
  }
  onAcceptPendingView(next){
    GraphqlView.mutateLoadingView(
      this.props.mutationSharingMedicalInstitutionAccept({ variables: {medicalInstitutionUserId:next.id}})
    )
    .catch(()=>{})
    .then(()=>{
      this.pendingViewing = false
      this.props.querySharingMedicalInstitutions.refetch()
      this.polingPending()
    })
  }
  onCancelPendingView(next){
    GraphqlView.mutateLoadingView(
      this.props.mutationSharingMedicalInstitutionCancel({ variables: {medicalInstitutionUserId:next.id}})
    )
    .catch(()=>{})
    .then(()=>{
      this.pendingViewing = false
      this.polingPending()
    })
  }


  render() {
    const {querySharingMedicalInstitutions}= this.props
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.container}>
          <View style={styles.topWrapper}>
            <Text style={[Theme.textDimGray20, { marginBottom: 5 }]}>共有コード</Text>
            <Text style={styles.textBox}>{querySharingMedicalInstitutions.currentUser && querySharingMedicalInstitutions.currentUser.setting.sharelingCode || ""}</Text>
            <Text style={[Theme.textDimGray20, { marginBottom: 15, lineHeight: 22 }]}>上記、共有コードを本アプリに対応している医療機関に提示すると、以下のデータが共有されます。また共有したデータは共有先の医療機関で、医療者との<Text style={[Theme.textDimGray20, { lineHeight: 22, color: Colors.VENETIANRED, fontWeight: '500'}]}>コミュニケーション</Text>などにご活用ください。</Text>
            <Text style={[Theme.textBlack20Bold, { marginBottom: 5 }]}>
              ■共有されるデータ
            </Text>
            <Text style={[Theme.textBlack20Bold, { marginBottom: 3, lineHeight: 24 }]}>
            ・基本情報：性別、生まれた年、郵便番号頭3桁{'\n'}
            ・ライフログデータ：血圧と脈拍、体重、歩数、睡眠、服薬、塩分摂取量、体温{'\n'}
            ・既往歴：喫煙、糖尿病、脳血管疾患、心臓病変、腎臓病、血管病変、家族歴
            </Text>
            <Text style={[Theme.textDimGray16, { marginBottom: 15 }]}>
            ※共有したデータの取り扱いにつきましては、共有先の医療機関とご相談ください</Text>
            <Text style={[Theme.textDimGray20, { marginBottom: 10 }]}>現在のデータ共有先</Text>
            
          </View>
          <Divider style={{ backgroundColor: Colors.LIGHTGRAY }} />
          <FlatList 
            contentContainerStyle={{ marginBottom: 30 }}
            keyExtractor={(item, index) => `${item.id}`}
            data={querySharingMedicalInstitutions.sharingMedicalInstitutions}
            renderItem={({item}) => 
              <ListItem
                containerStyle={{ backgroundColor: '#FFF', paddingTop: 15, paddingBottom: 15 }}
                title={item.setting.name}
                titleStyle={Theme.textBlack20Bold}
                onPress={() => Navigation.push(this.props.componentId, {component: {name:`navigation.SettingCancelDataSharing`, passProps:{sharingMedicalInstitution:item}, options:SettingCancelDataSharing.options()}})}
              />
            }
          />
        </ScrollView>
        <GraphqlView query={querySharingMedicalInstitutions}/>
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
  }, 
  textBox: {
    borderWidth: 1,
    borderColor: Colors.DARKGRAY,
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15, 
    color: Colors.BLACK
  }
});
