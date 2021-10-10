/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const exclusionList = require('metro-config/src/defaults/exclusionList');
const { getMetroTools } = require('react-native-monorepo-tools');
const getMetroAndroidAssetsResolutionFix = require('react-native-monorepo-tools/src/get-metro-android-assets-resolution-fix');

const monorepoMetroTools = getMetroTools();
const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = {
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  server: {
    enhanceMiddleware: middleware => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    }
  },
  watchFolders: monorepoMetroTools.watchFolders,
  resolver: {
    blockList: exclusionList(monorepoMetroTools.blockList),
    extraNodeModules: monorepoMetroTools.extraNodeModules
  }
};
