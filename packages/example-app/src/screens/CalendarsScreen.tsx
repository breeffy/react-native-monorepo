import { View, StyleSheet } from 'react-native';
// import { MenuItem } from '../components';
// import { styles } from '../styles';
// import { Icons } from '../components';

import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type CalendarsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Calendars'
>;

export const CalendarsScreen = ({}: CalendarsScreenProps) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'orange' }
});
