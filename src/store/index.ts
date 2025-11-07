import { configureStore } from '@reduxjs/toolkit'

import { favoritesReducer } from './slices/favoritesSlice.ts'
import { filtersReducer } from './slices/filtersSlice.ts'
import { propertiesReducer } from './slices/propertiesSlice.ts'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

