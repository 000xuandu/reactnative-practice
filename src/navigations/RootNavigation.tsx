import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AuthFlow} from './AuthFlow';
import SplashScreenModule from 'react-native-splash-screen';
import {fcmService, notifeeService} from '~services';
import {MainFlow} from './MainFlow';

export const RootNavigation = ({}: any) => {
  const [isLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreenModule.hide();
      clearTimeout(timeoutId);
    }, 1000);
    fcmService.requestUserPermission();
    fcmService.getToken();
    fcmService.receiveMessageForeground();
    notifeeService.registerOnForegroundEvent();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainFlow /> : <AuthFlow />}
    </NavigationContainer>
  );
};
