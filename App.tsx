import React from 'react';
import {StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {RootNavigation} from '~navigations/RootNavigation';
import {store} from '~stores';

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

export default codePush(App);
