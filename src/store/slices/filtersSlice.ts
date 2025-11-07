import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { FiltersState } from '../../types/filters.ts'
import type { PropertyStatus, PropertyType } from '../../types/property.ts'

const initialState: FiltersState = {
  query: '',
  cities: [],
  propertyTypes: [],
  status: [],
  priceRange: [0, 200_000_000],
  bedrooms: null,
  bathrooms: null,
  sortBy: 'newest',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload
    },
    toggleCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      state.cities = state.cities.includes(city)
        ? state.cities.filter((c) => c !== city)
        : [...state.cities, city]
    },
    setPropertyTypes: (state, action: PayloadAction<PropertyType[]>) => {
      state.propertyTypes = action.payload
    },
    togglePropertyType: (state, action: PayloadAction<PropertyType>) => {
      const type = action.payload
      state.propertyTypes = state.propertyTypes.includes(type)
        ? state.propertyTypes.filter((t) => t !== type)
        : [...state.propertyTypes, type]
    },
    setStatuses: (state, action: PayloadAction<PropertyStatus[]>) => {
      state.status = action.payload
    },
    toggleStatus: (state, action: PayloadAction<PropertyStatus>) => {
      const status = action.payload
      state.status = state.status.includes(status)
        ? state.status.filter((s) => s !== status)
        : [...state.status, status]
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setBedrooms: (state, action: PayloadAction<number | null>) => {
      state.bedrooms = action.payload
    },
    setBathrooms: (state, action: PayloadAction<number | null>) => {
      state.bathrooms = action.payload
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const {
  setQuery,
  setCities,
  toggleCity,
  setPropertyTypes,
  togglePropertyType,
  setStatuses,
  toggleStatus,
  setPriceRange,
  setBedrooms,
  setBathrooms,
  setSortBy,
  resetFilters,
} = filtersSlice.actions

export const filtersReducer = filtersSlice.reducer

