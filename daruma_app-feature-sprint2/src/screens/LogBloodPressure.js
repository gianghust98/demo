import React, { Component } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'
import moment, { getServerMoment } from '../utils/moment'
import ChangeMonthBar from '../components/ChangeMonthBar'
import ButtonBar from '../components/ButtonBar'
import Graph from '../components/Graph'
import GraphqlView from '../components/GraphqlView'
import { recordDeviceName } from '../utils/config'

import DarumaServer from '../utils/DarumaServer'
// import mutationHealthStatus from '../api/mutationHealthStatus';
import queryLifelogBloodPressures from '../api/queryLifelogBloodPressures'
import { QueryLifelogBloodPressures } from '../api/types'
import { Theme } from '../styles'
import { Colors } from '../styles'

type Props = {
  queryLifelogBloodPressures:queryLifelogBloodPressures
};


const startMonth = getServerMoment().startOf('month')

@graphql(queryLifelogBloodPressures, { name: 'queryLifelogBloodPressures', options: props => ({ variables: { year: startMonth.year(), month: startMonth.month() + 1 } }) })
export default class LogBloodPressure extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '血圧と脈拍',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      },
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      date: startMonth,
      isGraph: true,
    }
  }

  componentDidAppear() {
  }

  changeMonth(newDate) {
    this.setState({ date: newDate })
    this.props.queryLifelogBloodPressures.refetch({ year: newDate.year(), month: newDate.month() + 1 })
  }

  render() {
    const { queryLifelogBloodPressures } = this.props
    const { isGraph, date } = this.state
    return (
      <View style={[styles.recordArea]}>
        <ButtonBar
          textLeft="グラフ"
          textRight="リスト"
          isRight={!isGraph}
          onPressLeft={() => this.setState({ isGraph: true })}
          onPressRight={() => this.setState({ isGraph: false })} />
        <ChangeMonthBar
          now={startMonth}
          date={date}
          changedMonth={newDate => this.changeMonth(newDate)} />
        { isGraph && queryLifelogBloodPressures.lifelogBloodPressures ?
          <ScrollView
            bounces={false}>
            <Graph
              key={this.state.date.format('YYYY-MM')}
              baseLine={queryLifelogBloodPressures && queryLifelogBloodPressures.currentUser.baseLine}
              data={queryLifelogBloodPressures.lifelogBloodPressures} />
          </ScrollView>
          :
          <FlatList
            style={{ flex: 1 }}
            data={queryLifelogBloodPressures.lifelogBloodPressures}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <View style={styles.row}>
                  <View style={styles.dateWrapper}>
                    <Text style={[Theme.textBlack20W5, { marginBottom: 5 }]}>{moment(item.inspectedAt).format('MM/DD')}</Text>
                    <Text style={Theme.textBlack18}>{moment(item.inspectedAt).format('H:mm')}</Text>
                  </View>
                  <View style={styles.bpnumWrapper}>
                    <Text style={styles.textTop}>最高</Text>
                    <Text style={Theme.textBlack22}>{item.maximum}</Text>
                    <Text style={Theme.textGray16}>mmHg</Text>
                  </View>
                  <View style={styles.bpnumWrapper}>
                    <Text style={styles.textTop}>最低</Text>
                    <Text style={Theme.textBlack22}>{item.minimum}</Text>
                    <Text style={Theme.textGray16}>mmHg</Text>
                  </View>
                  <View style={styles.bpnumWrapper}>
                    <Text style={styles.textTop}>脈拍</Text>
                    <Text style={Theme.textBlack22}>{item.pulse}</Text>
                    <Text style={Theme.textGray16}>拍/分</Text>
                  </View>
                </View>
                <Text style={styles.recordDevice}>{recordDeviceName(item.recordDevice)}</Text>
              </View>)} />
        }
        <GraphqlView query={queryLifelogBloodPressures} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recordArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHTGRAY,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 40,
  },
  bpnumWrapper: {
    alignItems: 'center',
  },
  textTop: {
    ...Theme.textBlack16Bold,
    marginBottom: 5,
  },
  recordDevice: {
    color: Colors.DARKGRAY,
    fontSize: 12,
    textAlign: 'right',
    marginRight: 0,
    marginTop: 5,
  },
})
