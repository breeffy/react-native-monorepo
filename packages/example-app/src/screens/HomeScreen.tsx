import { useCallback } from 'react';
import { Platform, SafeAreaView, Text, View, Button } from 'react-native';
import { MenuItem } from '../components';
import { styles } from '../styles';
import { Icons } from '../components';

import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeProps) => {
  const onElementsPress = useCallback(() => {
    console.log('onElementsPressed called!');
    navigation.navigate('Elements');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <View
        style={{
          width: '100%',
          height: '100%',
          // backgroundColor: 'green',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20
        }}
      >
        {/** @ts-expect-error */}
        <MenuItem title='Pickers' iconName={Icons.pickers} />
        <MenuItem
          title='Elements'
          iconName={Icons.elements}
          style={{ marginTop: 20 }}
          onPress={onElementsPress}
        />
        <MenuItem
          title='Calendars'
          iconName={Icons.calendars}
          style={{ marginTop: 20 }}
        />
        <MenuItem
          title='Charts'
          iconName={Icons.charts}
          disabled
          style={{ marginTop: 20 }}
        />
        <Text style={styles.text}>Test</Text>
        <View style={styles.platformRow}>
          <Text style={styles.text}>Platform: </Text>
          <View style={styles.platformBackground}>
            <Text style={styles.platformValue}>{Platform.OS}</Text>
          </View>
        </View>
        <Button
          title='Go to Details'
          onPress={() =>
            navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'cool test'
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};
