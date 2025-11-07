import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { mockProperties } from '../../data/mockProperties.ts'
import type { Property } from '../../types/property.ts'

export interface PropertiesState {
  items: Property[]
}

const initialState: PropertiesState = {
  items: mockProperties,
}

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<Property>) => {
      state.items.push(action.payload)
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.items.findIndex((property) => property.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
  },
})

export const { addProperty, updateProperty } = propertiesSlice.actions
export const propertiesReducer = propertiesSlice.reducer

