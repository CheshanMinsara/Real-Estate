import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from './index.ts'

const selectProperties = (state: RootState) => state.properties.items
const selectFilters = (state: RootState) => state.filters
const selectFavorites = (state: RootState) => state.favorites.ids

export const selectFilteredProperties = createSelector(
  [selectProperties, selectFilters],
  (properties, filters) => {
    return properties
      .filter((property) => {
        const matchesQuery = filters.query
          ? property.title.toLowerCase().includes(filters.query.toLowerCase()) ||
            property.city.toLowerCase().includes(filters.query.toLowerCase()) ||
            property.address.toLowerCase().includes(filters.query.toLowerCase())
          : true

        const matchesCity = filters.cities.length === 0 || filters.cities.includes(property.city)
        const matchesType =
          filters.propertyTypes.length === 0 || filters.propertyTypes.includes(property.propertyType)
        const matchesStatus = filters.status.length === 0 || filters.status.includes(property.status)
        const withinPrice =
          property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
        const matchesBedrooms = filters.bedrooms ? property.bedrooms >= filters.bedrooms : true
        const matchesBathrooms = filters.bathrooms ? property.bathrooms >= filters.bathrooms : true

        return (
          matchesQuery &&
          matchesCity &&
          matchesType &&
          matchesStatus &&
          withinPrice &&
          matchesBedrooms &&
          matchesBathrooms
        )
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'size-desc':
            return b.squareFootage - a.squareFootage
          case 'newest':
          default:
            return b.yearBuilt && a.yearBuilt ? b.yearBuilt - a.yearBuilt : 0
        }
      })
  },
)

export const selectFavoriteIds = selectFavorites

export const selectFavoriteProperties = createSelector(
  [selectProperties, selectFavorites],
  (properties, favorites) => properties.filter((property) => favorites.includes(property.id)),
)

export const selectCities = createSelector([selectProperties], (properties) =>
  Array.from(new Set(properties.map((property) => property.city))).sort(),
)

export const selectStats = createSelector([selectProperties], (properties) => {
  const totalListings = properties.length
  const totalCities = new Set(properties.map((property) => property.city)).size
  const totalAgents = new Set(properties.map((property) => property.agent.id)).size

  return {
    totalListings,
    totalCities,
    totalAgents,
  }
})

