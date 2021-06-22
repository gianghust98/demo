import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, Text, Platform, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Theme, Colors } from '../styles'
import Images from '../../res/img'
import { scale } from '../utils/Scaling'

const { width } = Dimensions.get('window')

const Title = props => (
  <View style={styles.container}>

    <View style={styles.topWrapper}>
      {props.openModalSync ?
        <TouchableOpacity style={styles.syncButton} onPress={() => props.openModalSync()}>
          <Text style={styles.textSyncButton}>データ同期</Text>
        </TouchableOpacity>
         : null
      }
      <Text style={styles.textTitle}>{props.title}</Text>
      {props.onPressLink ?
        <TouchableOpacity style={styles.graphButton} onPress={() => props.onPressLink()}>
          <Image source={Images.btn_bpgraph} />
        </TouchableOpacity> : null
      }
    </View>
  </View>
)

const RecordTile = props => (
  <View
    style={{
      backgroundColor: '#FFF',
      borderRadius: 7,
      // width: (width - 20),
      // height: 125,
      ...Platform.select({
        ios: {
          paddingVertical: scale(10),
        },
        android: {
          paddingVertical: scale(7),
        },
      }),
      marginBottom: 10,
      paddingHorizontal: scale(10),
    }}>
    <Title
      title={props.title}
      titleStyle={props.titleStyle}
      onPressLink={props.onPressLink} 
      openModalSync={props.openModalSync} />

    {props.onPress ?

    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={{
      alignItems: 'center', flex: 1, justifyContent: 'center',
      }}>
      {props.children}
    </TouchableOpacity> :

    <View
      style={{
      alignItems: 'center', flex: 1, justifyContent: 'center',
      }}>
      {props.children}
    </View>
    }
  </View>
)


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    // paddingTop: Platform.OS === 'ios' ? 15 : 10,
    paddingBottom: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 0,
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
    right: 5,
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
    left: 0,
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

export default RecordTile

