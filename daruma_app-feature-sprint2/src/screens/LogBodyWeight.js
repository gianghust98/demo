import React, { Component } from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'
import { getServerMoment } from '../utils/moment'
import ChangeMonthBar from '../components/ChangeMonthBar'
import LogList from '../components/LogList'
import GraphqlView from '../components/GraphqlView'
import ButtonBar from '../components/ButtonBar'
import ChartWeight from '../components/ChartWeight'
import { Colors } from '../styles'
import queryLifelogBodyWeights from '../api/queryLifelogBodyWeights'
import { QueryLifelogBodyWeights } from '../api/types'

type Props = {
  queryLifelogBodyWeights:QueryLifelogBodyWeights
};
const startMonth = getServerMoment().startOf('month')

@graphql(queryLifelogBodyWeights, { name: 'queryLifelogBodyWeights', options: props => ({ variables: { year: startMonth.year(), month: startMonth.month() + 1 } }) })
export default class LogBodyWeight extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '体重',
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
    this.props.queryLifelogBodyWeights.refetch({ year: newDate.year(), month: newDate.month() + 1 })
  }

  render() {
    const { queryLifelogBodyWeights } = this.props
    const { isGraph, date } = this.state
    const isLoading = queryLifelogBodyWeights.loading
    const lifelogBodyWeights = queryLifelogBodyWeights.lifelogBodyWeights && queryLifelogBodyWeights.lifelogBodyWeights.filter(lifelog => lifelog.bodyWeight !== null) || []
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
            {!isLoading &&
            <ChartWeight
              key={date.format('YYYY-MM')}
              date={date}
              data={lifelogBodyWeights || []} />
            }
          </ScrollView>
          :
          <FlatList
            style={{ flex: 1 }}
            data={lifelogBodyWeights}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <LogList
                date={item.inspectedAt}
                value={`${item.bodyWeight}kg`} />
          )} />
          }

        <GraphqlView query={queryLifelogBodyWeights} />
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
    flexDirection: 'row',
    padding: 15,
    paddingVertical: 30,
    borderColor: 'gray',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemWrapper: {
    marginLeft: 60,
    alignItems: 'center',
  },
})
