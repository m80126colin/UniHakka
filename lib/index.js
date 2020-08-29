const tool = require('./tool')
const Inspector = require('./Inspector')

/**
 * Import class Inspector
 * @typedef {import('./Inspector')} Inspector
 */

/**
 * @typedef {string} UniHakkaInformation
 * @typedef {string} PUAChar
 * @typedef {string} UniHakkaChar
 * @typedef {string} CNS11643Char
 */
/**
 * @typedef {Object} UniHakkaRow
 * @property {PUAChar | CNS11643Char} pua character of Private Use Areas
 * @property {UniHakkaChar} unicode characters of unicode
 * @property {UniHakkaInformation} info information of each row
 */

class UniHakka {
  constructor() {
    let uniHakka = this
    // initialize
    /**
     * @public
     * @type {Object.<string, UniHakkaChar>}
     */
    this.puaToUnicode = {}
    /**
     * @public
     * @type {Object.<string, CNS11643Char>}
     */
    this.unicodeToCNS11643 = {}
    /**
     * @public
     * @type {Object.<string, UniHakkaInformation>}
     */
    this.puaInfo = {}
    // process table.csv
    tool.readTsv(__dirname, '..', 'data', 'table.tsv')
      .forEach(({ pua, unicode, description }) => {
        uniHakka.puaToUnicode[pua] = unicode
        uniHakka.unicodeToCNS11643[unicode] = unicode
        uniHakka.puaInfo[pua] = description
      })
    // process cns11643.tsv
    tool.readTsv(__dirname, '..', 'data', 'cns11643.tsv')
      .forEach(({ pua, unicode, description }) => {
        uniHakka.puaToUnicode[pua] = unicode
        uniHakka.unicodeToCNS11643[unicode] = pua
        uniHakka.puaInfo[pua] = description
      })
  }

  /**
   * @public
   * @param {string} text text written in Hakka Characters
   * @returns {Array.<Inspector>}
   */
  inspect(text) {
    const uniHakka = this
    const arr = [...text]
    // collection
    /** @type {Object.<string, Inspector> }} */
    let collection = {}
    arr.forEach((chr, index) => {
      const key = chr.codePointAt().toString(16)
      if (key in collection) {
        collection[key].addPosition(index)
        return
      }
      const ox = tool.isPUA(chr, uniHakka)
      if (ox) {
        collection[key] = new Inspector(chr, ox)
        collection[key].addPosition(index)
      }
    })
    // result
    /** @type {Array.<Inspector>} */
    let result = []
    for (let key in collection)
      result.push(collection[key])
    return result
  }

  /**
   * @public
   * @param {string} text 
   * @param {{ mode: string }} param1
   */
  convert(text, { mode = 'unicode' } = {}) {
    const uniHakka = this
    const unicodizeText = ([...text]).map(chr => {
      if (chr in uniHakka.puaToUnicode)
        return uniHakka.puaToUnicode[chr]
      return chr
    })
    if ('cns' === mode || 'cns11643' === mode)
      return unicodizeText.map(chr => {
        if (chr in uniHakka.unicodeToCNS11643)
          return uniHakka.unicodeToCNS11643[chr]
        return chr
      }).join('')
    return unicodizeText.join('')
  }
};

module.exports = UniHakka