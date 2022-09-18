const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {
  return [
    {
      entry: './src/bootstrap.js',
      output: {
        path:path.resolve(__dirname, "dist"),
      },
      module: {
        rules: [
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[hash]-[name].[ext]',
                },
              },
            ],
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
          meta: {
            "Content-Security-Policy": { 'http-equiv': 'Content-Security-Policy', 'content': (argv.mode == 'development') ? "default-src 'self' http://127.0.0.1:3001 https://127.0.0.1:3002; script-src 'self' 'unsafe-eval'; style-src * 'unsafe-inline'" : "default-src 'self' http://127.0.0.1:3001 https://127.0.0.1:3002; script-src 'self'; style-src * 'unsafe-inline'" },
          },
        }),
      ],
    },
    {
      entry: './src/preload.js',
      target: 'electron-preload',
      output: {
        path:path.resolve(__dirname, "dist"),
        filename: "preload.js",
      },
    }
  ]
};
