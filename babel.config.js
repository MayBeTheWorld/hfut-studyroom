// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'nerv',
        ts: true,
        targets: {
          ios: '12',
          android: '8'
        }
      }
    ]
  ]
}
