import React, { Component } from 'react'
import { StyleSheet, FlatList, View, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'
import { getServerMoment } from '../utils/moment'
import ChangeMonthBar from '../components/ChangeMonthBar'
import LogList from '../components/LogList'
import GraphqlView from '../components/GraphqlView'
import { Colors } from '../styles'
import queryLifelogSaltConcentrations from '../api/queryLifelogSaltConcentrations'
import { QueryLifelogSaltConcentrations } from '../api/types'
import ButtonBar from '../components/ButtonBar'
import CustomBarChart from '../components/CustomBarChart'

type Props = {
  queryLifelogSaltConcentrations:QueryLifelogSaltConcentrations
};


const startMonth = getServerMoment().startOf('month')

@graphql(queryLifelogSaltConcentrations, { name: 'queryLifelogSaltConcentrations', options: props => ({ variables: { year: startMonth.year(), month: startMonth.month() + 1 } }) })
export default class LogSaltConcentration extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '塩分摂取量',
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
    this.props.queryLifelogSaltConcentrations.refetch({ year: newDate.year(), month: newDate.month() + 1 })
  }

  render() {
    const { queryLifelogSaltConcentrations } = this.props
    const { isGraph, date } = this.state
    const isLoading = queryLifelogSaltConcentrations.loading
    const lifelogSaltConcentrations = queryLifelogSaltConcentrations.lifelogSaltConcentrations && queryLifelogSaltConcentrations.lifelogSaltConcentrations.filter(lifelog => lifelog.saltConcentration !== null) || []
    return (
      <View style={[styles.recordArea]}>
        <ButtonBar
          textLeft="グラフ"
          textRight="リスト"
          isRight={!isGraph}
          onPressLeft={() => this.setState({ isGraph: true })}
          onPressRight={() => this.setState({ isGraph: false })} />
        <ChangeMonthBar now={startMonth} date={date} changedMonth={newDate => this.changeMonth(newDate)} />
        { isGraph ?
          <ScrollView
            bounces={false}>
            { !isLoading &&
              <CustomBarChart
                key={date.format('YYYY-MM')}
                data={lifelogSaltConcentrations || []}
                date={date}
                columnName="saltConcentration"
                yMax={30}
                yMarksSize={16}
                yLabel="g" />
            }
          </ScrollView>
          :
          <FlatList
            style={{ flex: 1 }}
            data={lifelogSaltConcentrations}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <LogList
                value={`${item.saltConcentration}g`}
                date={item.inspectedAt} />
            )} />
        }
        <GraphqlView query={queryLifelogSaltConcentrations} />
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
