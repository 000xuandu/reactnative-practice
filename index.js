/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {notifeeService} from '~services';

// Received the remote message via background/quit state
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('The remote message via background/quit state: ', remoteMessage);
  notifeeService.remoteMessage = remoteMessage;
  notifeeService.displayNotification();
});

// register notifee's event background/quit
notifeeService.registerOnBackgroundEvent();

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
