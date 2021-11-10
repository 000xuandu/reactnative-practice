import messaging from '@react-native-firebase/messaging';

class fcmService {
  public navigation: any;
  public remoteMessage: any;

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Request permission denied', authStatus);
    }
  }

  async getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken: ', fcmToken);
    } else {
      console.warn('[fcmToken]: can not get fcmToken');
    }
  }

  receiveMessageForeground() {
    return messaging().onMessage(async remoteMessage => {
      console.log(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.data),
      );
    });
  }

  // Handling interaction of fcm
  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log('Notification caused app to open from background state:');
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:');
  //       }
  //     });
  // }, []);
}

export default new fcmService();
