import type { PropertyStatus, PropertyType } from './property.ts'

export interface FiltersState {
  query: string
  cities: string[]
  propertyTypes: PropertyType[]
  status: PropertyStatus[]
  priceRange: [number, number]
  bedrooms: number | null
  bathrooms: number | null
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'size-desc'
}

