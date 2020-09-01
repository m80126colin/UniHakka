export type UniHakkaInformation  = string
export type UniHakkaPUAChar      = string
export type UniHakkaUnicode      = string
export type UniHakkaCNS11643Char = string

export interface UniHakkaTSVRow {
  pua : UniHakkaPUAChar | UniHakkaCNS11643Char
  unicode: UniHakkaUnicode
  description: UniHakkaInformation
}