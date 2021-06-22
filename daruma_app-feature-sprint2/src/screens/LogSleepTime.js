import React, { Component } from 'react'
import { StyleSheet, FlatList, View, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'
import { getServerMoment } from '../utils/moment'
import ChangeMonthBar from '../components/ChangeMonthBar'
import LogList from '../components/LogList'
import GraphqlView from '../components/GraphqlView'
import queryLifelogSleeps from '../api/queryLifelogSleeps'
import { QeryLifelogSleeps } from '../api/types'
import ButtonBar from '../components/ButtonBar'
import CustomBarChart from '../components/CustomBarChart'
import { Colors } from '../styles'

type Props = {
  queryLifelogSleeps:QeryLifelogSleeps
};

const startMonth = getServerMoment().startOf('month')

@graphql(queryLifelogSleeps, { name: 'queryLifelogSleeps', options: props => ({ variables: { year: startMonth.year(), month: startMonth.month() + 1 } }) })
export default class LogSaltConcentration extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '睡眠時間',
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
    this.props.queryLifelogSleeps.refetch({ year: newDate.year(), month: newDate.month() + 1 })
  }

  render() {
    const { queryLifelogSleeps } = this.props
    const { isGraph, date } = this.state
    const isLoading = queryLifelogSleeps.loading
    const lifelogSleeps = queryLifelogSleeps.lifelogSleeps && queryLifelogSleeps.lifelogSleeps.filter(lifelog => lifelog.sleepTime !== null) || []
    return (
      <View style={[styles.recordArea]}>
        <ChangeMonthBar now={startMonth} date={date} changedMonth={newDate => this.changeMonth(newDate)} />
        <ButtonBar
          textLeft="グラフ"
          textRight="リスト"
          isRight={!isGraph}
          onPressLeft={() => this.setState({ isGraph: true })}
          onPressRight={() => this.setState({ isGraph: false })} />
        {isGraph ?
          <ScrollView
            bounces={false}>
            { !isLoading &&
              <CustomBarChart
                key={date.format('YYYY-MM')}
                date={date}
                data={lifelogSleeps || []}
                columnName="sleepTime"
                isHour
                yMarksSize={16}
                yLabel="時間"
                yMax={12} />
            }
          </ScrollView>
          :
          <FlatList
            style={{ flex: 1 }}
            data={lifelogSleeps}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <LogList
                date={item.inspectedAt}
                value={`${item.sleepTime && Math.floor(item.sleepTime / 60)}時間${item.sleepTime - Math.floor(item.sleepTime / 60) * 60}分`} />)} />
          }

        <GraphqlView query={queryLifelogSleeps} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recordArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})
