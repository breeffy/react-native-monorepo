import { StyleSheet } from 'react-native';
import { Layout } from '@breeffy/elements';
import { Icon } from '@breeffy/icons';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';
import type { IconProps } from '@breeffy/icons';

const Settings = Object.freeze({
  gap: 20
});

const styles = StyleSheet.create({
  rowLayout: { flexDirection: 'row', justifyContent: 'center' }
});

const IconMeta: ComponentMeta<typeof Icon> = {
  title: 'Icon',
  component: Icon
};

export default IconMeta;

type IconStory = ComponentStory<typeof Icon>;

export const IconBasic: IconStory = _args => (
  <Layout gap={20} style={{ flexDirection: 'column' }}>
    <Layout<IconProps> gap={Settings.gap} style={styles.rowLayout}>
      <Icon icon={['far', 'address-book']} />
      <Icon icon={['far', 'calendar-plus']} />
      <Icon icon={['far', 'circle-check']} />
      <Icon icon={['far', 'file-image']} />
    </Layout>
    <Layout<IconProps>
      gap={Settings.gap}
      style={styles.rowLayout}
      childProps={{ size: 22 }}
    >
      <Icon icon={['far', 'address-book']} />
      <Icon icon={['far', 'calendar-plus']} />
      <Icon icon={['far', 'circle-check']} />
      <Icon icon={['far', 'file-image']} />
    </Layout>
    <Layout<IconProps>
      gap={Settings.gap}
      style={styles.rowLayout}
      childProps={{ size: 26 }}
    >
      <Icon icon={['far', 'address-book']} />
      <Icon icon={['far', 'calendar-plus']} />
      <Icon icon={['far', 'circle-check']} />
      <Icon icon={['far', 'file-image']} />
    </Layout>
    <Layout<IconProps>
      gap={Settings.gap}
      style={styles.rowLayout}
      childProps={{ size: 26 }}
    >
      <Icon icon={['far', 'address-book']} color='red' />
      <Icon icon={['far', 'calendar-plus']} color='green' />
      <Icon icon={['far', 'circle-check']} color='orange' />
      <Icon icon={['far', 'file-image']} color='blue' />
    </Layout>
    <Layout<IconProps>
      gap={Settings.gap}
      style={styles.rowLayout}
      childProps={{ size: 36, color: 'orange' }}
    >
      <Icon icon={['fad', 'acorn']} />
      <Icon icon={['fad', 'acorn']} secondaryOpacity={0.8} />
      <Icon
        icon={['fad', 'acorn']}
        color='green'
        secondaryColor='orange'
        secondaryOpacity={0.8}
      />
      <Icon
        icon={['fad', 'acorn']}
        secondaryColor='green'
        secondaryOpacity={0.8}
      />
    </Layout>
  </Layout>
);

IconBasic.storyName = 'all';
