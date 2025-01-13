/* eslint-disable */
const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@public': path.resolve(__dirname, 'public')
  }),
  addDecoratorsLegacy()
)
