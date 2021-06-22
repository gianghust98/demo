import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { graphql } from '@apollo/client/react/hoc';
import GraphqlView from './GraphqlView';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import RecordForm from './RecordForm';
import SaveButton from './SaveButton';
import LoadingOverlay from '../screens/LoadingOverlay';

import DarumaServer from '../utils/DarumaServer';
import queryHomeLog from '../api/queryHomeLog';
import mutationLifelogBodyWeight from '../api/mutationLifelogBodyWeight';

const { width, height } = Dimensions.get('window');


export default class ModalWeight extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal:false,
      weight: '',
      loading:false,
      decimalNum: '',
      loading:false,
    }
  }

  openModal(inspectedAt, variables, lifelog){
    this.setState({
      visibleModal: true,
      inspectedAt,
      variables,
      integerNum:
        (lifelog && lifelog.bodyWeight.toFixed(1).toString().split('.')[0]) ||
        '',
      decimalNum:
        (lifelog && lifelog.bodyWeight.toFixed(1).toString().split('.')[1]) ||
        '',
      weight: (lifelog && lifelog.bodyWeight) || '',
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
        style={{margin: 0}}
      >
        <View style={styles.modalContainer}>
          <ModalHeader 
            title='体重'
            dismissModal={() => this.dismissModal()}/>
          <View style={styles.recordFormsWrapper}>
            <RecordForm
              textRight='kg'
              keyboardType='number-pad'
              mode='weight'
              value={`${this.state.weight}`}
              integerValue={`${this.state.integerNum}`}
              decimalValue={`${this.state.decimalNum}`}
              onChangeText={(weight) => this.setState({weight})}
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
      inspectedAt:this.state.inspectedAt,
      bodyWeight:
        !this.state.integerNum && !this.state.decimalNum
          ? null
          : parseFloat(
              this.state.integerNum + '.' + this.state.decimalNum,
            ).toFixed(1),
    }
    this.setState({loading:true})
    DarumaServer.graphq.client.mutate({
      mutation: mutationLifelogBodyWeight,
      variables: params,
    })
    .then((res)=>{
      this.dismissModal()
      this.props.reload && this.props.reload()
    })
    .catch(GraphqlView.errorAlertView).catch(()=>{})
    .then(()=>{
      this.setState({loading:false})
      })
  }
}

ModalWeight.propTypes = {
  // dismissModal: PropTypes.func.isRequired,
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
