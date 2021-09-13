import { useMemoOne } from 'use-memo-one';
import { itemsDistance } from '../pickers/utils';
import type { ItemPickerProps } from '../pickers/ItemPicker';

interface Props<T = any> {
  scrollMode: ItemPickerProps<T>['scrollMode'];
  itemsLength: number;
  itemSize: number;
  separatorSize: number;
}

export const usePagination = ({
  scrollMode,
  itemsLength,
  itemSize,
  separatorSize
}: Props) => {
  const pagination = useMemoOne(() => {
    const intervalSize = itemsDistance(itemSize, separatorSize);
    const offsets = Array.from(
      { length: itemsLength },
      (_, i) => i * intervalSize
    );

    if (scrollMode === 'oneItem') {
      return {
        disableIntervalMomentum: true,
        snapToOffsets: offsets
      };
    } else if (scrollMode === 'multipleItems') {
      return {
        disableIntervalMomentum: false,
        snapToOffsets: offsets
      };
    } else {
      return {};
    }
  }, [scrollMode, itemSize, separatorSize]);
  return pagination;
};
