import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { graphql } from '@apollo/client/react/hoc';

import MedicalCertificatesEdit from '../screens/MedicalCertificatesEdit';
import { Theme, Colors } from '../styles';
import queryMedicalCertificates from '../api/queryMedicalCertificates';
import moment from 'moment';
const { width, height } = Dimensions.get('window')

type Props = {
  queryMedicalCertificates: QueryMedicalCertificates
};

const ITEM_NAMES     = ['身長', 
                        '体重',
                        '腹囲',
                        '最高血圧',
                        '最低血圧',
                        '脈拍',
                        'HDLコレステロール',
                        'LDLコレステロール',
                        '総コレステロール',
                        '中性脂肪', 
                        '血糖値',
                        'HbA1c']
const ITEM_KEY_NAMES = ['bodyHeight', 
                        'bodyWeight', 
                        'bodyWaist', 
                        'maximum', 
                        'minimum', 
                        'pulse', 
                        'hdlCholesterol', 
                        'ldlCholesterol', 
                        'totalCholesterol', 
                        'neutralFat', 
                        'bloodSugarLevel', 
                        'hba1c']
const CELL_WIDTH = 130
const LEFT_CELL_WIDTH = 130

@graphql(queryMedicalCertificates, { name: 'queryMedicalCertificates' })
export default class MedicalCertificates extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        rightButtons: {
          id: 'buttonAdd',
          text: '新規',
          color: Colors.LAPALMA,
          fontWeight: 'bold'
        },
        title: {
          text: '健康診断記録',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      }
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {
    }
  }

  componentDidAppear() {
    if (!this.props.queryMedicalCertificates.loading) {
      this.props.queryMedicalCertificates.refetch()
    }
  }

  navigationButtonPressed({ buttonId }) {
    // switch (buttonId) {
    //   case "buttonAdd":
    //     Navigation.push(this.props.componentId, {
    //       component: {
    //         name: 'navigation.MedicalCertificatesEdit',
    //         options: MedicalCertificatesEdit.options()
    //       },
    //     });
    //     break
    //   default:
    //     break
    // }
  }

  makeCells(rawData) {
    const itemNameTopCell = []
    const itemNameCells   = []
    const topCells        = []
    const itemCells       = []
    let   totalWidth      = LEFT_CELL_WIDTH

    let itemNameTopCellStyle = [styles.cellTop, {alignItems: 'flex-start'}] 
    let itemNameCellStyle    = [styles.leftCell] // 表の左端の列幅をデータの列数が少ない時に広げる
    
    if(rawData.length === 0) { // データがないときの空のセル
      totalWidth += CELL_WIDTH
    
      itemCells.push([])
      topCells.push([])
      for(let i=0; i< ITEM_KEY_NAMES.length; i++) {
        itemCells[0].push(
          <View key={i} style={styles.cell}/>
        )
      }
      topCells[0].push(
        <View key={'topCell'} style={styles.cellTop}/>
      )
    } 

    for(let i = 0; i < rawData.length; i++) {
      totalWidth += CELL_WIDTH
      itemCells.push([])
      topCells.push([])
      for(const itemKeyName of ITEM_KEY_NAMES) { // データ表示部の1列分
        if(itemKeyName === 'bloodSugarLevel') {
          let statusText = rawData[i]['bloodSugarLevelMeasureState']==='hunger'? '空腹時': '食後'
          itemCells[i].push(
            <View key={`${i}`+ 'cell' + `${itemKeyName}`} style={styles.cell}>
              <Text allowFontScaling={false} style={Theme.textBlack20Bold}>{rawData[i]['bloodSugarLevel']? statusText : null }</Text>
              <Text allowFontScaling={false} style={Theme.textBlack20Bold}>{rawData[i]['bloodSugarLevel']}</Text>
            </View>
          )
        } else {
          itemCells[i].push(
            <View key={`${i}`+ 'cell' + `${itemKeyName}`} style={styles.cell}>
              <Text allowFontScaling={false} style={Theme.textBlack20Bold}>{rawData[i][itemKeyName]}</Text>
            </View>
          )
        }
        
      }
      topCells[i].push( // データ表示部の列の一番上のセル
        <View key={`${i}` + 'topCell'} style={styles.cellTop}>
          <Text allowFontScaling={false} style={[Theme.textWhite20, {fontWeight: '500'}]}>{moment(rawData[i].inspectedAt).format('YYYY/M/D')}</Text>
          <TouchableOpacity 
            style={styles.editBtn}
            onPress={() => {this.navTo(rawData[i])}}>
            <Text allowFontScaling={false} style={Theme.textBlack18Bold}>編集</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (totalWidth < width) {
      itemNameCellStyle.push({ width: LEFT_CELL_WIDTH + width - totalWidth })
      itemNameTopCellStyle.push({ width: LEFT_CELL_WIDTH + width - totalWidth })
    }

    itemNameTopCell.push( // 左端の項目表示列の一番上のセル
      <View key={'itemNameTopCell'} style={[itemNameTopCellStyle, { borderRightWidth: 3 }]}>
        <Text allowFontScaling={false}  style={[Theme.textWhite20, {fontWeight: 'bold'}]}>健診日</Text>
      </View>
    )

    for(const itemName of ITEM_NAMES) { // 左端の項目表示列のセル
      itemNameCells.push(
        <View key={`${itemName}`} style={itemNameCellStyle}>
          <Text allowFontScaling={false} style={Theme.textBlack20Bold}>{itemName}</Text>
        </View>
      )
    }
    return { itemCells, topCells, itemNameCells, itemNameTopCell }
  }

  drawItemNameCells(itemNameCells, itemNameTopCell) {
    return (
      <View>
        {itemNameTopCell}
        {itemNameCells}
      </View>
    )
  }
 
  drawItemCells(itemCells, topCells) {
    return (
      <View style={{flexDirection: 'row'}}>
        {itemCells.map((itemCell, index) => (
          <View key={'itemCell' + index}>
            {topCells[index]}
            {itemCell}
          </View>
        ))}
      </View>
    )
  }

  navTo(data) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.MedicalCertificatesEdit',
        options: MedicalCertificatesEdit.options(),
        passProps: {
          medicalCertificate: data
        }
      },
    });
  }

  render() {
    const { queryMedicalCertificates } = this.props
    const medicalCertificates = queryMedicalCertificates && queryMedicalCertificates.medicalCertificates || []
    const { itemCells, topCells, itemNameCells, itemNameTopCell } = this.makeCells(medicalCertificates)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView bounces={false}>
          <View style={styles.row}>
            {this.drawItemNameCells(itemNameCells, itemNameTopCell)}
            <ScrollView bounces={false} horizontal={true}>
              {this.drawItemCells(itemCells, topCells)}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cellTop: {
    backgroundColor: Colors.LAPALMA,
    padding: 5,
    width: CELL_WIDTH,
    height: 100,
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    justifyContent: 'center',
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  leftCell: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    width: CELL_WIDTH,
    height: 80,
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    justifyContent: 'center'
  },
  cell: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    width: CELL_WIDTH,
    height: 80,
    borderColor: Colors.LIGHTGRAY,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBtn: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
