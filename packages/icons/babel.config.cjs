module.exports = function (api) {
  api.cache(false);

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      [
        'module:metro-react-native-babel-preset',
        { useTransformReactJSXExperimental: true }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic'
        }
      ]
    ]
  };
};
