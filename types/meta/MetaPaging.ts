import type { MetaCursors } from '.'

export default interface MetaPaging {
  cursors: MetaCursors
  previous?: string
  next?: string
}
