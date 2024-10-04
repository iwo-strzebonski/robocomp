import type { H3Error } from 'h3'
import type { MetaAlbum, MetaAlbumsData, MetaArray } from '~/types/meta'

const runtimeConfig = useRuntimeConfig()

export interface AlbumResponse {
  data: MetaArray<MetaAlbum>['data']
  statusCode: number
}

export default defineEventHandler(async (): Promise<AlbumResponse | H3Error> => {
  try {
    const query = new URLSearchParams({
      fields: 'photos{link,webp_images},name,link',
      access_token: runtimeConfig.META_API_KEY
    })

    const response = await $fetch<MetaAlbumsData>(
      `${runtimeConfig.META_GRAPH_ENDPOINT}/${runtimeConfig.META_GRAPH_VERSION}/${runtimeConfig.ROBOCOMP_PAGE_ID}/albums?${query.toString()}`
    )

    const filtered = response.data.filter((v) => /robocomp/i.test(v.name))
    const mapped = filtered.map((v) => ({
      ...v,
      name: v.name.match(/robocomp (\d{4})/i)![1]
    }))

    const processed = mapped.reduce(
      (acc, v) => {
        const i = acc.findIndex((p) => p.name === v.name)

        if (i === -1) {
          acc.push(v)
        }
        /* else {
        acc[i].photos.data.push(...v.photos.data)
      } */

        return acc
      },
      [] as MetaArray<MetaAlbum>['data']
    )

    return {
      statusCode: 200,
      data: processed
    }
  } catch (error) {
    console.error(error)

    return createError({
      statusCode: 500,
      message: (error as Error).message
    })
  }
})
