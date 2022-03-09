import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DrawerCustom} from '~components';
import {
  CornersAnimation,
  KittenCardsAnimation,
  LearningReactQuery,
  LearningUseMutation,
  ProgressBarButtonAnimation,
  StaggeredHeadsAnimation,
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
      // initialRouteName="StaggeredHeadsAnimation"
      screenOptions={{
        headerShown: false,
      }}>
      <MainFlowStack.Screen
        name="ProgressBarButtonAnimation"
        component={ProgressBarButtonAnimation}
      />
      <MainFlowStack.Screen
        name="KittenCardsAnimation"
        component={KittenCardsAnimation}
      />
      <MainFlowStack.Screen
        name="StaggeredHeadsAnimation"
        component={StaggeredHeadsAnimation}
      />
      <MainFlowStack.Screen
        name="CornersAnimation"
        component={CornersAnimation}
      />
      {/* <MainFlowStack.Screen
        name="LearningReactQuery"
        component={LearningReactQuery}
      /> */}
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
