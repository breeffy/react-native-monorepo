import { ItemPicker } from '../../pickers/ItemPicker';
import type { ComponentProps } from 'react';

export const TimePicker = (props: ComponentProps<typeof ItemPicker>) => {
  return <ItemPicker {...props} />;
};
