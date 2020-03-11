module.exports = {
  assetsDir: `./assets`,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
    }
  },
  chainWebpack (config) {
    config.externals({
      vue: 'Vue',
    })
  }
};
