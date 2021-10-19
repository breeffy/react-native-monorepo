import { Toggle, ToggleType } from '@breeffy/elements';
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

const Template: ToggleStory = args => <Toggle {...args} />;

export const ToggleOn: ToggleStory = Template.bind({});
ToggleOn.args = { ...ToggleMeta.args, type: ToggleType.ENABLED };
ToggleOn.storyName = 'on';

export const ToggleOff: ToggleStory = Template.bind({});
ToggleOff.args = { ...ToggleMeta.args, type: ToggleType.DISABLED };
ToggleOff.storyName = 'off';
