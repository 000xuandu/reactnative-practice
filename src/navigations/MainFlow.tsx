import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {
  LearningReactQuery,
  LearningUseMutation,
  Transition3D,
  WebRTCScreen,
} from '~screens';
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
      initialRouteName="LearningReactQuery"
      screenOptions={{
        headerShown: false,
      }}>
      <MainFlowStack.Screen
        name="LearningReactQuery"
        component={LearningReactQuery}
      />
      <MainFlowStack.Screen name="Transition3D" component={Transition3D} />
      <MainFlowStack.Screen
        name="LearningReactQuery"
        component={LearningReactQuery}
      />
      <MainFlowStack.Screen
        name="LearningUseMutation"
        component={LearningUseMutation}
      />
      <MainFlowStack.Screen name="WebRTCScreen" component={WebRTCScreen} />
      <MainFlowStack.Screen name="MainStack" component={DrawerMixedTab} />
    </MainFlowStack.Navigator>
  );
};
