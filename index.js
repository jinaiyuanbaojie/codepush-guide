/**
 * @format
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

class MyApp extends Component {
  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }

  render() {
    return (
      <View style={styles.center}>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text style={styles.button}>Check for updates</Text>
        </TouchableOpacity>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: 'skyblue',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 30,
  },
  version: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(MyApp));
