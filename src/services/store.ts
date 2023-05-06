import { configureStore } from "@reduxjs/toolkit"
import { articleSlice as reducer, articleMiddleware } from "./article.slice"

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleMiddleware),
})
