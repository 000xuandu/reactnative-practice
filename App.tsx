import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerCustom} from '~components';
import {HomeScreen} from '~screens';
import {Provider} from 'react-redux';
import {store} from '~stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const DrawerMixedTab = (props: any) => {
  return <DrawerCustom {...props} />;
};

const App: React.FC<{}> = () => {
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
