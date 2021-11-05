import { memo } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler
} from 'react-native-reanimated';
import { CalendarDay, CalendarDayKind } from './CalendarDay';
import { TapGestureHandler } from 'react-native-gesture-handler';
import isEqual from 'fast-deep-equal';
import type { TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import type { ChangePropertyType } from '@breeffy/types';
import type { CalendarDayProps } from './CalendarDay';

export type CalendarPressableDayKind = CalendarDayProps['kind'];

export type CalendarDayPressableProps = {
  id: string;
  onPress?: (id: string, kind: CalendarDayKind) => void;
} & ChangePropertyType<CalendarDayProps, 'kind', CalendarPressableDayKind>;

export const CalendarDayPressableComponent = ({
  id,
  kind,
  day,
  onPress
}: CalendarDayPressableProps) => {
  // console.log(`[CalendarDay] render: ${JSON.stringify(id)}`);
  const handleStateChange =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onActive: _ => {
          if (onPress !== undefined) {
            const newKind =
              kind === CalendarDayKind.SELECTED
                ? CalendarDayKind.DEFAULT
                : CalendarDayKind.SELECTED;
            runOnJS(onPress)(id, newKind);
          }
        }
      },
      [id, kind, onPress]
    );

  return (
    <TapGestureHandler
      enabled={kind !== CalendarDayKind.DISABLED}
      shouldCancelWhenOutside={true}
      minPointers={1}
      numberOfTaps={1}
      onGestureEvent={handleStateChange}
    >
      <Animated.View>
        <CalendarDay kind={kind} day={day} />
      </Animated.View>
    </TapGestureHandler>
  );
};

export const CalendarDayPressable = memo(
  CalendarDayPressableComponent,
  isEqual
);
