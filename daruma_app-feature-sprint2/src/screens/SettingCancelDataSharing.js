import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { graphql } from '@apollo/client/react/hoc';
import { Navigation } from 'react-native-navigation';

import GraphqlView from '../components/GraphqlView';

import DarumaServer from '../utils/DarumaServer';
import mutationSharingMedicalInstitutionRemove from '../api/mutationSharingMedicalInstitutionRemove';

// import { QuerySetting } from '../api/types';
import { Theme, Colors } from '../styles';

const { width, height } = Dimensions.get('window');

type Props = {
  // querySetting:QuerySetting
};

@graphql(mutationSharingMedicalInstitutionRemove, { name: 'mutationSharingMedicalInstitutionRemove'}) 
export default class SettingCancelDataSharing extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'データ共有の解除',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    };
  }

  showAlert(sharingMedicalInstitution) {
    Alert.alert(
      `本当に解除しますか？`,
      '',
      [
        {text: 'キャンセル'},
        {text: '解除', onPress: () => this.onRemoveSharing(sharingMedicalInstitution), style: 'destructive'},
      ],
      { cancelable: false },
    )
  }
  onRemoveSharing(next){
    GraphqlView.mutateLoadingView(
      this.props.mutationSharingMedicalInstitutionRemove({ variables: {medicalInstitutionUserId:next.id}})
    )
    .then(()=>{
      // console.log(this.props.componentId)
      Navigation.pop(this.props.componentId);
    })
  }

  constructor(props){
    super(props)
    this.state={
      statusEditModal:null
    }
  }

  render() {
    const {sharingMedicalInstitution}= this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={[Theme.textBlack18Bold, { marginBottom: 20 }]}>{sharingMedicalInstitution && sharingMedicalInstitution.setting.name}</Text>
          <Text style={Theme.textGray18}>「解除する」を押すと、共有先からデータの閲覧をすることができなくなります。</Text>
        </View>
        <Text style={styles.textCancel} onPress={() => this.showAlert(sharingMedicalInstitution)}>解除する</Text>
        {/* <GraphqlView query={querySetting}/> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITESMOKE,
  },
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  textCancel: {
    fontSize: 18,
    color: Colors.MANDY,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: width
  }
});
