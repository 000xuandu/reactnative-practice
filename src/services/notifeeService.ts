import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {fcmService} from '~services';

class NotifeeService {
  private channelId: string = '';

  private async createChannelForAndroid() {
    // delete chanel if exits
    await notifee.deleteChannel('important');
    // Create a channel
    this.channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
  }

  /**
   * @event foreground
   * Handle interaction press on notifee's notification
   * You can change UI, navigate to another screen
   */
  registerOnForegroundEvent() {
    notifee.onForegroundEvent(({type}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed notification via foreground');
          fcmService.navigation.push('Home', {
            id: fcmService.remoteMessage?.data?.Room,
          });
          break;
      }
    });
  }

  /**
   * @event background/quit
   * Handle interaction press on notifee's notification
   * When app's state is quit, If you want navigate to other screen,
   * you will use redux to save the screen's name.
   * Because this function run without React code.
   */
  registerOnBackgroundEvent() {
    notifee.onBackgroundEvent(async ({}) => {
      console.log('event notification from background');
      // const {notification, pressAction} = detail;
      // if (type === EventType.ACTION_PRESS) {
      //   console.log('[onBackgroundEvent] ACTION_PRESS: first_action_reply');
      //   // Remove the notification
      //   if (notification?.id) {
      //     await notifee.cancelNotification(notification?.id);
      //   }
      // }
    });
  }

  async displayNotification() {
    if (!this.channelId) {
      await this.createChannelForAndroid();
    }
    const notificationBasic = {
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId: this.channelId,
        smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
        color: '#9c27b0',
        pressAction: {
          id: 'default',
        },
      },
    };

    try {
      await notifee.displayNotification(notificationBasic);
    } catch (e) {
      console.log('this.channelId: ', this.channelId);
      console.error('[displayNotification]: ', e);
    }
  }
}

export default new NotifeeService();
