import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {WebRTCScreen} from '~screens';
import {fcmService} from '~services';

const MainFlowStack = createNativeStackNavigator();

const DrawerMixedTab = (props: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    fcmService.navigation = navigation;
  }, [navigation]);
  return <DrawerCustom {...props} />;
};

export const MainFlow = ({}: any) => {
  return (
    <MainFlowStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainFlowStack.Screen name="WebRTCScreen" component={WebRTCScreen} />
      <MainFlowStack.Screen name="MainStack" component={DrawerMixedTab} />
    </MainFlowStack.Navigator>
  );
};
