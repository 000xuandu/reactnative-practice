import React from "react";
import { StatusBar } from "react-native";
import codePush from "react-native-code-push";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { RootNavigation } from "~navigations/RootNavigation";
import { store } from "~stores";

const queryClient = new QueryClient();

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <StatusBar translucent barStyle="default" backgroundColor="transparent" />
            <RootNavigation />
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default codePush(App);
