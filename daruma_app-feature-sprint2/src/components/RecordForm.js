import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Theme, Colors} from '../styles';
import {fromPromise} from 'apollo-link';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {scale} from '../utils/Scaling';

const {width, height} = Dimensions.get('window');
export default class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
    };
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.formLeft]}>
          <Text style={[Theme.textBlack18Bold]}>{this.props.textLeft}</Text>
        </View>
        {this.props.mode === 'time' ? (
          <Text
            style={styles.form}
            onPress={() => {
              if (this.props.disable) {
                return;
              }
              this.setState({
                mode: 'time',
                isDatePickerVisible: true,
              });
            }}>
            {this.props.value.format('HH:mm')}
          </Text>
        ) : this.props.mode === 'weight' ||
          this.props.mode === 'saltConcent' ||
          this.props.mode === 'temp' ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.form}
              value={`${this.props.integerValue}`}
              autoFocus={this.props.disableAutoFocus ? false : true}
              keyboardType={
                this.props.keyboardType ? this.props.keyboardType : 'number-pad'
              }
              returnKeyType="done"
              onChangeText={(value) => this.props.onChangeInteger(value)}
            />
            <Text style={{fontSize: 50, fontWeight: "600"}}>.</Text>
            <TextInput
              style={[styles.form, {width: 50}]}
              placeholderTextColor={Colors.DARKGRAY}
              value={`${this.props.decimalValue}`}
              keyboardType={
                this.props.keyboardType ? this.props.keyboardType : 'number-pad'
              }
              returnKeyType="done"
              onChangeText={(value) => this.props.onChangeDecimal(value)}
            />
          </View>
        ) : (
          <TextInput
            style={styles.form}
            autoFocus={this.props.disableAutoFocus ? false : true}
            placeholder={'未入力'}
            placeholderTextColor={Colors.DARKGRAY}
            value={`${this.props.value}`}
            keyboardType={
              this.props.keyboardType ? this.props.keyboardType : 'number-pad'
            }
            returnKeyType="done"
            onChangeText={(value) => this.props.onChangeText(value)}
          />
        )}

        <View style={[styles.formRight]}>
          <Text style={[Theme.textBlack18Bold]}>{this.props.textRight}</Text>
        </View>

        {this.props.mode === 'time' ? (
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            mode={'time'}
            androidMode="spinner"
            date={(this.props.value && this.props.value.toDate()) || new Date()}
            locale="ja_JP"
            headerTextIOS="日時の変更"
            confirmTextIOS="設定"
            onConfirm={async (date) => {
              const nDate =
                this.state.mode === 'time'
                  ? this.props.value
                      .clone()
                      .set('hour', moment(date).get('hour'))
                      .set('minute', moment(date).get('minute'))
                  : this.props.value
                      .clone()
                      .set('year', moment(date).get('year'))
                      .set('month', moment(date).get('month'))
                      .set('date', moment(date).get('date'));
              await this.setState({isDatePickerVisible: false});
              await this.props.onChangeText(nDate);
            }}
            onCancel={() => this.setState({isDatePickerVisible: false})}
          />
        ) : null}
      </View>
    );
  }
}
RecordForm.propTypes = {
  mode: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  value: PropTypes.any,
  integerValue: PropTypes.any,
  decimalValue: PropTypes.any,
  onChangeText: PropTypes.func.isRequired,
  onChangeInteger: PropTypes.func,
  onChangeDecimal: PropTypes.func,
  keyboardType: PropTypes.string,
  disableAutoFocus: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: 'gray'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 55,
  },
  form: {
    width: 100,
    height: 55,
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFF',
    borderColor: Colors.LIGHTGRAY,
    ...Theme.textBlack22Bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formLeft: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
    flex: 1,
  },
  formRight: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center'
  },
});
