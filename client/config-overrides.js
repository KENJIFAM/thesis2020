const { fixBabelImports, override } = require('customize-cra');

module.exports = override(
  fixBabelImports('core', {
    libraryName: '@material-ui/core',
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  }),
  fixBabelImports('icons', {
    libraryName: '@material-ui/icons',
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  }),
);
