// webpack 配置文件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
console.log(resolve('dev'))
module.exports = {
  mode: 'development', // 当前模式 可以选production devlopment
  devServer: {
    host: 'localhost',
    port: '8888',
    progress: true, // 编译过程是否显示进度条
    compress: true,
    contentBase: './prod',
    open: true,
  },
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'budle.[hash].js', // 打包后的文件名
    path: resolve('prod'), // 必须是绝对路径
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    })
  ]
}