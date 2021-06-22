import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { goToInitializing } from './src/screens/navigation'
import bgMessaging from "./src/utils/Firebase"

registerScreens();
Navigation.events().registerAppLaunchedListener(goToInitializing)
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
// AppRegistry.registerHeadlessTask('app.notifee.notification-event', () =>Navigation.events().registerAppLaunchedListener(goToInitializing));