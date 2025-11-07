export type PropertyStatus = 'for-sale' | 'for-rent'

export type PropertyType = 'house' | 'apartment' | 'condo'

export interface AgentInfo {
  id: string
  name: string
  phone: string
  email: string
  avatar?: string
}

export interface Property {
  id: string
  title: string
  price: number
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  squareFootage: number
  propertyType: PropertyType
  status: PropertyStatus
  images: string[]
  description: string
  features: string[]
  agent: AgentInfo
  coordinates: {
    lat: number
    lng: number
  }
  yearBuilt?: number
  lotSize?: number
}

