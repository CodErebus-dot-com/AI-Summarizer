import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const { 
    VITE_SUMMARIZER_BASE_URL: baseUrl, 
    VITE_SUMMARIZER_API_HOST: RAPID_API_HOST,
    VITE_SUMMARIZER_API_KEY: RAPID_API_KEY
} = import.meta.env

// paragraph length
const LENGTH = 3

const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl, 
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', RAPID_API_KEY),
            headers.set('X-RapidAPI-Host', RAPID_API_HOST)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${(encodeURIComponent(params.articleUrl))}&length=${LENGTH}`,
        })
    }),
})

export const articleSlice = {
    [articleApi.reducerPath]: articleApi.reducer
}

export const articleMiddleware = articleApi.middleware

export const { useLazyGetSummaryQuery } = articleApi