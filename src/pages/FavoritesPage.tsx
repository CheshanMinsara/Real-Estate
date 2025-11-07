import { Link } from 'react-router-dom'

import { PropertyCard } from '../components/properties/PropertyCard.tsx'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { selectFavoriteProperties } from '../store/selectors.ts'
import { toggleFavorite } from '../store/slices/favoritesSlice.ts'

export default function FavoritesPage() {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(selectFavoriteProperties)

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Saved Homes</h1>
          <p className="mt-2 text-slate-600">
            Keep track of the properties you love and schedule tours when you’re ready.
          </p>
        </div>
        <Link
          to="/listings"
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          Browse More Listings
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-700">You haven’t saved any properties yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Explore our listings and tap the heart icon to build your personalized collection.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          ))}
        </div>
      )}
    </div>
  )
}

