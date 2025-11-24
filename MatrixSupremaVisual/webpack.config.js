const path = require('path');

module.exports = {
  entry: './src/visual.ts',
  output: {
    path: path.resolve(__dirname, '.tmp/drop'),
    filename: 'visual.js',
    libraryTarget: 'window',
    library: {
      name: ['powerbi', 'extensibility', 'visual', 'MatrixSuprema2025A1B2C3D4E5F6'],
      type: 'window'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  externals: {
    'powerbi-visuals-api': 'null'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.tmp/drop')
    },
    compress: true,
    port: 8080
  }
};
