import { ComponentProps, useMemo } from 'react';
import { useAppContext } from '../../hooks';
import { styles } from './styles';
import type { View } from 'react-native';

export type ContainerStyle = ComponentProps<typeof View>['style'];

export const useContainerStyle = (style?: ContainerStyle) => {
  const { theme } = useAppContext();
  const containerStyle: ContainerStyle = useMemo(() => {
    return [
      styles.container,
      style,
      {
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.9)'
      }
    ];
  }, [style, theme]);
  return containerStyle;
};
