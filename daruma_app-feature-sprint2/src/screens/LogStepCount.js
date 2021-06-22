import React, { Component } from 'react'
import { StyleSheet, FlatList, View, ScrollView, Image, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { graphql } from '@apollo/client/react/hoc'
import moment, { getServerMoment } from '../utils/moment'
import { Theme, Colors } from '../styles'
import Images from '../../res/img'
import ChangeMonthBar from '../components/ChangeMonthBar'
import GraphqlView from '../components/GraphqlView'
import ButtonBar from '../components/ButtonBar'
import CustomBarChart from '../components/CustomBarChart'
import queryLifelogStepCounts from '../api/queryLifelogStepCounts'
import { QueryLifelogStepCounts } from '../api/types'

type Props = {
  queryLifelogStepCounts: QueryLifelogStepCounts
};


const startMonth = getServerMoment().startOf('month')

@graphql(queryLifelogStepCounts, { name: 'queryLifelogStepCounts', options: props => ({ variables: { year: startMonth.year(), month: startMonth.month() + 1 } }) })
export default class LogSaltConcentration extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '歩数とカロリー',
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
    this.props.queryLifelogStepCounts.refetch({ year: newDate.year(), month: newDate.month() + 1 })
  }

  render() {
    const { queryLifelogStepCounts } = this.props
    const { isGraph, date } = this.state
    const isLoading = queryLifelogStepCounts.loading
    const lifelogStepCounts = queryLifelogStepCounts.lifelogStepCounts && queryLifelogStepCounts.lifelogStepCounts.filter(lifelog => lifelog.stepCount !== null) || []
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
                data={lifelogStepCounts || []}
                date={date}
                columnName="stepCount"
                yAxisWidth={40}
                yMax={25000}
                yLabel="歩" />
            }
          </ScrollView>
          :
          <FlatList
            style={{ flex: 1 }}
            data={lifelogStepCounts}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text style={styles.textDate}>{moment(item.inspectedAt).format('MM/DD')}</Text>

                <View style={styles.center}>
                  <Text style={[styles.textLabel]}>歩数</Text>
                  <View style={styles.stepsWrapper}>
                    <Text style={styles.textStep}>{`${item.stepCount}歩`}</Text>
                    <Image
                      style={[styles.imgAchievement, { opacity: item.stepCounAchievement ? 1 : 0 }]}
                      source={Images.img_achievement} />
                  </View>
                </View>

                <View style={styles.right}>
                  <Text style={styles.textLabel}>消費カロリー</Text>
                  <Text style={Theme.textBlack20W5}>{`${item.caloriesOut}kcal`}</Text>
                </View>

              </View>)} />
        }
        <GraphqlView query={queryLifelogStepCounts} />
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
    paddingVertical: 15,
    borderColor: Colors.LIGHTGRAY,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  textDate: {
    ...Theme.textBlack20W5,
    width: '20%',
    textAlign: 'center',
  },
  textLabel: {
    ...Theme.textBlack16,
    marginBottom: 5,
  },
  textStep: {
    ...Theme.textBlack20W5,
    width: '60%',
  },
  imgAchievement: {
    height: 22,
    width: '30%',
    resizeMode: 'contain',
  },
  stepsWrapper: {
    flexDirection: 'row',
  },
  center: {
    width: '50%',
  },
  right: {
    width: '30%',
  },
})
