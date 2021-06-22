import React, { Component } from 'react'
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import Modal from 'react-native-modal'

import Images from '../../res/img'
import { Theme, Colors } from '../styles'
import RecordList from '../components/RecordList'

const { width, height } = Dimensions.get('window')

export default class RecordLongTile extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      addInfo: false,
      visibleModal: false,
      modalContent: null,
      item: null,
    }
  }

  handleRecordNum(val) {
    this.setState({ addInfo: val })
  }

  renderFooter(bloodPressureLogs) {
    if (bloodPressureLogs.length <= 2 || this.state.addInfo) return null
    return (
      <TouchableOpacity
        style={{
 justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderColor: Colors.LIGHTGRAY 
}}
        onPress={() => this.handleRecordNum(true)}>
        <Text style={Theme.textLapalma20}>もっと見る</Text>
      </TouchableOpacity>
    )
  }

  openModal(date) {
    this.setState({ visibleModal: true, inspectedAt })
  }
  dismissModal() {
    this.setState({ visibleModal: false })
  }

  render() {
    const { bloodPressureLogs } = this.props

    const sliceList = bloodPressureLogs.slice(0, this.state.addInfo ? bloodPressureLogs.length : 2)
    return (
      <View style={styles.container}>

        <View style={styles.topWrapper}>
          <TouchableOpacity style={styles.syncButton} onPress={() => this.props.openModalSync()}>
            <Text style={styles.textSyncButton}>データ同期</Text>
          </TouchableOpacity>
          <Text style={styles.textTitle}>血圧と脈拍</Text>
          <TouchableOpacity style={styles.graphButton} onPress={() => this.props.moveBpgraph()}>
            <Image source={Images.btn_bpgraph} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpButton} onPress={() => this.props.openModalHelp()}>
            <Image source={Images.btn_help} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => this.props.openModalBpPulse()}>
          <Text style={[Theme.textDarkGray22Bold, { textAlign: 'center', paddingVertical: 10 }]}>入力する</Text>
        </TouchableOpacity>

        <FlatList
          data={sliceList}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={() => this.renderFooter(bloodPressureLogs)}
          renderItem={({ item, index }) => (
            <RecordList
                isLastRecord={index === sliceList.length - 1}
                bloodPressureLog={item}
                showModalContent={item => this.props.openModalBpPulse(item)} />
            )
          } />

      </View>
    )
  }
}

RecordLongTile.propTypes = {
  bloodPressureLogs: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? 15 : 10,
    paddingBottom: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 10,
    borderRadius: 7,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  graphButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -7,
    right: 55,
  },
  helpButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -7,
    right: 15,
  },
  syncButton: {
    position: 'absolute',
    left: 10,
  },
  textTitle: {
    ...Platform.select({
      ios: {
        ...Theme.textLapalma22Bold,
      },
      android: {
        ...Theme.textLapalma20Bold,
      },
    }),
  },
  textSyncButton: {
    ...Theme.textLapalma16Bold,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: Colors.LAPALMA,
    paddingVertical: 5,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
})
