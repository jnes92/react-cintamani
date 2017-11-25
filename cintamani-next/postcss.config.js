module.exports = {
    plugins: [
      require('postcss-easy-import')({prefix: '_'}), // keep this first
      require('postcss-cssnext')({ /* ...options */ }),
      require("postcss-url"),
      require("cssnano"),
      require("postcss-browser-reporter"),
      require("postcss-reporter")
    ]
  }