'use strict'
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'my-electron',
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: './',
  electron: true
}
