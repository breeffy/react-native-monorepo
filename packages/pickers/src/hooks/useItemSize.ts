import { useMemo } from 'react';
import { getCellSize } from '../utils';

interface Props {
  mode: 'horizontal' | 'vertical';
  itemWidth: number;
  itemHeight: number;
}

/**
 * Returns item size along the main axis. Main axis is defined by mode.
 * @param mode How items are layed out relative to each other
 * @param itemWidth width of the item
 * @param itemHeight height of the item
 * @returns size along the main axis (width or height depending on mode)
 */
export const useItemSize = ({ mode, itemWidth, itemHeight }: Props): number => {
  const size = useMemo(() => {
    return getCellSize(mode, itemWidth, itemHeight);
  }, [mode, itemWidth, itemHeight]);
  return size;
};
