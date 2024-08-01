import { baseApi } from '../shared/api'

export const tagsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `/contact/${id}/tags`,
        method: 'PUT',
        body: { tags },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
})

export const { useAddTagsMutation } = tagsApi
