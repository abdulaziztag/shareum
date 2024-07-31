import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import './src/utils/localization';
import Screens from '@/Screens';
import { useActiveTheme } from '@/hooks/_index';
import { store } from '@/store';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function App() {
  const activeTheme = useActiveTheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ backgroundColor: activeTheme.backgroundPrimary }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Screens />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
