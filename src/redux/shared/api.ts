import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl =
  'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1'
const API_KEY = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'

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
