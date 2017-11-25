const pathToRoutes = "./data/routes.json";

module.exports = {
  exportPathMap: function () {
    var fs = require('fs')

    try {
      var data = fs.readFileSync(pathToRoutes, 'utf8');
      let convertedRoutes = JSON.parse(data);
      return convertedRoutes;
    } catch (e) {
      console.log('Error:', e.stack);
    }
  },

  webpack: (config, { buildId, dev }) => {
    require.extensions['.css'] = () => {
      return;
    };

    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/
      })

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
}