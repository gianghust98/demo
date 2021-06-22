import React, {Component} from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Image, Text} from 'react-native';
import moment from 'moment';
import { Theme, Colors } from '../styles';

type Props = {
  queryLifelogBodyWeight:QueryLifelogBodyWeight
};

export default class LogList extends Component<Props> {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.listItem}>
        <View style={styles.dateWrapper}>
          <Text style={Theme.textBlack22W5}>{moment(this.props.date).format("MM/DD")}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={Theme.textBlack22W5}>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  recordArea: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    paddingVertical: 30,
    borderColor: Colors.LIGHTGRAY,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemWrapper: {
    marginLeft: 60,
    alignItems: 'center',
  }
});
