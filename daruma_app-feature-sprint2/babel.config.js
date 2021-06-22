module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
        // decoratorsBeforeExport: false,
        version: 'jan-2019',
      },
    ],
    ['@babel/plugin-transform-runtime', { helpers: true }],
  ],
}
