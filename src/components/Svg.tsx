import React from 'react';
import { View } from 'react-native';
import {
  Svg,
  Line as SvgLine,
  Circle as SvgCircle,
  Color,
  NumberProp
} from 'react-native-svg';
import type { ViewStyleProp } from '../types';

export type LineProps = { color?: Color; width?: NumberProp } & ViewStyleProp;

export const Line = ({
  color = 'rgba(68, 82, 95, 0.1)',
  width = 1,
  style
}: LineProps) => (
  <View style={style}>
    <Svg width={'100%'} height={1} fill="none">
      <SvgLine
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

export type CircleProps = { color?: Color } & ViewStyleProp;

export const Circle = ({ color = '#2D9AFC', style }: CircleProps) => {
  return (
    <View style={style}>
      <Svg width={38} height={38} viewBox="0 0 38 38" fill="none">
        <SvgCircle opacity={0.15} cx={19} cy={19} r={19} fill={color} />
      </Svg>
    </View>
  );
};
