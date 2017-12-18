const pathToRoutes = "./data/routes.json";
const path = require('path')
const glob = require('glob')
const webpack = require('webpack');

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

    require.extensions['.css'] = () => {
      return;
    };

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    return config
  }
}