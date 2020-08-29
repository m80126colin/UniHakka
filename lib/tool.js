const fs = require('fs')
const path = require('path')

/**
 * @typedef {import('./index')} UniHakka
 * @typedef {import('./Inspector').InspectorArgument} InspectorArgument
 * @typedef {import('./index').UniHakkaRow} UniHakkaRow
 * @typedef {import('./index').UniHakkaInformation} UniHakkaInformation
 */

/**
 * Read data from tsv.
 * @param {Array.<string>} pathArray 
 * @returns {Array.<UniHakkaRow>}
 */
const readTsv = (...pathArray) => {
  const file = path.normalize(path.join(...pathArray))
  const [x, ...rows] = fs.readFileSync(file, 'utf-8').split(/\r?\n/)
  return rows.map(line => {
    const [pua, unicode, description] = line.split('\t')
    return { pua, unicode, description }
  })
}

/**
 * @typedef {Object} UniHakkaBlockTest
 * @property {RegExp} regex
 * @property {UniHakkaInformation} info
 */
/** @type {Array.<UniHakkaBlockTest>} */
const unicodeBlock = [
  { regex: /^[\u{E000}-\u{F8FF}]$/u, info: '私用區 Private Use Area' },
  { regex: /^[\u{F0000}-\u{FFFFF}]$/u, info: '補充私人使用區-A' }
]

/**
 * @param {string} chr 
 * @param {UniHakka} uniHakka 
 * @returns {false | InspectorArgument}
 */
const isPUA = (chr, uniHakka) => {
  if (chr in uniHakka.puaInfo) {
    return {
      toUnicode: uniHakka.puaToUnicode[chr],
      info: uniHakka.puaInfo[chr]
    }
  }
  for (let key in unicodeBlock) {
    const { regex, info } = unicodeBlock[key]
    if (regex.test(chr))
      return { info }
  }
  return false
}

module.exports = {
  isPUA,
  readTsv
}