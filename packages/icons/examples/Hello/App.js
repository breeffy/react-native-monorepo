import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core'
import { SvgIcon } from '@breeffy/react-native-svg-icons'
import {faCoffee, faBeer, faCircle, faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee, faBeer, faCircle, faCheck);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react-native-fontawesome!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <Text style={styles.instructions}>And now, for some icons:</Text>

      <Text>Default style</Text>
      <SvgIcon icon={'beer'} size={32} />

      <Text>Icon with different color:</Text>
      <SvgIcon icon={'beer'} size={32} style={{color: 'green'}} />

      <Text>Icon with mask:</Text>
      <SvgIcon icon={'check'} size={32} mask={'circle'} style={{color: 'red'}} />

      {
        // Uncomment to render an icon that uses the react-native-svg elements directly.
        // For comparison.
        // SampleRNSVGPlainIcon
      }
      {
        // Uncomment to render a masked icon with that uses the react-native-svg elements directly.
        // For comparison.
        // SampleRNSVGMaskedIcon
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7a3a5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
