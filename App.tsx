import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerCustom} from '~components';
import {HomeScreen} from '~screens';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '~stores/rootReducer';

const Stack = createNativeStackNavigator();

const DrawerMixedTab = (props: any) => {
  return <DrawerCustom {...props} />;
};

const store = createStore(rootReducer);

const App: React.FC<{}> = () => {
  return (
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
  );
};

export default App;
