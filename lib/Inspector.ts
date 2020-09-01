import {
  UniHakkaInformation,
  UniHakkaUnicode,
  UniHakkaPUAChar
} from './types';

export interface UniHakkaInspectorOptions {
  toUnicode? : UniHakkaUnicode
  info : UniHakkaInformation
}

export class UniHakkaInspector {
  position   : number[]
  original   : UniHakkaPUAChar
  code       : string
  toUnicode? : UniHakkaUnicode
  info       : UniHakkaInformation
  /**
   * @constuctor
   */
  constructor(chr : string, { toUnicode, info } : UniHakkaInspectorOptions) {
    this.position  = []
    this.original  = chr
    this.code      = chr.codePointAt(0).toString(16)
    this.toUnicode = toUnicode
    this.info      = info
  }
  /**
   * @public
   */
  addPosition(index : number) {
    this.position.push(index)
  }
};