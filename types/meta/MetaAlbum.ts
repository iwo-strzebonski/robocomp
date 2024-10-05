import type { MetaArray, MetaPhoto } from '.'

export default interface MetaAlbum {
  id: string
  name: string
  link: string
  photos: MetaArray<MetaPhoto>
}
