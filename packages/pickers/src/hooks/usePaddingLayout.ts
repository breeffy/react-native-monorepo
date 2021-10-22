import { useMemo } from 'react';
import { PixelRatio } from 'react-native';

interface Props {
  mode: 'horizontal' | 'vertical';
  containerWidth: number;
  containerHeight: number;
  itemWidth: number;
  itemHeight: number;
}

export const usePaddingLayout = ({
  mode,
  containerWidth,
  containerHeight,
  itemWidth,
  itemHeight
}: Props) => {
  const paddingLayout = useMemo(() => {
    if (mode === 'horizontal') {
      const width = PixelRatio.roundToNearestPixel(
        (containerWidth - itemWidth) / 2
      );
      return {
        width: width,
        height: itemHeight
      };
    } else {
      const height = PixelRatio.roundToNearestPixel(
        (containerHeight - itemHeight) / 2
      );
      return {
        width: itemWidth,
        height: height
      };
    }
  }, [mode, itemWidth, itemHeight]);
  return paddingLayout;
};
