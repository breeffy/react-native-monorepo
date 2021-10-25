const { getDefaultConfig } = require('expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

console.log(`------------------ EXPO: ----------------------`);
console.log(`${JSON.stringify(defaultConfig, null, 2)}`);

const monorepoConfig = require('../../configs/metro/metro.config')(module.path);
// monorepoConfig.watchFolders = monorepoConfig.watchFolders.reverse();
console.log(`------------------ MONOREPO: -------------------`);
console.log(`${JSON.stringify(monorepoConfig, null, 2)}`);

defaultConfig.watchFolders = monorepoConfig.watchFolders;
defaultConfig.resolver.extraNodeModules =
  monorepoConfig.resolver.extraNodeModules;
defaultConfig.resolver.resolverMainFields =
  monorepoConfig.resolver.resolverMainFields;

defaultConfig.watchFolders = [
  '/home/me/Breeffy/react-native-monorepo/packages/expo-43/',
  '/home/me/Breeffy/react-native-monorepo/packages/utils/',
  '/home/me/Breeffy/react-native-monorepo/packages/types/',
  '/home/me/Breeffy/react-native-monorepo/packages/types-react-native/',
  '/home/me/Breeffy/react-native-monorepo/packages/pickers/',
  '/home/me/Breeffy/react-native-monorepo/packages/invariants/',
  '/home/me/Breeffy/react-native-monorepo/packages/hooks/',
  '/home/me/Breeffy/react-native-monorepo/packages/elements/',
  '/home/me/Breeffy/react-native-monorepo/packages/calendars/',
  '/home/me/Breeffy/react-native-monorepo/packages/example-app/',
  '/home/me/Breeffy/react-native-monorepo/node_modules'
];

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true
  }
});
module.exports = defaultConfig;
