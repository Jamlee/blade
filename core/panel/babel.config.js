module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // 使用  babel-plugin-component 按需导入模块
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
