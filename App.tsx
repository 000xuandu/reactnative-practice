import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {
  HomeScreen,
  ParallelHeader,
  TabBarHeaderAnimation,
  TodoMemo,
  TodoScreen,
  WatchScreen,
  SplashScreen,
  SignInScreen,
  OtpScreen,
  TodoMobX,
} from '~screens';
import {Provider} from 'react-redux';
import {store} from '~stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {fcmService, notifeeService} from '~services';
import SplashScreenModule from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

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
      SplashScreenModule.hide();
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
        <StatusBar
          translucent
          barStyle={'default'}
          backgroundColor={'transparent'}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {/* <Stack.Screen name="DrawerMixedTab" component={DrawerMixedTab} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ParallelHeader" component={ParallelHeader} />
            <Stack.Screen name="TodoScreen" component={TodoScreen} />
            <Stack.Screen name="TodoMemo" component={TodoMemo} />
            <Stack.Screen name="WatchScreen" component={WatchScreen} />
            <Stack.Screen
              name="TabBarAnimation"
              component={TabBarHeaderAnimation}
            /> */}
            <Stack.Screen name="TodoMobx" component={TodoMobX} />
            {/* Wallet App */}
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
