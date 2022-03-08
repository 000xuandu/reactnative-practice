import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {RootNavigation} from '~navigations/RootNavigation';
import {store} from '~stores';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const App: React.FC<{}> = ({}) => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StatusBar
            translucent
            barStyle={'default'}
            backgroundColor={'transparent'}
          />
          <RootNavigation />
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
