import React, { useMemo, useRef, useState } from 'react';
import {
  TouchableOpacityProps,
  Animated,
  ViewProps,
  ViewStyle,
  StyleProp
} from 'react-native';
import { usePrevious } from '../../hooks';
import { Svg, Rect, Circle } from 'react-native-svg';

export enum SwitchType {
  ENABLED,
  DISABLED
}

export type SwitchProps = {
  type?: SwitchType;
  onPress?: TouchableOpacityProps['onPress'];
  onLayout?: ViewProps['onLayout'];
  style?: StyleProp<ViewStyle>;
};

interface SwitcherValuesForAnimation {
  knobPosition: number;
  backgroundColor: string;
}

const getSwitcherValuesForAnimation = (
  type: SwitchType
): SwitcherValuesForAnimation => {
  switch (type) {
    case SwitchType.DISABLED:
      return {
        knobPosition: 14.5,
        backgroundColor: 'rgba(224, 230, 235, 1)'
      };

    case SwitchType.ENABLED:
      return {
        knobPosition: 33.5,
        backgroundColor: 'rgba(45, 154, 252, 1)'
      };
  }
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Switch = ({
  type = SwitchType.ENABLED,
  style,
  onPress,
  ...otherProps
}: SwitchProps) => {
  const prevType = usePrevious(type) ?? type;
  const progressRef = useRef(0);
  const [progress] = useState(() => new Animated.Value(0));

  progress.addListener(({ value }) => {
    progressRef.current = value;
  });

  const { knobPosition, backgroundColor } = useMemo(() => {
    progress.setValue(1 - progressRef.current);
    const to = getSwitcherValuesForAnimation(type);
    const from = getSwitcherValuesForAnimation(prevType);

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
        viewBox="0 0 48 29"
        fill="none"
        style={style}
        onPress={onPress}
        {...otherProps}
      >
        <AnimatedRect width={48} height={29} rx={14.5} fill={backgroundColor} />
        <AnimatedCircle cx={knobPosition} cy={14.5} r={10.5} fill="#fff" />
      </Svg>
    </>
  );
};
