import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Image, Linking, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements'
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import moment from '../utils/moment'
import ModalHeader from './ModalHeader';
import GraphqlView from './GraphqlView';
import LoadingOverlay from '../screens/LoadingOverlay';


import DarumaServer from '../utils/DarumaServer';
import mutationSyncFitbit from '../api/mutationSyncFitbit';
import queryHomeLog from '../api/queryHomeLog';
import { Theme, Colors } from '../styles';
import { scale } from '../utils/Scaling';
import Images from '../../res/img';

const { width, height } = Dimensions.get('window');

export default class ModalFitbitSync extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      id: null,
      date: null,
      loading:false
    }
  }
  openModal(date, variables){
    this.setState({
      visibleModal:true,
      variables,
      date
    })
  }
  dismissModal(){
    this.setState({visibleModal:false})
  }
  onOpenFitbitButton() {
    Linking.openURL("fitbit://")
    .catch(()=>Linking.openURL(Platform.OS==="android" ?
      "https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile" :
      "https://itunes.apple.com/jp/app/fitbit/id462638897"))
  }
  onSyncFitbitButton(){
    const params = {
      syncData : this.state.date,
    }
    this.setState({loading:true})
    
    DarumaServer.graphq.client.mutate({
      mutation: mutationSyncFitbit,
      variables: params,
      // refetchQueries:[{query:queryHomeLog, variables:this.state.variables}],
    })
    .then((res)=>{
      this.setState({loading:false})
      return this.props.loadQueryHomeLog()
    })
    .catch(GraphqlView.errorAlertView).catch(()=>{
      return DarumaServer.graphq.client.query({
        query:queryHomeLog,
        variables: this.state.variables,
      })
      .catch(()=>{
      })
      .then(()=>{
        this.dismissModal()
        this.setState({loading:false})
      })
    })
    // )
  }

  render() {
    return (
      <Modal 
        isVisible={this.state.visibleModal} 
        onBackButtonPress={() => !this.state.loading && this.dismissModal()} // andorid
        onBackdropPress={() => !this.state.loading && this.dismissModal()}
        style={{ margin: 0 }}
      >
        <View style={styles.modalContainer}>
          <ModalHeader 
            title='歩数/睡眠の更新'
            dismissModal={() => this.dismissModal()}/>
          <View style={styles.content}>
            <Text allowFontScaling={false} style={styles.text1}>Fitbit®️アプリから情報を取得</Text>
            <Text allowFontScaling={false} style={styles.text2}>※この日から過去1週間分の情報を取得します</Text>
            <Image source={Images.img_fitbit_to_daruma} style={styles.img}/>
            <TouchableOpacity onPress={() => this.onSyncFitbitButton()}>
              <Text allowFontScaling={false} style={styles.textBtn}>情報を更新する</Text>
            </TouchableOpacity>
            {this.props.lastSync?<Text allowFontScaling={false} style={styles.text2}> {`最終更新日:${moment(this.props.lastSync).format("YYYY/MM/DD HH:mm:ss")}`}</Text>:null}
            <Divider style={{ backgroundColor: Colors.LIGHTGRAY, marginVertical: 10, width: scale(250) }} />
            <Text allowFontScaling={false} style={styles.text3}>ウェアラブル端末とFitbit®️アプリを{'\n'}こまめに同期して最新の状態にしましょう。</Text>
            <TouchableOpacity onPress={() => this.onOpenFitbitButton()}>
              <Text allowFontScaling={false} style={styles.textBtn}>Fitbit®️アプリを起動する</Text>
            </TouchableOpacity>
          </View>
          {/* {this.state.loading ?<View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}><LoadingOverlay isMutate={true} /></View>:null} */}
        </View>
        {this.state.loading ?<View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}><LoadingOverlay isMutate={true} /></View>:null}
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 500,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    margin: 15,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center'
  },
  img: {
    marginVertical: 10,
    height: 70,
    resizeMode: 'contain'
  },
  textBtn: {
    ...Theme.textBlack18Bold,
    textAlign: 'center',
    paddingVertical: width <= 320 ? 10: 15,
    borderColor: Colors.LAPALMA,
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    width: scale(210),
  },
  text1: {
    ...Theme.textBlack20Bold,
    marginBottom: 5,
    textAlign: 'center'
  },
  text2: {
    ...Theme.textBlack18,
    textAlign: 'center'
  },
  text3: {
    ...Theme.textBlack18Bold,
    textAlign: 'center',
  }
});
