import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'mobx-react';
import {productStore} from '@stores';

class Index extends React.Component {
  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Provider productStore={productStore}>
          <App />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => Index);
