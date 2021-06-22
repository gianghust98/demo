import React, { Component } from 'react';
import { Alert, StyleSheet, SafeAreaView, View, Text, TextInput, Picker, Platform, TouchableOpacity, Dimensions, FlatList, BackHandler } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation';
import Modal from 'react-native-modal';
import { graphql } from '@apollo/client/react/hoc';
import SettingDataSharingManagement from './SettingDataSharingManagement';
import moment,{getServerMoment} from '../utils/moment';
import { Theme, Colors } from '../styles';
import CustomCheckBox from '../components/CustomCheckBox';
import GraphqlView from '../components/GraphqlView';
import StatusEdit from '../components/StatusEdit';
import DarumaServer from '../utils/DarumaServer';
import queryProfile from '../api/queryProfile';
import mutationProfile from '../api/mutationProfile';
import { QueryProfile, MutationProfile } from '../api/types';
import SaveButton from '../components/SaveButton';
import Icons from 'react-native-vector-icons/FontAwesome';

type Props = {
  queryProfile:QueryProfile
};

const { width, height } = Dimensions.get('window');

@graphql(queryProfile, { name: 'queryProfile'}) 
export default class Profile extends Component<Props> {

  static listdata = [
      {name:'喫煙',text:'喫煙はしていますか？', parameter:"smokingStatus",  selection:[{label:"今も吸っている",value:"yes"},{label:"吸ったことはない",value:"no"},{label:"以前は吸っていたが、現在は禁煙をしている",value:"past"},{label:"未回答",value:null}]},
      {name:'糖尿病',text:'これまで糖尿病と診断されたことはありますか？', parameter:"diabetesStatus", selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}], isSmallModal: true},
      {name:'脳血管疾患',text:'これまで脳出血や脳梗塞と診断されたことはありますか？', parameter:"cerebrovascularDiseasStatus", selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}], isSmallModal: true},
      {name:'心臓病変',text:'これまで心臓肥大や心臓の血管が狭笮あるいは詰まっていると言われたことはありますか？心臓カテーテル治療（ステント留置）や冠動脈バイパス術を受けたことがありますか？心不全と診断あるいは治療されたことはありますか？',parameter:"heartLesionStatus",  selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}]},
      {name:'腎臓病',text:'これまでに腎臓の機能が低下していると診断されたことがある、あるいは尿蛋白が出ていると言われたことがある、もしくは血液透析を施行されていますか？', parameter:"kidneySiseaseStatus", selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}]},
      {name:'血管病変',text:'これまで、首の血管が厚くなっている、あるいは大動脈瘤や大動脈解離と診断されたことがある、もしくは足の血管が狭くなっていると言われたことはありますか？', parameter:"vascularLesionStatus", selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}]},
      {name:'家族歴',text:'あなたのご家族に50歳未満で心臓病や血管の病気で亡くなった方はいますか？\n※ご家族(祖父母、両親、兄弟、子供、孫までの範囲)', parameter:"diseaseDeathRelativesStatus", selection:[{label:"あり",value:true},{label:"なし",value:false},{label:"未回答",value:null}]},
  ]

  constructor(props) {
    super(props)
    this.setterFunc = null

    Navigation.events().bindComponent(this);
    //TODO Warning　Mypageは出ない、なぜだろう？
    //Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        drawBehind: false,
        title: {
          component: {
            alignment: 'center',
            name: 'navigation.ProfileHeader',
            passProps: {
              fromHome:props.fromHome,
              leftPress: () => {
                Navigation.dismissModal(this.props.componentId);
              },
            }
          }
        }
      }
    });
    this.state = {
      gender: null,
      medicine: null,
      birthYear: null,
      postalCode: '',
      isVisible: false,
      forcedLoadingMode:false,
      statusEditModal:null,
      healthStatus:null,
    }
  }
  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', ()=>this.handleBackButtonClick());
  }
  
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', ()=>this.handleBackButtonClick());
  }
  
  handleBackButtonClick() {
    return this.props.fromHome
  }
 
  componentWillReceiveProps(nextProps){
    if(this.props.queryProfile.loading && !nextProps.queryProfile.loading && !nextProps.queryProfile.error){
      const updateState = {}
      updateState.gender =  nextProps.queryProfile.currentUser && nextProps.queryProfile.currentUser.setting.gender
      updateState.birthYear =  nextProps.queryProfile.currentUser && nextProps.queryProfile.currentUser.setting.birthYear
      updateState.postalCode =  nextProps.queryProfile.currentUser && nextProps.queryProfile.currentUser.setting.postalCode
      updateState.medicine =  nextProps.queryProfile.currentUser && nextProps.queryProfile.currentUser.setting.showStepDownMedicineState 
      updateState.healthStatus =  nextProps.queryProfile.currentUser && nextProps.queryProfile.currentUser.healthStatus
      this.setState(updateState)
    }
  }

  getBirthYearOption() {
    const today = getServerMoment();
    const currentYear = today.year()
    const birthYearOption = [];
    for (let i = 1900; i <= currentYear; i++) {
      birthYearOption.unshift({ label: `${i}年`, value: i }) 
    }
    return birthYearOption
  }
 
  dismissModal() {
    this.setState({
      isVisible: false,
      birthYear: null,
    })
  }

  onSelect() {
    if(!this.state.birthYear){
      this.setState({ birthYear: 1970 })
    }
    this.setState({ isVisible: false })
  }
  
  showBirthYearPickerModal() {
    let items = this.getBirthYearOption();
    // iOS
    if(Platform.OS === 'ios') {
      return (
        <Modal 
          style={{ margin: 0, justifyContent: "flex-end" }}
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={{ backgroundColor: '#FFF', height: 300 }}>
          <View style={styles.modalHeader}>
            <Text onPress={() => this.dismissModal()} style={styles.textModalHeaderLeft}>キャンセル</Text>
            <Text onPress={() => this.onSelect()} style={styles.textModalHeaderRight}>決定</Text>
          </View>
            <Picker
              selectedValue={this.state.birthYear || 1970}
              style={{ height: 50, flex: 1 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ birthYear: itemValue })}>
              {items.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
          </Picker>
          </View>
        </Modal>
      )
    } else {
      // android
      let initialValue
      if(this.state.birthYear) {
        initialValue = items.findIndex(e => e.value === this.state.birthYear)
      } else {
        initialValue = items.findIndex(e => e.value === 1970)
      }
      return (
        <Modal 
          style={{ justifyContent: "center" }}
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <FlatList
            style={{ flex:1 }}
            contentContainerStyle={{ backgroundColor: '#FFF', padding: 20 }}
            data={items}
            initialScrollIndex={initialValue}
            initialNumToRender={50}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            keyExtractor={(item, index) => item.label}
            renderItem={({item}) => 
              <TouchableOpacity 
                key={item.value}
                style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} 
                onPress={() => {
                  this.setState({ 
                    birthYear: item.value,
                    isVisible: false,
                  })
                }}>
                {this.state.birthYear === item.value?
                  <Icon
                    name='check'
                    color={Colors.LAPALMA}
                    containerStyle={{ marginRight: 10 }}
                  />
                  : 
                  <Icon
                    name='check'
                    color='transparent'
                    containerStyle={{ marginRight: 10 }}
                  />
                }
                <Text style={Theme.textBlack20Bold}>{item.value}</Text>
              </TouchableOpacity>
          }
        />
        </Modal>
      )
    }
    
  }

  checkFilled() {
    const isFilled = this.state.gender && this.state.birthYear && this.state.medicine !== null // && Object.values(this.state.healthStatus).findIndex(elm=>elm === null) < 0
    this.setterFunc && this.setterFunc(this.isFilled)
    return isFilled
  }
  saveProfile(moveShareCode){
    const params = {}
    if(!this.state.gender || !this.state.birthYear || this.state.medicine === null){ // || Object.values(this.state.healthStatus).findIndex(elm=>elm === null) >= 0
      Alert.alert(
        "未入力項目があります",
        "全ての項目を入力してください",
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      )
      return  
    }

    params.gender = this.state.gender
    params.birthYear = this.state.birthYear
    params.postalCode = this.state.postalCode
    params.showStepDownMedicineState = this.state.medicine

    params.smokingStatus = this.state.healthStatus.smokingStatus
    params.diabetesStatus = this.state.healthStatus.diabetesStatus
    params.cerebrovascularDiseasStatus = this.state.healthStatus.cerebrovascularDiseasStatus
    params.heartLesionStatus = this.state.healthStatus.heartLesionStatus
    params.kidneySiseaseStatus = this.state.healthStatus.kidneySiseaseStatus
    params.vascularLesionStatus = this.state.healthStatus.vascularLesionStatus
    params.diseaseDeathRelativesStatus = this.state.healthStatus.diseaseDeathRelativesStatus

    GraphqlView.mutateLoadingView(
      DarumaServer.graphq.client.mutate({
        mutation: mutationProfile,
        variables: params,
      })
    )
    .then(()=>{
      Navigation.dismissModal(this.props.componentId)
      .then(()=>{
        if(moveShareCode){
          Navigation.push(this.props.fromHome, {
            component: {
              name: 'navigation.SettingDataSharingManagement',
              options: SettingDataSharingManagement.options()
            }
          });
        }
      })
    })
  }

  openModal(item, select){
    this.setState({statusEditModal: {item, select}})
  }
  dismissModal() {
    this.setState({statusEditModal: null})
  }

  changeHealthStatuses(item, select){
    const healthStatus =  {...this.state.healthStatus }
    healthStatus[item.parameter] = select.value
    this.setState({healthStatus,statusEditModal: null})
  }

  render() {
    const isFilled = this.checkFilled();
    const healthStatus = this.state.healthStatus || {}
    return (
      <KeyboardAwareScrollView bounces={true}>

      <Modal 
        isVisible={this.state.statusEditModal!== null}
        onBackButtonPress={() => this.dismissModal()} // andorid
        onBackdropPress={() => this.dismissModal()}
        style={{ margin: 0, padding: 15 }} // loading中の画面を画面全体に被せる為margin0に指定
      >
        <StatusEdit
          editData = {this.state.statusEditModal}
          savePress ={(item, select)=>{this.changeHealthStatuses(item, select)}}
          dismissModal={() => this.dismissModal()}
        />
      </Modal>
        <SafeAreaView style={styles.safeAreaView}> 
          <View style={styles.container}>
            {this.showBirthYearPickerModal()}
            <View style={styles.column}>
            <Text style={styles.textLabel}>
                お答えいただいた情報が他のユーザーに公開されることはありませんが、医療機関とデータ共有を行った場合には共有されます。
              </Text>
              <Text style={styles.text}>
                ※お答えいただいた情報を元に「高血圧治療ガイドライン2019」に準拠したリスク評価を行い、血圧グラフ画面にて目標血圧を表示します。
              </Text>
            </View>

            <Text style={styles.textLabel}>性別</Text>
            <View style={styles.row}>
              <CustomCheckBox
                title='男性'
                checked={this.state.gender === "man"}
                onPress={() => this.setState({ gender: "man" })}
              />
              <CustomCheckBox
                title='女性'
                checked={this.state.gender === "woman"}
                onPress={() => this.setState({ gender: "woman" })}
              />
            </View>

            <Text style={styles.textLabel}>生まれた年</Text>
            <TouchableOpacity 
              onPress={() => this.setState({ isVisible: true })}
              style={styles.form}>
              {this.state.birthYear?
                <Text style={Theme.textBlack20Bold}>{`${this.state.birthYear}年`}</Text>
                :
                <Text style={Theme.textDarkGray20Bold}>未選択</Text>
              }
              <Icon
                onPress={() => this.setState({isVisible: true})}
                type='entypo' 
                name='chevron-small-down'
                color={Colors.DARKGRAY}
                containerStyle={{position: 'absolute', right: 5}}
              />
            </TouchableOpacity>

            <View style={{marginLeft:10,marginBottom:0, flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={{...styles.textLabel}}>郵便番号頭3桁　</Text><Text style={{...Theme.textBlack16}}>※任意</Text>
            </View>
            <TextInput
              style={styles.form}
              value={this.state.postalCode}
              placeholderTextColor={Colors.DARKGRAY}
              placeholder='未選択' 
              keyboardType='number-pad'
              returnKeyType='done'
              maxLength={3}
              onChangeText={(postalCode) => this.setState({postalCode})}
            />

            <Text style={styles.textLabel}>血圧を下げる薬</Text>
            <View style={styles.row}>
              <CustomCheckBox
                title='飲んでいる'
                checked={this.state.medicine}
                onPress={() => this.setState({ medicine: true })}
              />
              <CustomCheckBox
                title='飲んでいない'
                checked={!this.state.medicine}
                onPress={() => this.setState({ medicine: false })}
              />
            </View>
          </View>
          <View style={{marginLeft:10,marginBottom:0, flexDirection: 'row'}}>
            <Text style={{...styles.textLabel}}>病歴などに関する質問　</Text><Text style={{...Theme.textBlack16}}>※任意</Text>
          </View>
            {
              Profile.listdata.map(item=>{
                const select = healthStatus && healthStatus[item.parameter] !== undefined && item.selection.find(elm=>elm.value === healthStatus[item.parameter])
                return (
                  <ListItem
                    key={item.name}
                    containerStyle={{ backgroundColor: '#FFF', paddingTop: 20, paddingBottom: 20, borderTopColor: Colors.LIGHTGRAY, borderBottomColor: Colors.LIGHTGRAY }}
                    onPress={()=>{this.openModal(item, select)}}
                    title={item.name}
                    titleStyle={Theme.textBlack20Bold}
                    rightTitle={select && select.label || "未回答"}
                    rightTitleStyle={select? Theme.textBlack20: Theme.textDarkGray20}
                  />)
              })
            }
            
            
            {
              !this.props.fromHome ? (
                <View style={styles.container}>
                  <SaveButton 
                    disabled = {!isFilled}
                    onPress={() => this.saveProfile(false)}
                  />
                </View>
              ):(
                <View style={styles.container}>
                  <SaveButton 
                    disabled = {!isFilled}
                    buttonStyle={{marginBottom:30}} 
                    onPress={() => this.saveProfile(false)}
                  />
                  <SaveButton
                    disabled = {!isFilled}
                    title="保存して共有コードを表示"
                    buttonStyle={{backgroundColor: '#35A2AE',}} 
                    onPress={() => this.saveProfile(true)}
                  />
                </View>
              )
            }
          </SafeAreaView>

        <GraphqlView query={this.props.queryProfile} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    height: height * 0.8,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: '48%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFF',
    borderColor: Colors.LIGHTGRAY,
    marginBottom: 30,
    ...Theme.textBlack20Bold,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  column: {
    flexDirection: 'column',
    marginBottom: 30
  },
  textLabel: {
    ...Theme.textBlack18Bold,
    marginBottom: 10,
  },
  text: {
    ...Theme.textBlack12,
    marginBottom: 10,
  },
  textFormContent: {
    fontSize: 20
  },
  //誕生年Pickerのヘッダー
  modalHeader: {
    backgroundColor: Colors.WHITE,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.LIGHTGRAY
  },
  textModalHeaderLeft: {
    ...Theme.textDimGray18
  },
  textModalHeaderRight: {
    ...Theme.textDodgerBlue18Bold,
    position: 'absolute',
    right: 10,
  }
});
