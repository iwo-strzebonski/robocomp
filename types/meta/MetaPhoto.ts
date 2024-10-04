import type { MetaImage } from '.'

export default interface MetaPhoto {
  id: string
  link: string
  webp_images: MetaImage[]
}
