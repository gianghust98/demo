/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from './App';
import {name as appName} from './app.json';

Navigation.registerComponent(appName, () => App);
