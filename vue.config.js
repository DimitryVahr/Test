// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  outputDir: 'dist',
  pwa: {},
  lintOnSave: 'error',
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@common': path.resolve(__dirname, 'src/components/common'),
        '@shared': path.resolve(__dirname, 'src/components/shared'),
        '@ui': path.resolve(__dirname, 'src/components/ui'),
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://vityaz-aero.nutnetdev.ru',
  //       // target: process.env.VUE_APP_API_DEV_HOST,
  //       changeOrigin: true,
  //       // pathRewrite: {
  //       //   '^/api': ''
  //       // }
  //     }
  //   }
  // },
}
