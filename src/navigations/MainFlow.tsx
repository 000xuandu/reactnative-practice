import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {LearningReactQuery, WebRTCScreen} from '~screens';
import {Transition3D} from '~screens';
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
      <MainFlowStack.Screen
        name="LearningReactQuery"
        component={LearningReactQuery}
      />
      <MainFlowStack.Screen name="Transition3D" component={Transition3D} />
      <MainFlowStack.Screen name="WebRTCScreen" component={WebRTCScreen} />
      <MainFlowStack.Screen name="MainStack" component={DrawerMixedTab} />
    </MainFlowStack.Navigator>
  );
};
