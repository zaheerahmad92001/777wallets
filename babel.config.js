// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve("expo-router/babel"), // ✅ needed for expo-router
      "react-native-reanimated/plugin",     // ✅ needed for drawer animations
    ],
  };
};
