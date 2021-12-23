import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OtpScreen, SignInScreen, SplashScreen} from '~screens';
import React from 'react';

const AuthFlowStack = createNativeStackNavigator();

export const AuthFlow = ({}: any) => {
  return (
    <AuthFlowStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <AuthFlowStack.Screen name="DrawerMixedTab" component={DrawerMixedTab} />
        <AuthFlowStack.Screen name="Home" component={HomeScreen} />
        <AuthFlowStack.Screen name="ParallelHeader" component={ParallelHeader} />
        <AuthFlowStack.Screen name="TodoScreen" component={TodoScreen} />
        <AuthFlowStack.Screen name="TodoMemo" component={TodoMemo} />
        <AuthFlowStack.Screen name="WatchScreen" component={WatchScreen} />
        <AuthFlowStack.Screen name="TodoMobx" component={TodoMobX} />
        <AuthFlowStack.Screen
          name="TabBarAnimation"
          component={TabBarHeaderAnimation}
      /> */}
      {/* Wallet App */}
      <AuthFlowStack.Screen name="Splash" component={SplashScreen} />
      <AuthFlowStack.Screen name="SignIn" component={SignInScreen} />
      <AuthFlowStack.Screen name="Otp" component={OtpScreen} />
    </AuthFlowStack.Navigator>
  );
};
