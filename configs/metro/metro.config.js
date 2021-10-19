/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const EXCLUSION_LIST = 'metro-config/src/defaults/exclusionList';
const MONOREPO_TOOLS = 'react-native-monorepo-tools';
const ASSETS_RESOLUTION_FIX = path.join(
  MONOREPO_TOOLS,
  'src/get-metro-android-assets-resolution-fix'
);

const loadMetroConfig = configPath => {
  const loadModule = relativeModulePath => {
    const fullModulePath = require.resolve(relativeModulePath, {
      paths: [configPath]
    });
    return require(fullModulePath);
  };

  const exclusionList = loadModule(EXCLUSION_LIST);
  const { getMetroTools } = loadModule(MONOREPO_TOOLS);
  const getMetroAndroidAssetsResolutionFix = loadModule(ASSETS_RESOLUTION_FIX);

  const monorepoMetroTools = getMetroTools();
  const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

  const metroOptions = ['react-native', 'main'];
  const devModeOptions = ['devmode'];
  const storyBookOptions = ['sbmodern', 'browser'];

  const defaultOptions = storyBookOptions.concat(metroOptions);

  const isDevMode = process.env.MODE === 'dev';
  const resolverOptions = isDevMode
    ? { resolverMainFields: devModeOptions.concat(defaultOptions) }
    : { resolverMainFields: defaultOptions };

  return {
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
      ...resolverOptions,
      blockList: exclusionList(monorepoMetroTools.blockList),
      extraNodeModules: monorepoMetroTools.extraNodeModules
    }
  };
};

module.exports = loadMetroConfig;
