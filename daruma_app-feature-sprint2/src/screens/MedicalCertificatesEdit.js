import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation';
import moment, {getServerMoment} from '../utils/moment';

import RecordLabelForm from '../components/RecordLabelForm';
import CustomCheckBox from '../components/CustomCheckBox';
import GraphqlView from '../components/GraphqlView';
import SaveButton from '../components/SaveButton';

import DarumaServer from '../utils/DarumaServer';
import mutationAddMedicalCertificate from '../api/mutationAddMedicalCertificate';
import mutationEditMedicalCertificate from '../api/mutationEditMedicalCertificate';
import mutationDeleteMedicalCertificate from '../api/mutationDeleteMedicalCertificate';
import queryMedicalCertificates from '../api/queryMedicalCertificates';
import { Theme, Colors } from '../styles';
// import { QueryMedicalCertificates } from '../api/types';

// type Props = {
//   queryMedicalCertificates:QueryMedicalCertificates
// };

// @graphql(queryMedicalCertificates, { name: 'queryMedicalCertificates'}) 
export default class MedicalCertificatesEdit extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        // rightButtons: {
        //   id: 'buttonAdd',
        //   text: '保存',
        //   color: Colors.LAPALMA,
        //   fontWeight: 'bold'
        // },
        title: {
          text: '健診結果の入力',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      }
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    const { medicalCertificate } = this.props
    this.state = {
      ...medicalCertificate,
      isLdl: medicalCertificate && medicalCertificate.totalCholesterol ? false : true
    }
    if(!this.state.inspectedAt)this.state.inspectedAt = getServerMoment().format("YYYY-MM-DD")
  }

  // navigationButtonPressed({ buttonId }) {
  //   switch (buttonId) {
  //     case "buttonAdd":
  //       this.saveMedicalCertificate()
  //       break
  //     default:
  //       break
  //   }
  // }

  saveMedicalCertificate() {
    const params = {}
    this.setParamsItem(params, this.state, "id")
    this.setParamsItemFloat(params, this.state, "bodyHeight")
    this.setParamsItemFloat(params, this.state, "bodyWeight")
    this.setParamsItemFloat(params, this.state, "bodyWaist")
    this.setParamsItem(params, this.state, "maximum")
    this.setParamsItem(params, this.state, "minimum")
    this.setParamsItem(params, this.state, "pulse")
    this.setParamsItem(params, this.state, "hdlCholesterol")
    if(this.state.isLdl){
      this.setParamsItem(params, this.state, "ldlCholesterol")
      params.totalCholesterol = null
    }else{
      params.ldlCholesterol = null
      this.setParamsItem(params, this.state, "totalCholesterol")
    }
    this.setParamsItem(params, this.state, "neutralFat")
    this.setParamsItem(params, this.state, "bloodSugarLevel")
    this.setParamsItem(params, this.state, "bloodSugarLevelMeasureState")
    this.setParamsItem(params, this.state, "hba1c")
    this.setParamsItem(params, this.state, "inspectedAt")

    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: (params.id) ? mutationEditMedicalCertificate : mutationAddMedicalCertificate,
        variables: params,
      })
      .then((res) => {
        Navigation.pop(this.props.componentId);
      })
    )
  }

  deleteMedicalCertificate() {

    Alert.alert(
      `この健康診断を削除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '削除', onPress: () => {
          const params = {}
          this.setParamsItem(params, this.state, "id")
          GraphqlView.mutateLoadingView(
            DarumaServer.graphq.client.mutate({
              mutation: mutationDeleteMedicalCertificate,
              variables: params,
            })
            .then((res) => {
              Navigation.pop(this.props.componentId);
            })
      
          )
        }, style: 'destructive'},
      ],
      { cancelable: false },
    )
  }

  setParamsItem(params, state, name) {
    if (state[name] === undefined || state[name] === "") return
    params[name] = state[name]
  }
  setParamsItemFloat(params, state, name, decimals) {
    this.setParamsItem(params, state, name)
    params[name] = Math.round(params[name]*(10^decimals))/(10^decimals)
  }

  render() {
    const { medicalCertificate } = this.state
    return (
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          keyboardDismissMode='on-drag'
          style={styles.container}>
          <RecordLabelForm
            containerStyle={{ marginTop: 30 }}
            mode='time'
            textLabel='健診日'
            value={this.state.inspectedAt}
            onChangeText={(text) => this.setState({ inspectedAt: text })}
          />
          <RecordLabelForm
            textLabel='身長'
            textRight='cm'
            keyboardType='decimal-pad'
            value={this.StringOn(this.state.bodyHeight)}
            onChangeText={(text) => this.setState({ bodyHeight: text })}
          />
          <RecordLabelForm
            textLabel='体重'
            textRight='kg'
            keyboardType='decimal-pad'
            value={this.StringOn(this.state.bodyWeight)}
            onChangeText={(text) => this.setState({ bodyWeight: text })}
          />
          <RecordLabelForm
            textLabel='腹囲(ウエスト周囲径)'
            textRight='cm'
            keyboardType='decimal-pad'
            value={this.StringOn(this.state.bodyWaist)}
            onChangeText={(text) => this.setState({ bodyWaist: text })}
          />
          <RecordLabelForm
            textLabel='最高血圧'
            textRight='mmHg'
            value={this.StringOn(this.state.maximum)}
            onChangeText={(text) => this.setState({ maximum: text })}
          />
          <RecordLabelForm
            textLabel='最低血圧'
            textRight='mmHg'
            value={this.StringOn(this.state.minimum)}
            onChangeText={(text) => this.setState({ minimum: text })}
          />
          <RecordLabelForm
            textLabel='脈拍'
            textRight='拍/分'
            value={this.StringOn(this.state.pulse)}
            onChangeText={(text) => this.setState({ pulse: text })}
          />
          <RecordLabelForm
            textLabel='HDLコレステロール'
            textRight='mg/dL'
            value={this.StringOn(this.state.hdlCholesterol)}
            onChangeText={(text) => this.setState({ hdlCholesterol: text })}
          />

          <Text style={[Theme.textBlack18Bold, { marginBottom: 5 }]}>LDLコレステロールまたは{"\n"}総コレステロール</Text>
          <Text style={{ color: Colors.MANDY, fontSize: 16, fontWeight: 'bold' }}>※LDLコレステロールの計測結果がない場合に{"\n"}総コレステロールを入力してください</Text>

          <CustomCheckBox
            full
            checked={this.state.isLdl}
            onPress={() => this.setState({ isLdl: true })}
            title='LDLコレステロール'
            containerStyle={{ marginVertical: 20 }}
          />
          <CustomCheckBox
            full
            checked={!this.state.isLdl}
            onPress={() => this.setState({ isLdl: false })}
            title='総コレステロール'
            containerStyle={{ marginBottom: 20 }}
          />
          {this.state.isLdl ?
            <RecordLabelForm
              textRight='mg/dL'
              value={this.StringOn(this.state.ldlCholesterol)}
              onChangeText={(text) => this.setState({ ldlCholesterol: text })}
            />
            :
            <RecordLabelForm
              textRight='mg/dL'
              value={this.StringOn(this.state.totalCholesterol)}
              onChangeText={(text) => this.setState({ totalCholesterol: text })}
            />
          }
          {/* <FormLabel>ldlコレストロール チェックボタンにして片方 null</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ldlCholesterol:text})}
        value={this.StringOn(this.state.ldlCholesterol)}/>
        <FormLabel>総コレストロール チェックボタンにして片方 null</FormLabel>
        <FormInput onChangeText={(text) => this.setState({totalCholesterol:text})}
        value={this.StringOn(this.state.totalCholesterol)}/> */}

          <RecordLabelForm
            textLabel='中性脂肪'
            textRight='mg/dL'
            value={this.StringOn(this.state.neutralFat)}
            onChangeText={(text) => this.setState({ neutralFat: text })}
          />

          <Text style={[Theme.textBlack18Bold, { marginBottom: 5 }]}>血糖値</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <CustomCheckBox
              title='空腹時'
              checked={this.StringOn(this.state.bloodSugarLevelMeasureState) === 'hunger'}
              onPress={() => this.setState({ bloodSugarLevelMeasureState: 'hunger' })}
            />
            <CustomCheckBox
              title='食後'
              onPress={() => this.setState({ bloodSugarLevelMeasureState: 'other' })}
              checked={this.StringOn(this.state.bloodSugarLevelMeasureState) === 'other'}
            />
          </View>
          <RecordLabelForm
            textRight='mg/dL'
            value={this.StringOn(this.state.bloodSugarLevel)}
            onChangeText={(text) => this.setState({ bloodSugarLevel: text })}
          />
          {/* <FormLabel>血糖値</FormLabel>
        <FormInput onChangeText={(text) => this.setState({bloodSugarLevel:text})}
        value={this.StringOn(this.state.bloodSugarLevel)}/>
        <FormLabel>血糖値測定時　'hunger','other'</FormLabel> 
        <FormInput onChangeText={(text) => this.setState({bloodSugarLevelMeasureState:text})}
        value={this.StringOn(this.state.bloodSugarLevelMeasureState)}/> */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={[Theme.textBlack18Bold, { marginBottom: 5, marginRight: 15 }]}>HbA1c</Text>
            <Text style={[Theme.textLapalma18Bold, { marginBottom: 5 }]}>※任意入力</Text>
          </View>
          <RecordLabelForm
            textRight='%'
            value={this.StringOn(this.state.hba1c)}
            onChangeText={(text) => this.setState({ hba1c: text })}
            containerStyle={{marginBottom: 10}}
          />

          <SaveButton 
            onPress={() => this.saveMedicalCertificate()}
            buttonStyle={{ marginBottom: 30 }}
          />

          {(this.state.id) ? 
          <Text 
            onPress={() => this.deleteMedicalCertificate()}
            style={{ ...Theme.textVenetianRed22, paddingBottom: 30, textAlign: 'center'}}>削除する</Text>
          : null}
          
        </KeyboardAwareScrollView>
    );
  }
  StringOn(str) {
    return str !== undefined && str !== null && String(str) || ""
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITESMOKE,
    paddingHorizontal: 20,
  },
});
