import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {RootNavigation} from '~navigations/RootNavigation';
import {store} from '~stores';

const App: React.FC<{}> = ({}) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar
          translucent
          barStyle={'default'}
          backgroundColor={'transparent'}
        />
        <RootNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
