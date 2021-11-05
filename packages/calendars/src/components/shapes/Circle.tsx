import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import type { Color } from 'react-native-svg';
import type { ViewStyleProp } from '../../types';

export type SvgCircleProps = { color?: Color } & ViewStyleProp;

export const SvgCircle = ({
  color = 'rgba(45, 154, 252, 0.15)',
  style
}: SvgCircleProps) => {
  return (
    <View style={style}>
      <Svg width={38} height={38} viewBox='0 0 38 38' fill='none'>
        <Circle cx={19} cy={19} r={19} fill={color} />
      </Svg>
    </View>
  );
};
