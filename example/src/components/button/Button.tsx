import React, { ComponentProps, useEffect, useMemo, useRef } from 'react';
import {
  TouchableOpacityProps,
  Animated,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { usePrevious } from '../../hooks';
import type { View } from 'react-native';

type ButtonStyle = Pick<ComponentProps<typeof View>, 'style'>;

export enum ButtonType {
  ENABLED,
  DISABLED,
  SECONDARY,
  ERRONEOUS
}

export type ButtonProps = {
  type?: ButtonType;
  label?: string;
  animationDuration?: number;
  onPress?: TouchableOpacityProps['onPress'];
} & ButtonStyle;

interface ButtonValuesForAnimation {
  textColor: string;
  backgroundColor: string;
}

const getButtonValuesForAnimation = (
  type: ButtonType
): ButtonValuesForAnimation => {
  switch (type) {
    case ButtonType.DISABLED:
      return {
        textColor: 'rgba(68, 82, 95, 0.4)',
        backgroundColor: 'rgba(224, 230, 235, 1)'
      };

    case ButtonType.ENABLED:
      return {
        textColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(45, 154, 252, 1)'
      };

    case ButtonType.SECONDARY:
      return {
        textColor: 'rgba(25, 138, 239, 1)',
        backgroundColor: 'rgba(45, 154, 252, 0.2)'
      };

    case ButtonType.ERRONEOUS:
      return {
        textColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(243, 106, 97, 1)'
      };
  }
};

export const Button = ({
  type = ButtonType.ENABLED,
  label,
  animationDuration = 0,
  style,
  onPress
}: ButtonProps) => {
  const prevType = usePrevious(type) ?? type;
  const isButtonDisabled = type === ButtonType.DISABLED;
  const progress = useRef(new Animated.Value(0)).current;

  const { textColor, backgroundColor } = useMemo(() => {
    const to = getButtonValuesForAnimation(type);
    const from = getButtonValuesForAnimation(prevType);

    return {
      textColor: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [from.textColor, to.textColor]
      }),
      backgroundColor: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [from.backgroundColor, to.backgroundColor]
      })
    };
  }, [type, prevType, progress]);

  useEffect(() => {
    if (prevType !== type) {
      Animated.timing(progress, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false
      }).start((animationResult) => {
        if (animationResult.finished) {
          progress.resetAnimation();
        }
      });
    }
  }, [type, prevType, progress, animationDuration]);

  const backgroundStyle = useMemo(
    () => [styles.viewStyle, style, { backgroundColor }],
    [style, backgroundColor]
  );
  const labelStyle = useMemo(() => [styles.labelStyle, { color: textColor }], [
    textColor
  ]);

  return (
    <TouchableOpacity onPress={onPress} disabled={isButtonDisabled}>
      <Animated.View style={backgroundStyle}>
        {label && <Animated.Text style={labelStyle}>{label}</Animated.Text>}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  labelStyle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 19,
    textAlign: 'center',
    textAlignVertical: 'top'
  }
});
