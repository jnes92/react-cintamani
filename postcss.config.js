module.exports = {
    plugins: [
      require('postcss-easy-import'),
      require('postcss-cssnext'),
      require("postcss-url"),
      require("cssnano"),
      require("postcss-reporter")
    ]
  }