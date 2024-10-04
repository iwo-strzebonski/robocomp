import type { MetaPaging } from '.'

export default interface MetaArray<T> {
  data: T[]
  paging: MetaPaging
}
