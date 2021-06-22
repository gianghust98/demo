/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react'
import { AppState, Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Plattform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'

import DarumaServer from '../utils/DarumaServer'
import moment, { setServerTime, getServerMoment } from '../utils/moment'
import Images from '../../res/img'
import MedalBar from '../components/MedalBar'
import DarumaMessage from '../components/DarumaMessage'
import WeeklyStamp from '../components/WeeklyStamp'
import RecordTile from '../components/RecordTile'
import RecordLongTile from '../components/RecordLongTile'
import RecordWeightTile from '../components/RecordWeightTile'
import ModalSalt from '../components/ModalSalt'
import ModalTemperature from '../components/ModalTemperature'
import ModalWeight from '../components/ModalWeight'
import ModalBpPulse from '../components/ModalBpPulse'
import ModalHelp from '../components/ModalHelp'
import ModalMedalHelp from '../components/ModalMedalHelp'
import ModalFitbitSync from '../components/ModalFitbitSync'
import ModalOmronSync from '../components/ModalOmronSync'
import GraphqlView from '../components/GraphqlView'
import Info from './Info'
import MyPage from './MyPage'
import { Theme, Colors } from '../styles'
import { scale } from '../utils/Scaling'
import Messaging from '../utils/Firebase'
import { showModalMyPage } from './navigation'

import SettingWearableDevice from './SettingWearableDevice'
import LogBloodPressure from './LogBloodPressure'
import LogBodyWeight from './LogBodyWeight'
import LogBodyTemperature from './LogBodyTemperature'
import LogStepCount from './LogStepCount'
import LogSleepTime from './LogSleepTime'
import LogSaltConcentration from './LogSaltConcentration'
import queryHome from '../api/queryHome'
import queryHomeLog from '../api/queryHomeLog'
import mutationLifelogMedicineState from '../api/mutationLifelogMedicineState'
// import mutationLifelogSaltConcentration from '../api/mutationLifelogSaltConcentration'
import mutationFirebaseToken from '../api/mutationFirebaseToken'
import mutationSyncOmron from '../api/mutationSyncOmron'
import mutationSyncFitbit from '../api/mutationSyncFitbit'
// import mutationOmronUnlink from '../api/mutationOmronUnlink'
import { QueryHome, QueryHomeLog, MutationLifelogMedicineState, MutationFirebaseToken } from '../api/types'

const { width, height } = Dimensions.get('window')

type Props = {
  queryHome:QueryHome,
  queryHomeLog:QueryHomeLog,
  mutationLifelogMedicineState:MutationLifelogMedicineState,
  mutationFirebaseToken: MutationFirebaseToken
};
let startToday = getServerMoment()
const loadDay = startToday.clone().startOf('days')

@graphql(mutationFirebaseToken, { name: 'mutationFirebaseToken' })
@graphql(mutationLifelogMedicineState, { name: 'mutationLifelogMedicineState' })
@graphql(queryHome, { name: 'queryHome' })
export default class Home extends Component<Props> {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this) // <== Will be automatically unregistered when unmounted
    this.state = {
      visibleModal: null,
      date: loadDay,
      dayMove: false,
      queryHomeLog: {},
      appState: AppState.currentState,
    }
    this.modalTemperature = null
    this.modalSalt = null
    this.modalWeight = null
    this.modalBpPulse = null
    this.modalHelp = null
    this.modalFitbitSync = null
    this.modalOmronSync = null
    this.modalMedalHelp = null
    this.headersetStateFunc = null
    this.showTop = false
    this.recordLongTile = null
    this.messagingInitFlag = false
    this.loadQueryHomeLogIntervalTimer = null
    this.messaging = new Messaging()
    this.messaging.setOpenInfoFunc((data) => {
      Navigation.dismissAllModals()
      Navigation.popToRoot(this.props.componentId)
      Navigation.push(this.props.componentId, {
        component: {
          name: 'navigation.Info',
          options: Info.options(),
        },
      })
    })
    this.componentDidAppearTimer = null
    this.openSyncMutation = false


    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        drawBehind: false,
        title: {
          component: {
            alignment: 'center',
            name: 'navigation.HomeHeader',
            passProps: {
              setHeaderStateFunc: setState => this.setHeaderStateFunc(setState),
              leftPress: () => {
                if (Platform.OS === "android"){
                  showModalMyPage()
                } else{
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'navigation.MyPage',
                      // options:MyPage.options()
                    },
                  })
                }
              },
              goToShareCodeScreen: () => {
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'navigation.SettingDataSharingManagement'
                  }
                })
              },
              rightPress: () => {
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'navigation.Info',
                    options: Info.options(),
                  },
                })
              },
            },
          },
        },
      },
    })
    setTimeout(() => this.messagingInit(), 5000)
  }
  
  async messagingInit() {
    if (this.messagingInitFlag) return
    this.messagingInitFlag = true
    const firebaseToken = await this.messaging.onMessageInit()
    const params = { firebaseToken }
    // GraphqlView.mutateLoadingView(
    this.props.mutationFirebaseToken({
      variables: params,
    })
    // )
  }

  componentDidMount() {
    this.messaging.messagingDidMount()
  }

  componentWillUnmount() {
    this.messaging.messagingWillUnmount()
    clearTimeout(this.componentDidAppearTimer)
    clearTimeout(this.loadQueryHomeLogIntervalTimer)
    this.componentDidAppearTimer = this.loadQueryHomeLogIntervalTimer = null
  }

  async loadQueryHomeLog(variables) {
    this.setState({ dayMove: true })
    clearTimeout(this.loadQueryHomeLogIntervalTimer)

    await this.loadQueryHomeLogInterval(variables, true)
    // this.loadQueryHomeLogIntervalTimer = setInterval(()=>this.loadQueryHomeLogInterval(variables),5000)
  }
  loadQueryHomeLogInterval(variables, dayMove) {
    return DarumaServer.graphq.client.query({
      query: queryHomeLog,
      variables,
    })
      .then((res) => {
      // console.log("loadQueryHomeLogInterval",res,variables)
        if (this.state.dayMove === dayMove) {
          this.setState({ queryHomeLog: res.data, dayMove: false })
          this.loadQueryHomeLogIntervalTimer = setTimeout(() => this.loadQueryHomeLogInterval(variables, false), 5000)

          if (!this.openSyncMutation) {
            this.openSyncMutation = true
            const params = { syncData: this.state.date }
            const queryHomeLog = res.data
            // const omronAvailable = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.omronLink.available || false
            const fitbitLinked = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.fitbitLink.linked || false
            const omronLinked = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.omronLink.linked || false
            if (fitbitLinked || omronLinked) {
              Promise.all([
                fitbitLinked && DarumaServer.graphq.client.mutate({ mutation: mutationSyncFitbit, variables: params }) || true,
                omronLinked && DarumaServer.graphq.client.mutate({ mutation: mutationSyncOmron, variables: params }) || true,
              ]).then(async () => {
                clearTimeout(this.loadQueryHomeLogIntervalTimer)
                await this.loadQueryHomeLogInterval(variables, false)
              })
            }
            // if (!omronAvailable && omronLinked) {
            //   DarumaServer.graphq.client.mutate({ mutation: mutationOmronUnlink }).then().catch(error => { console.error(error) })
            // }
          }
        }
      })
      .catch((error) => {
      // console.log("queryHomeLogError",error)
        this.setState({ queryHomeLog: null, dayMove: false })
        clearTimeout(this.loadQueryHomeLogIntervalTimer)
        this.loadQueryHomeLogIntervalTimer = setTimeout(() => this.loadQueryHomeLogInterval(variables), 5000)
      })
  }

  componentDidAppear() {
    this.componentDidAppearTimer = setTimeout(() => {
      if (!this.props.queryHome.loading) {
        this.props.queryHome.refetch()
      }
      this.showTop = true

      AppState.addEventListener('change', this._handleAppStateChange)
      this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))
    }, 250)
  }
  componentDidDisappear() {
    clearTimeout(this.componentDidAppearTimer)
    clearTimeout(this.loadQueryHomeLogIntervalTimer)
    this.componentDidAppearTimer = this.loadQueryHomeLogIntervalTimer = null
    this.showTop = false
    AppState.removeEventListener('change', this._handleAppStateChange)
    // this.props.queryHomeLog.stopPolling()
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('App has come to the ', nextAppState)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))
    }
    this.setState({ appState: nextAppState })
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.queryHome.loading && !nextProps.queryHome.loading) {
      if (!nextProps.queryHome.error) {
        const { queryHome } = nextProps

        setServerTime(moment(queryHome.now))
        startToday = getServerMoment()
        if (getServerMoment().diff(this.state.date, 'days', true) <= 1) {
          const newDate = getServerMoment().startOf('day')
          this.setState({ date: newDate })
          this.changeDateLoad(newDate)
        }
        this.headersetStateFunc && this.headersetStateFunc({
          unreadInformationCount: queryHome.unreadInformationCount,
        })
        if (!queryHome.currentUser.setting.gender && this.showTop) {
          Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'navigation.Profile',
                  passProps: { fromHome: this.props.componentId },
                  options: { modalPresentationStyle:"overFullScreen" }
                },
              }],
            },
          })
        }
      } else if (!this.props.queryHome.error) {
        setTimeout(
          () =>
            GraphqlView.errorAlertView(nextProps.queryHome.error)
          , 500,
        )
      }
    }
  }

  onSaveDrinkStepDownMedicineState(drinkStepDownMedicineState) {
    const params = {
      inspectedAt: this.state.date,
      drinkStepDownMedicineState,
    }
    GraphqlView.mutateLoadingView(this.props.mutationLifelogMedicineState({
      variables: params,
    })
      .then(() => this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))))
  }
  setHeaderStateFunc(setState) {
    this.headersetStateFunc = setState
  }

  changeDate(changeMode, date) {
    let newDate
    if (changeMode === 'prev') {
      newDate = date.clone().subtract(1, 'days').startOf('days')
    } else if (changeMode === 'next') {
      newDate = date.clone().add(1, 'days').startOf('days')
    }
    // this.props.queryHomeLog.stopPolling()
    this.changeDateLoad(newDate)
    this.recordLongTile.handleRecordNum(false)
    this.setState({ date: newDate })
  }
  changeDateLoad(newDate) {
    this.setState({ dayMove: true })
    this.loadQueryHomeLog(this.loadQueryHomeLogVariables(newDate))
    // this.setState({dayMove:true})
    // return this.props.queryHomeLog.refetch({year: newDate.year(), month: newDate.month()+1,day: newDate.date()})
    // .then(()=>{
    //   this.setState({dayMove:false})
    //   this.forceUpdate()

    // })
  }
  loadQueryHomeLogVariables(newDate) {
    return { year: newDate.year(), month: newDate.month() + 1, day: newDate.date() }
  }

  formatDate(date) {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    const formattedDate = `${date.format('M/D')}(${weekdays[date.days()]})`
    return formattedDate
  }

  renderChangeDateBar(date) {
    return (
      <View style={styles.changeDateBar}>
        <TouchableOpacity onPress={() => this.changeDate('prev', date)} style={styles.btnArrow}>
          <Image style={styles.btnArrow} source={Images.btn_left} />
        </TouchableOpacity>
        <Text style={styles.textDate}>{this.formatDate(date)}</Text>
        {getServerMoment().diff(date, 'days', true) <= 1 ?
          <View style={styles.btnArrow} /> :
          <TouchableOpacity onPress={() => this.changeDate('next', date)} style={styles.btnArrow}>
            <Image style={styles.btnArrow} source={Images.btn_right} />
          </TouchableOpacity>
        }
      </View>
    )
  }

  goToSettingWearableDevice() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.SettingWearableDevice',
        options: SettingWearableDevice.options(),
      },
    })
  }

  render() {
    const { queryHome } = this.props
    const { queryHomeLog } = this.state
    const fitbitLinked = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.fitbitLink.linked || false
    const omronLinked = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.omronLink.linked || false
    // const omronAvailable = queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.omronLink.available || false
    const lifelogStepCount = queryHomeLog && queryHomeLog.lifelogStepCount
    const lifelogSleep = queryHomeLog && queryHomeLog.lifelogSleep
    const lifelogMedicineState = queryHomeLog && queryHomeLog.lifelogMedicineState
    const lifelogBodyWeight = queryHomeLog && queryHomeLog.lifelogBodyWeight
    const lifelogBodyTemperature = queryHomeLog && queryHomeLog.lifelogBodyTemperature
    const lifelogSaltConcentration = queryHomeLog && queryHomeLog.lifelogSaltConcentration

    const stampInfo = queryHomeLog && queryHomeLog.stampInfo || null

    // console.log("queryHome", queryHomeLog && queryHome.currentUser)
    // console.log("queryHomeLog", queryHomeLog)
    const showData = []

    if (queryHome.currentUser && queryHome.currentUser.setting.showStepDownMedicineState) {
      showData.push(<RecordTile
        title="血圧を下げる薬"
        titleStyle={{
          ...Platform.select({
            ios: {
              ...Theme.textLapalma20Bold,
            },
            android: {
              ...Theme.textLapalma18Bold,
            },
          }),
        }}
        onPress={() => this.onSaveDrinkStepDownMedicineState(!(lifelogMedicineState && lifelogMedicineState.drinkStepDownMedicineState))}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: 30, width: 30, marginRight: 10 }} source={lifelogMedicineState && lifelogMedicineState.drinkStepDownMedicineState ? Images.ic_check_able : Images.ic_check_none} />
          <Text style={lifelogMedicineState && lifelogMedicineState.drinkStepDownMedicineState ? Theme.textBlack22Bold : Theme.textDarkGray22Bold}>飲んだ</Text>
        </View>
      </RecordTile>)
    }


    if (queryHome.currentUser && queryHome.currentUser.setting.showSaltConcentration) {
      showData.push(<RecordTile
        onPressLink={() =>
        Navigation.push(this.props.componentId, {
          component: {
            name: 'navigation.LogSaltConcentration',
            options: LogSaltConcentration.options(),
          },
        })}
        onPress={() => this.modalSalt.openModal(this.state.date, queryHomeLog.variables, lifelogSaltConcentration)}
        title="塩分摂取量">
        {lifelogSaltConcentration && lifelogSaltConcentration.saltConcentration ?
          <Text style={Theme.textBlack22Bold}>{`${lifelogSaltConcentration.saltConcentration}g`}</Text>
            : <Text style={Theme.textDarkGray22Bold}>入力する</Text>
          }
      </RecordTile>)
    }

    if (queryHome.currentUser && queryHome.currentUser.setting.showBodyTemperature) {
      showData.push(<RecordTile
        onPressLink={() =>
        Navigation.push(this.props.componentId, {
          component: {
            name: 'navigation.LogBodyTemperature',
            options: LogBodyTemperature.options(),
          },
        })}
        onPress={() => this.modalTemperature.openModal(this.state.date, queryHomeLog.variables, lifelogBodyTemperature)}
        title="体温">
        {lifelogBodyTemperature && lifelogBodyTemperature.bodyTemperature ?
          <Text style={Theme.textBlack22Bold}>{`${lifelogBodyTemperature.bodyTemperature}℃`}</Text>
            : <Text style={Theme.textDarkGray22Bold}>入力する</Text>
          }
      </RecordTile>)
    }
    const SPACER_SIZE = 1000
    const TOP_COLOR = Colors.GOLDENYELLOW
    const BOTTOM_COLOR = Colors.LAPALMA
    const isIos = Platform.OS === 'ios'

    return (
      <View style={styles.container}>
        <ScrollView
          style={{ backgroundColor: isIos ? BOTTOM_COLOR : TOP_COLOR }}
          contentContainerStyle={{ backgroundColor: TOP_COLOR }}
          contentInset={{ top: -SPACER_SIZE }}
          contentOffset={{ y: SPACER_SIZE }}
          bounces >

          {isIos && <View style={{ height: SPACER_SIZE }} />}

          <ModalHelp
            ref={(ref => this.modalHelp = ref)} />
          <ModalBpPulse
            ref={(ref => this.modalBpPulse = ref)}
            reload={() => this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />
          <ModalWeight
            ref={(ref => this.modalWeight = ref)}
            reload={() => this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />
          <ModalTemperature
              ref={(ref => this.modalTemperature = ref)}
              reload={() => this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />
          <ModalSalt
            ref={(ref => this.modalSalt = ref)}
            reload={() => this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />
          <ModalMedalHelp
            ref={(ref => this.modalMedalHelp = ref)} />
          <ModalFitbitSync
            ref={(ref => this.modalFitbitSync = ref)}
            lastSync={queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.fitbitLink.lastSync || null}
            loadQueryHomeLog={async () => await this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />
          <ModalOmronSync
            ref={(ref => this.modalOmronSync = ref)}
            lastSync={queryHomeLog && queryHomeLog.currentUser && queryHomeLog.currentUser.omronLink.lastSync || null}
            loadQueryHomeLog={async () => await this.loadQueryHomeLog(this.loadQueryHomeLogVariables(this.state.date))} />

          <View style={styles.topWrapper}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MedalBar
                width={scale(237)}
                data={queryHomeLog} />

              <TouchableOpacity onPress={() => this.modalMedalHelp.openModal()}>
                <Image source={Images.btn_help} style={styles.questionMark} />
              </TouchableOpacity>
            </View>

            <DarumaMessage
              unreadInformationCount={queryHome.unreadInformationCount}
              stampInfo={stampInfo} />
            <WeeklyStamp
              date={startToday}
              stampInfo={stampInfo} />

          </View>

          <View style={styles.bottomWrapper}>
            {this.renderChangeDateBar(this.state.date)}
            <RecordLongTile
              ref={(ref => this.recordLongTile = ref)}
              bloodPressureLogs={queryHomeLog && queryHomeLog.lifelogBloodPressures || []}
              openModalSync={() => (omronLinked
                ? this.modalOmronSync.openModal(this.state.date, this.loadQueryHomeLogVariables(this.state.date))
                : this.goToSettingWearableDevice())}
              openModalHelp={() => this.modalHelp.openModal()}

              moveBpgraph={() =>
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'navigation.LogBloodPressure',
                    options: LogBloodPressure.options(),
                  },
                })}
              openModalBpPulse={bloodPressureLog => this.modalBpPulse.openModal(this.state.date, this.loadQueryHomeLogVariables(this.state.date), bloodPressureLog)} />

            {queryHome.currentUser && queryHome.currentUser.setting.showBodyWeight ?
              <RecordWeightTile
                title="体重"

                onPress={() => this.modalWeight.openModal(this.state.date, queryHomeLog.variables, lifelogBodyWeight)}
                onPressLink={() =>
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'navigation.LogBodyWeight',
                    options: LogBodyWeight.options(),
                  },
                })}
                openModalSync={() => (omronLinked
                ? this.modalOmronSync.openModal(this.state.date, this.loadQueryHomeLogVariables(this.state.date))
                : this.goToSettingWearableDevice())}>
                {lifelogBodyWeight && lifelogBodyWeight.bodyWeight ?
                  <Text style={Theme.textBlack22Bold}>{`${lifelogBodyWeight.bodyWeight}kg`}</Text>
                  :
                  <Text allowFontScaling={false} style={Theme.textDarkGray22Bold}>{'入力する'}</Text>
                }
              </RecordWeightTile> : null}

            <View style={styles.tileWrapper}>
              <RecordTile
                onPressLink={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'navigation.LogStepCount',
                      options: LogStepCount.options(),
                    },
                  })}
                onPress={
                  () => (fitbitLinked
                    ? this.modalFitbitSync.openModal(this.state.date, this.loadQueryHomeLogVariables(this.state.date), lifelogStepCount)
                    : this.goToSettingWearableDevice())
                }
                title="歩数">
                {lifelogStepCount && lifelogStepCount.stepCount !== null ?
                  <Text allowFontScaling={false} style={Theme.textBlack22Bold}>{`${lifelogStepCount && lifelogStepCount.stepCount || 0}歩`}</Text>
                    : <Text allowFontScaling={false} style={Theme.textDarkGray20Bold}>{!fitbitLinked ? 'データ未連携' : <Text allowFontScaling={false} style={Theme.textDarkGray22Bold}>同期する</Text>}</Text>
                  }
              </RecordTile>
              <RecordTile
                title="睡眠"
                onPressLink={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'navigation.LogSleepTime',
                      options: LogSleepTime.options(),
                    },
                  })}
                onPress={() => (fitbitLinked
                  ? this.modalFitbitSync.openModal(this.state.date, this.loadQueryHomeLogVariables(this.state.date), lifelogSleep)
                  : this.goToSettingWearableDevice())}>
                {lifelogSleep && lifelogSleep.sleepTime !== null ?
                  <Text style={Theme.textBlack22Bold}>
                    {`${lifelogSleep && lifelogSleep.sleepTime && Math.floor(lifelogSleep.sleepTime / 60) || 0}時間${lifelogSleep && lifelogSleep.sleepTime && lifelogSleep.sleepTime % 60 || 0}分`}
                  </Text>
                      : <Text allowFontScaling={false} style={Theme.textDarkGray20Bold}>{!fitbitLinked ? 'データ未連携' : <Text allowFontScaling={false} style={Theme.textDarkGray22Bold}>同期する</Text>}</Text>
                    }
              </RecordTile>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {showData[0]}
              {showData[1]}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {showData[2]}
              {showData[3]}
            </View>
          </View>
        </ScrollView>
        <GraphqlView forcedLoadingMode={this.state.dayMove} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    backgroundColor: Colors.GOLDENYELLOW,
    padding: 10,
  },
  questionMark: {
    marginLeft: scale(22),
  },
  bottomWrapper: {
    flex: 1,
    backgroundColor: Colors.LAPALMA,
    padding: 10,
  },
  tileWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeDateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnArrow: {
    height: 40,
    width: 40,
  },
  textDate: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: '500',
  },
})
