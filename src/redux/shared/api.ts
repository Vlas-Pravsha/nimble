import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      headers.set('Authorization', `Bearer ${API_KEY}`)
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Contacts', 'Contact'],
})
