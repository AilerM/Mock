'use strict'
Object.defineProperty(exports, '__esModule', {
  value: true
})
import { getData } from '../util'
export default [
  ...getData('project'),
  ...getData('react-bookmarks')
]
module.exports = exports['default']
