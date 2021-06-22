import React, {Component} from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import GraphqlView from './GraphqlView';
import PropTypes from 'prop-types';
import moment, {getServerMoment} from '../utils/moment';
import ModalHeader from './ModalHeader';
import RecordForm from './RecordForm';
import SaveButton from './SaveButton';
import {Theme, Colors} from '../styles';
import LoadingOverlay from '../screens/LoadingOverlay';

import DarumaServer from '../utils/DarumaServer';
import queryHomeLog from '../api/queryHomeLog';
import mutationAddBloodPressureLog from '../api/mutationAddLifelogBloodPressure';
import mutationEditBloodPressureLog from '../api/mutationEditLifelogBloodPressure';
import mutationDeleteBloodPressureLog from '../api/mutationDeleteLifelogBloodPressure';

const {width, height} = Dimensions.get('window');

export default class ModalBpPulse extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      id: null,
      maximum: '',
      minimum: '',
      pulse: '',
      inspectedAt: null,
      isDateTimePickerVisible: false,
      loading: false,
    };
  }
  openModal(date, variables, bloodPressureLog) {
    this.setState({
      visibleModal: true,
      variables,
      id: (bloodPressureLog && bloodPressureLog.id) || null,
      maximum: (bloodPressureLog && bloodPressureLog.maximum) || '',
      minimum: (bloodPressureLog && bloodPressureLog.minimum) || '',
      pulse: (bloodPressureLog && bloodPressureLog.pulse) || '',
      inspectedAt:
        (bloodPressureLog && moment(bloodPressureLog.inspectedAt)) ||
        getServerMoment()
          .year(date.year())
          .month(date.month())
          .date(date.date()),
    });
  }
  dismissModal() {
    this.setState({visibleModal: false});
  }
  onSaveButtonPress() {
    const params = {
      maximum: Number(this.state.maximum),
      minimum: Number(this.state.minimum),
      pulse: Number(this.state.pulse),
      inspectedAt: this.state.inspectedAt,
    };
    if (this.state.id) {
      params.id = this.state.id;
    }
    this.setState({loading: true});
    DarumaServer.graphq.client
      .mutate({
        mutation: this.state.id
          ? mutationEditBloodPressureLog
          : mutationAddBloodPressureLog,
        variables: params,
        refetchQueries: [
          {query: queryHomeLog, variables: this.state.variables},
        ],
      })
      .then((res) => {
        this.dismissModal();
        this.props.reload && this.props.reload();
      })
      .catch(GraphqlView.errorAlertView)
      .catch(() => {})
      .then((res) => {
        this.setState({loading: false});
      });
  }
  onDeleteButtonPress() {
    const params = {
      id: this.state.id,
    };

    this.setState({loading: true});
    DarumaServer.graphq.client
      .mutate({
        mutation: mutationDeleteBloodPressureLog,
        variables: params,
        refetchQueries: [
          {query: queryHomeLog, variables: this.state.variables},
        ],
      })
      .then((res) => {
        this.dismissModal();
        this.props.reload && this.props.reload();
      })
      .catch(GraphqlView.errorAlertView)
      .catch(() => {})
      .then((res) => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <Modal
        isVisible={this.state.visibleModal}
        onBackButtonPress={() => !this.state.loading && this.dismissModal()} // andorid
        onBackdropPress={() => !this.state.loading && this.dismissModal()}
        avoidKeyboard
        style={{margin: 0}}>
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <ModalHeader
              title="血圧と脈拍"
              dismissModal={() => this.dismissModal()}
            />

            <View style={styles.recordFormsWrapper}>
              <RecordForm
                mode="time"
                textLeft="時間"
                value={this.state.inspectedAt}
                onChangeText={(inspectedAt) => this.setState({inspectedAt})}
              />
              <RecordForm
                textLeft="最高"
                textRight="mmHg"
                value={this.state.maximum}
                onChangeText={(maximum) => this.setState({maximum})}
              />
              <RecordForm
                disableAutoFocus
                textLeft="最低"
                textRight="mmHg"
                value={this.state.minimum}
                onChangeText={(minimum) => this.setState({minimum})}
              />
              <RecordForm
                disableAutoFocus
                textLeft="脈拍"
                textRight="拍/分"
                value={this.state.pulse}
                onChangeText={(pulse) => this.setState({pulse})}
              />
            </View>
            <SaveButton
              buttonStyle={{marginTop: Platform.OS === 'ios' ? 20 : 15}}
              onPress={() => this.onSaveButtonPress()}
            />
            {this.state.id ? (
              <Text
                style={styles.text}
                onPress={() => this.onDeleteButtonPress()}>
                削除
              </Text>
            ) : null}
          </View>
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}>
              <LoadingOverlay isMutate={true} />
            </View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

ModalBpPulse.propTypes = {};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 460,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 20,
    margin: 15,
    marginTop: 75, // Xの上部よけ
  },
  container: {
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 20 : 15,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20,
    flex: 1,
  },
  recordFormsWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 5,
  },
  text: {
    ...Theme.textMandy20,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 25 : 20,
  },
});
