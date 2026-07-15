import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Check from '../models/Check'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/efood/restaurantes/'
  }),
  endpoints: (builder) => ({
    purchase: builder.mutation<any, Check>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const { usePurchaseMutation } = api

export default api
