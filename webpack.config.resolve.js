const path = require('path');

module.exports = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  alias: {
    '@assets': path.resolve(__dirname, 'src', 'assets'),
    '@libs': path.resolve(__dirname, 'src', 'app', 'libs'),
    '@components': path.resolve(__dirname, 'src', 'app', 'components'),
    '@elements': path.resolve(__dirname, 'src', 'app', 'elements'),
    '@hooks': path.resolve(__dirname, 'src', 'app', 'hooks'),
    '@screens': path.resolve(__dirname, 'src', 'app', 'screens'),
    '@routes': path.resolve(__dirname, 'src', 'app', 'routes'),
    '@models': path.resolve(__dirname, 'src', 'app', 'models'),
    '@configs': path.resolve(__dirname, 'src', 'app', 'configs'),
    '@repositories': path.resolve(__dirname, 'src', 'app', 'repositories'),
  },
};
