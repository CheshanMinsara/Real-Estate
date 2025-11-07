import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FavoritesState {
  ids: string[]
}

const initialState: FavoritesState = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload
      state.ids = state.ids.includes(propertyId)
        ? state.ids.filter((id) => id !== propertyId)
        : [...state.ids, propertyId]
    },
    clearFavorites: () => initialState,
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer

