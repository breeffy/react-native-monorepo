import { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { Toggle } from '@breeffy/react-native-ui-elements';
import { ToggleWithState } from '@breeffy/elements';
import type { ToggleWithStateProps } from '@breeffy/elements';
// import { MenuItem } from '../components';
// import { styles } from '../styles';
// import { Icons } from '../components';

import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type OnPressCallback = NonNullable<ToggleWithStateProps['onPress']>;

export type ElementsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Elements'
>;

export const ElementsScreen = ({}: ElementsScreenProps) => {
  const onTogglePress = useCallback<OnPressCallback>((type, prevType) => {
    console.log(`[onTogglePress] type [${type}], prevType [${prevType}]`);
  }, []);

  return (
    <View style={styles.container}>
      <Text>String</Text>
      {/* <ToggleWithState onPress={onTogglePress} /> */}
      <ToggleWithState onPress={onTogglePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'orange' }
});
