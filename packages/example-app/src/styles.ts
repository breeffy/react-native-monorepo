import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  text: {
    fontSize: 28,
    fontWeight: '600'
  },
  platformRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  platformValue: {
    fontSize: 28,
    fontWeight: '500'
  },
  platformBackground: {
    backgroundColor: '#ececec',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d4d4d4',
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center'
  }
});
