import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { View } from 'react-native';

export const decorators = [
  Story => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Story />
    </View>
  ),
  withBackgrounds
];
export const parameters = {
  layout: 'centered',
  backgrounds: [
    { name: 'plain', value: 'white', default: true },
    { name: 'warm', value: 'hotpink' },
    { name: 'cool', value: 'deepskyblue' }
  ]
};
