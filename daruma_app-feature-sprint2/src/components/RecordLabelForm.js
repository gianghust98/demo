import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Theme, Colors} from '../styles';
import {fromPromise} from 'apollo-link';
//Datamodal
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {getServerMoment} from '../utils/moment';

export default class RecordLabelForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.props.textLabel ? (
          <Text style={[Theme.textBlack18Bold, {marginBottom: 5}]}>
            {this.props.textLabel}
          </Text>
        ) : null}
        {this.props.mode === 'time' ? (
          <View>
            <DatePicker
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              date={this.props.value}
              locale="ja"
              mode="date"
              maxDate={getServerMoment().format('YYYY-MM-DD')}
              format={'YYYY/MM/DD'}
              placeholder="未入力"
              confirmBtnText="決定"
              cancelBtnText="キャンセル"
              showIcon={false}
              style={{width: '100%', height: 60, justifyContent: 'center'}}
              customStyles={{
                dateInput: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: Colors.LIGHTGRAY,
                  height: 60,
                  backgroundColor: Colors.WHITE,
                },
                placeholderText: Theme.textGray20Bold,
                dateText: Theme.textBlack20Bold,
                btnTextConfirm: {
                  ...Theme.textDodgerBlue18Bold,
                },
                btnTextCancel: {
                  ...Theme.textDimGray18,
                },
              }}
              onDateChange={(value) => {
                this.props.onChangeText(value);
              }}
            />
            <Icon
              type="entypo"
              name="chevron-small-down"
              color={Colors.DARKGRAY}
              containerStyle={{position: 'absolute', right: 20, top: 17}}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <TextInput
              style={styles.form}
              placeholder={'未入力'}
              placeholderTextColor={Colors.DARKGRAY}
              value={`${this.props.value}`}
              keyboardType={
                this.props.keyboardType ? this.props.keyboardType : 'number-pad'
              }
              returnKeyType="done"
              onChangeText={(value) => this.props.onChangeText(value)}
            />
            <Text
              style={[
                Theme.textBlack18Bold,
                {marginLeft: 10, marginBottom: 5, alignSelf: 'flex-end'},
              ]}>
              {this.props.textRight}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

RecordLabelForm.propTypes = {
  mode: PropTypes.string,
  textLabel: PropTypes.string,
  textRight: PropTypes.string,
  value: PropTypes.any,
  onChangeText: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  keyboardType: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  form: {
    width: '48%',
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFF',
    borderColor: Colors.LIGHTGRAY,
    textAlign: 'center',
    ...Theme.textBlack20Bold,
  },
  formLeft: {
    width: '30%',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  formRight: {
    width: '30%',
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
  textBlack20Bold: {
    fontSize: 20,
    fontWeight: '500',
  },
});
