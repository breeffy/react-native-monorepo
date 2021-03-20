import React from 'react';
import { View } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import type { Color, NumberProp } from 'react-native-svg';
import type { ViewStyleProp } from '../../types';

export type SvgLineProps = {
  color?: Color;
  width?: NumberProp;
} & ViewStyleProp;

export const SvgLine = ({
  color = 'rgba(68, 82, 95, 0.1)',
  width = 1,
  style
}: SvgLineProps) => (
  <View style={style}>
    <Svg width={'100%'} height={1} fill="none">
      <Line
        x1={0}
        y1={0}
        x2={'100%'}
        y2={0}
        stroke={color}
        strokeWidth={width}
      />
    </Svg>
  </View>
);
