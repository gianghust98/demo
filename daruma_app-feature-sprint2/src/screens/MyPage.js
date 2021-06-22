import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, TouchableOpacity, Button, SectionList, Image} from 'react-native';
import { graphql } from '@apollo/client/react/hoc';
import {
  ListItem,
  Divider
} from 'react-native-elements'
import SInfo from 'react-native-sensitive-info';
import { Navigation } from 'react-native-navigation';
import LineLogin from '@xmartlabs/react-native-line'
import Config from 'react-native-config'
import DarumaServer from '../utils/DarumaServer';
import { goToInitializing,showModalProfile } from './navigation'
import Setting from "./Setting"
import LogBloodPressure from "./LogBloodPressure"
import LogBodyWeight from "./LogBodyWeight"
import LogSaltConcentration from "./LogSaltConcentration"
import LogSleepTime from "./LogSleepTime"
import LogStepCount from "./LogStepCount"
import LogBodyTemperature from "./LogBodyTemperature"
import { Theme, Colors } from '../styles'
import Images from '../../res/img'

import mutationAdviceTestThis from '../api/mutationAdviceTestThis'
import mutationAdviceTestPrev from '../api/mutationAdviceTestPrev'
import querySetting from '../api/querySetting';
// import HealthStatus from './HealthStatus';

type Props = {};

@graphql(querySetting, { name: 'querySetting'})
export default class MyPage extends Component<Props> {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted



    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        ...(Platform.OS !== "android")?{
          backButton: {
            visible: false,
          },
        }:{},
        drawBehind: false,
        title: {
          component: {
            alignment: 'center',
            name: 'navigation.MyPageHeader',
            passProps: {
              leftPress:()=>{
                if (Platform.OS === "android") Navigation.dismissModal(this.props.componentId)
                else Navigation.pop(this.props.componentId)
              },
              rightPress:()=>{
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'navigation.Setting',
                    options:Setting.options()
                  }
                });
              },
            }
          }
        }
      }
    });
  }


  render() {
    const { querySetting } = this.props
    const list = [
      { title: '血圧と脈拍',
        onPress: () => {
          Navigation.push(this.props.componentId, {
            component: {
              name: 'navigation.LogBloodPressure',
              options:LogBloodPressure.options()
            }
          });
        }
      },
      { title: '歩数と消費カロリー',
        onPress: () => {
          Navigation.push(this.props.componentId, {
            component: {
              name: 'navigation.LogStepCount',
              options:LogStepCount.options()
            }
          });
        }
      },
      { title: '睡眠',
        onPress: () => {
          Navigation.push(this.props.componentId, {
            component: {
              name: 'navigation.LogSleepTime',
              options:LogSleepTime.options()
            }
          });
        }
      }
    ]
    
    if(querySetting.currentUser && querySetting.currentUser.setting.showBodyWeight){
      list.push(
        { title: '体重',
          onPress: () => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'navigation.LogBodyWeight',
                options:LogBodyWeight.options()
              }
            });
          }
      })
    }

    if(querySetting.currentUser && querySetting.currentUser.setting.showSaltConcentration){
      list.push(
        { title: '塩分摂取量',
          onPress: () => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'navigation.LogSaltConcentration',
                options:LogSaltConcentration.options()
              }
            });
          }
      })
    }

    if(querySetting.currentUser && querySetting.currentUser.setting.showBodyTemperature){
      list.push(
        { title: '体温',
          onPress: () => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'navigation.LogBodyTemperature',
                options:LogBodyTemperature.options()
              }
            });
          }
      })
    }
    
    return (
      <View style={styles.container}>
        <ScrollView bounces={true}>
        <View style={styles.topWrapper}>
          <Image source={Images.ic_mypage_big} style={styles.img}/>
          <TouchableOpacity
            onPress={showModalProfile}
          >
            <Text style={styles.textButton}>登録情報の記録</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={[
            {title: 'ライフログ',
             data: list
            }
          ]}
          renderItem={({item}) => 
            <ListItem
              onPress={item.onPress} 
              title={item.title}
              titleNumberOfLines={3}
              titleStyle={Theme.textBlack20Bold}
              rightIcon={{
                name: 'chevron-right',
                type: 'evilicon',
                color: Colors.LIGHTGRAY,
              }}
              containerStyle={{ backgroundColor: '#FFF', paddingTop: 20, paddingBottom: 20, borderBottomWidth:1, borderTopColor: Colors.LIGHTGRAY, borderBottomColor: Colors.LIGHTGRAY }}/>
              }
          renderSectionHeader={({section: {title}}) => (title) ? 
            <ListItem
              containerStyle={{ backgroundColor: Colors.WHITESMOKE, paddingTop: 30, borderTopColor: Colors.LIGHTGRAY, borderBottomColor: Colors.LIGHTGRAY}}
              rightIcon={<View />}
              title={title}
              titleStyle={Theme.textDimGray20}
            /> : null}
          keyExtractor={(item, index) => index}
        />
        
        {Config.ENV === "dev" || Config.ENV === "stg" ?
        <View>
          <Button
            onPress={async () => {
              await SInfo.deleteItem('currentUserIdentifier', {});
              await SInfo.deleteItem('currentUserIdentityToken', {});
              LineLogin.logout()
              DarumaServer.graphq.clearAuth()
              
              setTimeout(()=>{
                goToInitializing()
              },500)
            }}
            title="Logout"
          />

          <Button
            onPress={() => {
              DarumaServer.graphq.client.mutate({
                mutation: mutationAdviceTestPrev
              })
            }}
            title="先週のメダルとアドバイスを送信"
          />
          <Button
            onPress={() => {
              DarumaServer.graphq.client.mutate({
                mutation: mutationAdviceTestThis
              })
            }}
            title="今のメダルとアドバイスを送信"
          />
          <Text>{Config.ENV}</Text>
        </View>:null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.WHITESMOKE,
  },
  topWrapper: {
    paddingVertical: 30,
    alignItems: 'center'
  },
  img: {
    alignSelf: 'center',
    marginBottom: 10
  },
  textButton: {
    ...Theme.textBlack18Bold,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.LAPALMA,
    paddingVertical: 13,
    paddingHorizontal: 30,
    textAlign: 'center',
    backgroundColor: Colors.WHITE
  },
});
