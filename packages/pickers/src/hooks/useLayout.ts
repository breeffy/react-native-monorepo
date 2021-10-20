import { useMemo } from 'react';
import { PixelRatio } from 'react-native';

interface Props {
  mode: 'horizontal' | 'vertical';
  width: number;
  height: number;
}

export const useLayout = ({ mode, width, height }: Props) => {
  const layout = useMemo(() => {
    if (mode === 'horizontal') {
      const roundedWidth = PixelRatio.roundToNearestPixel(width);
      return {
        width: roundedWidth,
        height: height
      };
    } else {
      const roundedHeight = PixelRatio.roundToNearestPixel(height);
      return {
        width: width,
        height: roundedHeight
      };
    }
  }, [mode, width, height]);
  return layout;
};
