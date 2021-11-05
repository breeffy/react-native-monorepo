import { memo, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { usePrevious } from '@breeffy/hooks';
import { Svg, Rect, Circle } from 'react-native-svg';
import isEqual from 'fast-deep-equal';
import type {
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
  StyleProp
} from 'react-native';

export enum ToggleType {
  ENABLED,
  DISABLED
}

export type ToggleProps = {
  type?: ToggleType;
  onPress?: TouchableOpacityProps['onPress'];
  onLayout?: ViewProps['onLayout'];
  style?: StyleProp<ViewStyle>;
};

interface ToggleValuesForAnimation {
  knobPosition: number;
  backgroundColor: string;
}

const getToggleValuesForAnimation = (
  type: ToggleType
): ToggleValuesForAnimation => {
  switch (type) {
    case ToggleType.DISABLED:
      return {
        knobPosition: 14.5,
        backgroundColor: 'rgba(224, 230, 235, 1)'
      };

    case ToggleType.ENABLED:
      return {
        knobPosition: 33.5,
        backgroundColor: 'rgba(45, 154, 252, 1)'
      };
  }
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ToggleComponent = ({
  type = ToggleType.ENABLED,
  style,
  onPress,
  ...otherProps
}: ToggleProps) => {
  const prevType = usePrevious(type) ?? type;
  const progressRef = useRef(0);
  const [progress] = useState(() => new Animated.Value(0));

  progress.addListener(({ value }) => {
    progressRef.current = value;
  });

  const { knobPosition, backgroundColor } = useMemo(() => {
    progress.setValue(1 - progressRef.current);
    const to = getToggleValuesForAnimation(type);
    const from = getToggleValuesForAnimation(prevType);

    return {
      knobPosition: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [from.knobPosition, to.knobPosition]
      }),
      backgroundColor: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [from.backgroundColor, to.backgroundColor]
      })
    };
  }, [type, prevType, progress]);

  useMemo(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      <Svg
        width={48}
        height={29}
        viewBox='0 0 48 29'
        fill='none'
        style={style}
        onPress={onPress}
        {...otherProps}
      >
        <AnimatedRect width={48} height={29} rx={14.5} fill={backgroundColor} />
        <AnimatedCircle cx={knobPosition} cy={14.5} r={10.5} fill='#fff' />
      </Svg>
    </>
  );
};

export const Toggle = memo(ToggleComponent, isEqual);
