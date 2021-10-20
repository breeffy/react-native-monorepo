import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { dayOfWeekWidth } from '../../constants';

export enum CalendarDayKind {
  DEFAULT,
  ACTIVE,

  SELECTED,
  DISABLED
}

export type TimeHourProps = {
  kind?: CalendarDayKind;
  hour: number;
  style?: StyleProp<TextStyle>;
};

export const TimeHour = ({ hour }: TimeHourProps) => {
  return (
    <>
      <Text style={styles.container}>{String(hour)}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dayOfWeekWidth,
    height: 38,
    backgroundColor: 'green'
  },
  circle: {
    position: 'absolute',
    alignItems: 'center'
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
