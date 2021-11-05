import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export interface MenuItemProps {
  title: string;
  iconName: string;
  disabled?: boolean;
  style: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const MenuItem = ({
  title,
  iconName,
  disabled = false,
  style,
  onPress
}: MenuItemProps) => {
  return (
    <Pressable
      disabled={disabled}
      style={props => {
        console.log(`${JSON.stringify(props)}`);
        console.log('Cool things!');
        if (disabled) {
          return [{ opacity: 0.3 }, style];
        } else {
          return [{ opacity: props.pressed ? 0.5 : 1.0 }, style];
        }
      }}
      onPress={onPress}
    >
      <View style={[styles.container]}>
        <Text style={styles.title}>{title}</Text>
        <Image
          // @ts-ignore
          source={iconName}
          style={{ width: 50, height: 50 }}
          resizeMode='contain'
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 7,
    borderColor: 'rgba(68, 82, 95, 0.2)',
    borderWidth: 1,
    alignItems: 'center'
  },
  iconWrapper: { padding: 5 },
  title: {
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 10,
    textAlignVertical: 'center',
    marginBottom: 1
  }
});
