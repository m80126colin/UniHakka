import { formatTSV } from './tool';
import {
  UniHakkaInspector,
  UniHakkaInspectorOptions
} from './Inspector';
import {
  UniHakkaPUAChar,
  UniHakkaCNS11643Char,
  UniHakkaUnicode,
  UniHakkaInformation
} from './types';

import table from '@/data/table.tsv';
import cns   from '@/data/cns11643.tsv';

interface UniHakkaBlockTest {
  regex : RegExp
  info : UniHakkaInformation
}
const unicodeBlock : UniHakkaBlockTest[] = [
  { regex: /^[\u{E000}-\u{F8FF}]$/u, info: '私用區 Private Use Area' },
  { regex: /^[\u{F0000}-\u{FFFFF}]$/u, info: '補充私人使用區-A' }
]

class UniHakka {
  // types
  puaToUnicode : Map<UniHakkaPUAChar | UniHakkaCNS11643Char, UniHakkaUnicode>
  unicodeToCNS11643 : Map<UniHakkaUnicode, UniHakkaCNS11643Char>
  puaInfo : Map<UniHakkaPUAChar | UniHakkaCNS11643Char, UniHakkaInformation>
  /**
   * @constructor
   */
  constructor() {
    let hakka = this
    hakka.puaToUnicode      = new Map()
    hakka.unicodeToCNS11643 = new Map()
    hakka.puaInfo           = new Map()
    // process table.tsv
    const [ x, ...tableRows ] = formatTSV(table)
    tableRows.map(({ pua, unicode, description }) => {
      hakka.puaToUnicode.set(pua, unicode)
      hakka.unicodeToCNS11643.set(unicode, unicode)
      hakka.puaInfo.set(pua, description)
    })
    // process cns11643.tsv
    const [ y, ...cnsRows ] = formatTSV(cns)
    cnsRows.map(({ pua, unicode, description }) => {
      hakka.puaToUnicode.set(pua, unicode)
      hakka.unicodeToCNS11643.set(unicode, pua)
      hakka.puaInfo.set(pua, description)
    })
  }
  /**
   * @private
   */
  extractPUA(chr : string) : UniHakkaInspectorOptions | false {
    const hakka = this
    if (hakka.puaInfo.has(chr)) {
      return {
        toUnicode: hakka.puaToUnicode.get(chr),
        info: hakka.puaInfo.get(chr)
      }
    }
    for (let { regex, info } of unicodeBlock)
      if (regex.test(chr))
        return { info }
    return false
  }
  /**
   * @public
   * @param text text written in Hakka Characters
   */
  inspect(text : string) : UniHakkaInspector[] {
    const hakka = this
    const arr = [...text]
    // collection
    const collection = arr.reduce<Map<string, UniHakkaInspector>>(
      (prev, chr, index) => {
        const ox = hakka.extractPUA(chr)
        if (!ox)
          return prev
        const key = chr.codePointAt(0).toString(16)
        if (!prev.has(key))
          prev.set(key, new UniHakkaInspector(chr, ox))
        prev.get(key).addPosition(index)
        return prev
      },
      new Map())
    // result
    return Array.from(collection).map(([x, inspect]) => inspect)
  }
  /**
   * @public
   */
  convert(text : string, { mode = 'unicode' } = {}) : string {
    const hakka = this
    const unicodizeText = ([...text]).map(chr => {
      if (hakka.puaToUnicode.has(chr))
        return hakka.puaToUnicode.get(chr)
      return chr
    })
    if ('cns' === mode || 'cns11643' === mode)
      return unicodizeText.map(chr => {
        if (hakka.unicodeToCNS11643.has(chr))
          return hakka.unicodeToCNS11643.get(chr)
        return chr
      }).join('')
    return unicodizeText.join('')
  }
};

export default UniHakka