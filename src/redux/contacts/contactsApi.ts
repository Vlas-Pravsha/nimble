import { baseApi } from '../shared/api'

export const contactsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts?sort=created:desc',
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),
    getContact: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    createContact: builder.mutation({
      query: (newContact) => ({
        url: '/contact',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        'Contacts',
        { type: 'Contact', id },
      ],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactsApi
