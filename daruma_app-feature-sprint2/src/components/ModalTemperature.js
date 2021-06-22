import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View } from 'react-native';
import GraphqlView from './GraphqlView';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ModalHeader from './ModalHeader';
import RecordForm from './RecordForm';
import SaveButton from './SaveButton';
import LoadingOverlay from '../screens/LoadingOverlay';

import DarumaServer from '../utils/DarumaServer';
import mutationLifelogBodyTemperature from '../api/mutationLifelogBodyTemperature';

const { width, height } = Dimensions.get('window');

export default class ModalSalt extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal:false,
      lifelogBodyTemperature: '',
      integerNum: '',
      decimalNum: '',
      loading:false,
    }
  }
  openModal(inspectedAt, variables, lifelogBodyTemperature){
    this.setState({
      visibleModal: true,
      inspectedAt,
      variables,
      integerNum:
        (lifelogBodyTemperature &&
          lifelogBodyTemperature.bodyTemperature
            .toFixed(1)
            .toString()
            .split('.')[0]) ||
        '',
      decimalNum:
        (lifelogBodyTemperature &&
          lifelogBodyTemperature.bodyTemperature
            .toFixed(1)
            .toString()
            .split('.')[1]) ||
        '',
      bodyTemperature:
        (lifelogBodyTemperature && lifelogBodyTemperature.bodyTemperature) ||
        '',
    });
  }
  dismissModal(){
    this.setState({visibleModal:false})
  }
  render() {
    return (
      <Modal 
        isVisible={this.state.visibleModal} 
        onBackButtonPress={() =>!this.state.loading && this.dismissModal()} // andorid
        onBackdropPress={() =>!this.state.loading && this.dismissModal()}
        avoidKeyboard
        style={{margin: 0}}>
        <View style={styles.modalContainer}>
          <ModalHeader 
            title='体温'
            dismissModal={() => this.dismissModal()}/>
          <View style={styles.recordFormsWrapper}>
            <RecordForm
              textRight='℃'
              keyboardType='number-pad'
              mode="temp"
              value={`${this.state.bodyTemperature}`}
              integerValue={`${this.state.integerNum}`}
              decimalValue={`${this.state.decimalNum}`}
              onChangeText={(bodyTemperature) =>
                this.setState({bodyTemperature})
              }
              onChangeInteger={(value) =>
                this.setState({
                  integerNum: value.replace(/[^0-9]/g, ''),
                })
              }
              onChangeDecimal={(value) =>
                this.setState({decimalNum: value.replace(/[^0-9]/g, '')})
              }
            />
          </View>

          <SaveButton onPress={() => this.onSaveButtonPress()} />
        </View>
        {this.state.loading ?<View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}><LoadingOverlay isMutate={true} /></View>:null}
      </Modal>
    )
  }
  onSaveButtonPress() {
    const params = {
      inspectedAt: this.state.inspectedAt,
      bodyTemperature:
        !this.state.integerNum && !this.state.decimalNum
          ? parseFloat('0.0')
          : parseFloat(
              this.state.integerNum + '.' + this.state.decimalNum,
            ).toFixed(1),
    }
    this.setState({loading:true})
    DarumaServer.graphq.client.mutate({
      mutation: mutationLifelogBodyTemperature,
      variables: params,
    })
    .then((res)=>{
      this.dismissModal()
      this.props.reload && this.props.reload()
    })
    .catch(GraphqlView.errorAlertView).catch(()=>{})
    .then((res)=>{
      this.setState({loading:false})
      })
  }
}

ModalSalt.propTypes = {
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    margin: 15,
  },
  recordFormsWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
