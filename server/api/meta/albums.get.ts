const runtimeConfig = useRuntimeConfig()

export interface MetaCursors {
  before: string
  after: string
}

export interface MetaPaging {
  cursors: MetaCursors
  previous?: string
  next?: string
}

export interface MetaArray<T> {
  data: T[]
  paging: MetaPaging
}

export interface MetaPhoto {
  id: string
  link: string
}

export interface MetaAlbum {
  id: string
  name: string
  photos: MetaArray<MetaPhoto>
}

export interface MetaAlbumsResponse extends MetaArray<MetaAlbum> {}

export default defineEventHandler(async () => {
  try {
    const query = new URLSearchParams({
      fields: 'photos{link},name',
      access_token: runtimeConfig.META_API_KEY
    })

    const response = await $fetch<MetaAlbumsResponse>(
      `${runtimeConfig.META_GRAPH_ENDPOINT}/${runtimeConfig.META_GRAPH_VERSION}/${runtimeConfig.ROBOCOMP_PAGE_ID}/albums?${query.toString()}`
    )

    const filtered = response.data.filter((v) => /robocomp/i.test(v.name))
    const mapped = filtered.map((v) => ({
      ...v,
      name: v.name.match(/robocomp (\d{4})/i)![1]
    }))

    const processed = mapped.reduce((acc, v) => {
      const i = acc.findIndex((p) => p.name === v.name)

      if (i === -1) {
        acc.push(v)
      } else {
        acc[i].photos.data.push(...v.photos.data)
      }

      return acc
    }, [] as MetaAlbum[])

    return {
      status: 200,
      data: processed
    }
  } catch (error) {
    return createError({
      statusCode: 500,
      message: (error as Error).message
    })
  }
})
