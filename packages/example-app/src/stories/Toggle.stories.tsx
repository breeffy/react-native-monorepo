import { Toggle, ToggleType } from '@breeffy/react-native-ui-elements';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';

const ToggleMeta: ComponentMeta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    onPress: { action: 'pressed the button' }
  },
  args: {
    type: ToggleType.ENABLED
  }
};

export default ToggleMeta;

type ToggleStory = ComponentStory<typeof Toggle>;

export const Basic: ToggleStory = args => (
  <Toggle {...args} style={{ backgroundColor: 'orange' }} />
);
