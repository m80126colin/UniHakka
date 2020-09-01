import { UniHakkaTSVRow } from './types';
/**
 * Format data row from `*.tsv` file.
 */
export const formatTSV = (text : string) : UniHakkaTSVRow[] => text.split(/\r?\n/)
  .map(line => {
    const [ pua, unicode, description ] = line.trim().split('\t')
    return { pua, unicode, description }
  })