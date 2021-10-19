import { memo, useCallback, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { Toggle, ToggleType } from './Toggle';
import type { ToggleProps } from './Toggle';

type OnPressCallback = NonNullable<ToggleProps['onPress']>;

export type ToggleWithStateProps = Omit<ToggleProps, 'onPress'> & {
  onPress?: (type: ToggleType, prevType: ToggleType) => void;
};

const ToggleWithStateComponent = ({
  type = ToggleType.ENABLED,
  style,
  onPress: _onPress
}: ToggleWithStateProps) => {
  const [toggleType, setToggleType] = useState(type);
  const onPress = useCallback<OnPressCallback>(
    _event => {
      setToggleType(prev => {
        const current =
          prev === ToggleType.ENABLED
            ? ToggleType.DISABLED
            : ToggleType.ENABLED;
        _onPress?.(current, prev);
        return current;
      });
    },
    [_onPress]
  );

  return <Toggle type={toggleType} style={style} onPress={onPress} />;
};

export const ToggleWithState = memo(ToggleWithStateComponent, isEqual);
