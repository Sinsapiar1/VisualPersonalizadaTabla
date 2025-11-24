const path = require('path');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  
  return {
    mode: mode,
    entry: './src/visual.ts',
    devtool: false,
    output: {
      path: path.resolve(__dirname, '.tmp/drop'),
      filename: 'visual.js'
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
      'powerbi-visuals-api': '{}'
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('WrapVisualPlugin', () => {
            const fs = require('fs');
            const visualPath = path.resolve(__dirname, '.tmp/drop/visual.js');
            let content = fs.readFileSync(visualPath, 'utf8');
            
            const wrapped = `
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var MatrixSuprema2025A1B2C3D4E5F6;
            (function (MatrixSuprema2025A1B2C3D4E5F6) {
${content}
                if (typeof Visual !== 'undefined') {
                    MatrixSuprema2025A1B2C3D4E5F6.Visual = Visual;
                }
            })(MatrixSuprema2025A1B2C3D4E5F6 = visual.MatrixSuprema2025A1B2C3D4E5F6 || (visual.MatrixSuprema2025A1B2C3D4E5F6 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
`;
            
            fs.writeFileSync(visualPath, wrapped);
          });
        }
      }
    ]
  };
};
