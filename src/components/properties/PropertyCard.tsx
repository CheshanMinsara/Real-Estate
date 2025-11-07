import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Property } from '../../types/property.ts'
import { formatCurrency } from '../../utils/formatCurrency.ts'

interface PropertyCardProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  showAgent?: boolean
}

export function PropertyCard({ property, isFavorite, onToggleFavorite, showAgent = true }: PropertyCardProps) {
  const propertyTypeLabel = property.propertyType === 'house' ? 'House' : property.propertyType === 'condo' ? 'Condo' : 'Apartment'

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-sky/20 to-sky/5">
        <img
          src={property.images[0] ?? '/images/placeholder-property.jpg'}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite(property.id)}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:scale-110"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-accent text-accent' : 'text-charcoal/60'}`} />
        </button>

        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-cream">
          {propertyTypeLabel}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-charcoal">{property.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-charcoal/70">
          <MapPin className="h-4 w-4" />
          <span>
            {property.city}, {property.address.split(',')[0]}
          </span>
        </div>
        <p className="mt-3 text-2xl font-bold text-primary">
          {formatCurrency(property.price, property.status === 'for-rent')}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-charcoal/70">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" />
            {property.bedrooms} bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            {property.bathrooms} bath
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="h-4 w-4" />
            {property.squareFootage.toLocaleString()} sqft
          </span>
        </div>
        {showAgent && (
          <>
            <div className="my-4 border-t border-sage/30" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-sky/30">
                  {property.agent.avatar ? (
                    <img src={property.agent.avatar} alt={property.agent.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-semibold text-cream">
                      {property.agent.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-charcoal">{property.agent.name}</span>
              </div>
              <Link
                to={`/listings/${property.id}`}
                className="text-sm font-semibold text-accent transition hover:text-accent-light"
              >
                View Details
              </Link>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

