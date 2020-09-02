declare module '*.tsv' {
  import { UniHakkaTSVRow } from '@/lib/types'

  const data : UniHakkaTSVRow[];
  export default data;
}