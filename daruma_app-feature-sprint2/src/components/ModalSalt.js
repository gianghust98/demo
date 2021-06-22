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
import mutationLifelogSaltConcentration from '../api/mutationLifelogSaltConcentration';

const { width, height } = Dimensions.get('window');

export default class ModalSalt extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal:false,
      salt: '',
      integerNum: '',
      decimalNum: '',
      loading:false,
    }
  }
  openModal(inspectedAt, variables, saltConcentration){
    this.setState({
      visibleModal: true,
      inspectedAt,
      variables,
      integerNum:
        (saltConcentration &&
          saltConcentration.saltConcentration
            .toFixed(1)
            .toString()
            .split('.')[0]) ||
        '',
      decimalNum:
        (saltConcentration &&
          saltConcentration.saltConcentration
            .toFixed(1)
            .toString()
            .split('.')[1]) ||
        '',
      salt: (saltConcentration && saltConcentration.saltConcentration) || '',
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
            title='塩分摂取量'
            dismissModal={() => this.dismissModal()}/>

          <View style={styles.recordFormsWrapper}>
            <RecordForm
              textRight='g'
              keyboardType='number-pad'
              mode="saltConcent"
              value={`${this.state.salt}`}
              integerValue={`${this.state.integerNum}`}
              decimalValue={`${this.state.decimalNum}`}
              onChangeText={(salt) => this.setState({salt})}
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
      saltConcentration:
        !this.state.integerNum && !this.state.decimalNum
          ? null
          : parseFloat(
              this.state.integerNum + '.' + this.state.decimalNum,
            ).toFixed(1),
    }
    this.setState({loading:true})
    DarumaServer.graphq.client.mutate({
      mutation: mutationLifelogSaltConcentration,
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
