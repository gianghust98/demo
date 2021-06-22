import React from 'react';
import {Navigation} from 'react-native-navigation';

import {ApolloClient} from '@apollo/client/core';
import {ApolloProvider} from '@apollo/client';

import DarumaServer from '../utils/DarumaServer';
import Initializing from './Initializing';
import Home from './Home';
import Setting from './Setting';
import SettingAuth from './SettingAuth';
import SettingWearableDevice from './SettingWearableDevice';
import SettingCancelDataSharing from './SettingCancelDataSharing';
import SettingDataSharingManagement from './SettingDataSharingManagement';
import SettingDelete from './SettingDelete';
import Signup from './Signup';
import MyPage from './MyPage';
import Info from './Info';
import HomeHeader from '../components/HomeHeader';
import MyPageHeader from '../components/MyPageHeader';
import ProfileHeader from '../components/ProfileHeader';
import Profile from './Profile';
// import MedicalCertificates from './MedicalCertificates';
// import MedicalCertificatesEdit from './MedicalCertificatesEdit';
import LogBloodPressure from './LogBloodPressure';
import LogBodyWeight from './LogBodyWeight';
import LogBodyTemperature from './LogBodyTemperature';
import LogSaltConcentration from './LogSaltConcentration';
import LogSleepTime from './LogSleepTime';
import LogStepCount from './LogStepCount';
import LoadingOverlay from './LoadingOverlay';
import WebViewScreen from './WebViewScreen';
import OpenLicenseListScreen from './OpenLicenseListScreen';

export function registerScreens() {
  Navigation.registerComponent('navigation.Initializing', () =>
    wrap(Initializing),
  );
  Navigation.registerComponent('navigation.Signup', () => wrap(Signup));
  Navigation.registerComponent('navigation.Home', () => wrap(Home));
  Navigation.registerComponent('navigation.MyPage', () => wrap(MyPage));
  Navigation.registerComponent('navigation.Setting', () => wrap(Setting));
  Navigation.registerComponent('navigation.SettingAuth', () =>
    wrap(SettingAuth),
  );
  Navigation.registerComponent('navigation.SettingWearableDevice', () =>
    wrap(SettingWearableDevice),
  );
  Navigation.registerComponent('navigation.SettingDataSharingManagement', () =>
    wrap(SettingDataSharingManagement),
  );
  Navigation.registerComponent('navigation.SettingCancelDataSharing', () =>
    wrap(SettingCancelDataSharing),
  );
  Navigation.registerComponent('navigation.SettingDelete', () =>
    wrap(SettingDelete),
  );
  Navigation.registerComponent('navigation.Info', () => wrap(Info));
  Navigation.registerComponent('navigation.HomeHeader', () => wrap(HomeHeader));
  Navigation.registerComponent('navigation.MyPageHeader', () =>
    wrap(MyPageHeader),
  );
  Navigation.registerComponent('navigation.Profile', () => wrap(Profile));
  Navigation.registerComponent('navigation.ProfileHeader', () =>
    wrap(ProfileHeader),
  );
  //健康診断なし
  // Navigation.registerComponent(`navigation.MedicalCertificates`, () => wrap(MedicalCertificates));
  // Navigation.registerComponent(`navigation.MedicalCertificatesEdit`, () => wrap(MedicalCertificatesEdit));

  Navigation.registerComponent('navigation.LogBloodPressure', () =>
    wrap(LogBloodPressure),
  );
  Navigation.registerComponent('navigation.LogBodyWeight', () =>
    wrap(LogBodyWeight),
  );
  Navigation.registerComponent('navigation.LogBodyTemperature', () =>
    wrap(LogBodyTemperature),
  );
  Navigation.registerComponent('navigation.LogSaltConcentration', () =>
    wrap(LogSaltConcentration),
  );
  Navigation.registerComponent('navigation.LogSleepTime', () =>
    wrap(LogSleepTime),
  );
  Navigation.registerComponent('navigation.LogStepCount', () =>
    wrap(LogStepCount),
  );
  Navigation.registerComponent(
    'navigation.LoadingOverlay',
    () => LoadingOverlay,
  );
  Navigation.registerComponent('navigation.WebViewScreen', () =>
    wrap(WebViewScreen),
  );
  Navigation.registerComponent('navigation.OpenLicenseListScreen', () =>
    wrap(OpenLicenseListScreen),
  );
}

function wrap(WrapComponent) {
  return class extends React.Component {
    static options(props) {
      if (WrapComponent.options) {
        return WrapComponent.options(props);
      }
      return null;
    }
    constructor(props) {
      super(props);
      this.toProps = {...props};
    }
    render() {
      return (
        <ApolloProvider client={DarumaServer.graphq.client}>
          <WrapComponent {...this.toProps} />
        </ApolloProvider>
      );
    }
  };
}
