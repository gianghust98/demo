import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements'
import { Theme, Colors } from '../styles';
import Images from '../../res/img';
import licenses from '../licenses.json'

type Props = {
  queryLifelogStepCount: QueryLifelogStepCount
};


export default class OpenLicenseListScreen extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'オープンソースライセンス',
          color: Colors.GRAY,
          fontWeight: 'bold',
        },
      }
    }
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
  }

  render() {
    const licenselist = []
    for (const key in licenses) {
      licenselist.push({
        title: key,
        source: { uri: (licenses[key].licenseUrl).replace(/http:\/\//i, 'https://') },
      })
    }

    return (
      <View style={[styles.recordArea]}>
        <FlatList
          style={{ flex: 1 }}
          data={licenselist}
          keyExtractor={(item) => `${item.title}`}
          renderItem={({item}) => 
            <ListItem
              onPress={()=>{
                Linking.openURL(item.source.uri)
              }} 
              title={item.title}
              titleStyle={Theme.textGray12Light}
              containerStyle={{ backgroundColor: '#FFF', paddingTop: 20, paddingBottom: 20 }}/>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recordArea: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  listItem: {
    flexDirection: 'row',
    padding: 15,
    borderColor: Colors.LIGHTGRAY,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    alignItems: 'center'
  }
});
