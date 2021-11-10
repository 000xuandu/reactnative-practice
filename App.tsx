import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {HomeScreen} from '~screens';
import {Provider} from 'react-redux';
import {store} from '~stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {fcmService, notifeeService} from '~services';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const DrawerMixedTab = (props: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    fcmService.navigation = navigation;
    return notifeeService.registerOnForegroundEvent();
  });
  return <DrawerCustom {...props} />;
};

const App: React.FC<{}> = ({}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    fcmService.requestUserPermission();
    fcmService.getToken();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // arrive fcm message when foreground
  useEffect(() => {
    return fcmService.receiveMessageForeground();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="DrawerMixedTab" component={DrawerMixedTab} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
