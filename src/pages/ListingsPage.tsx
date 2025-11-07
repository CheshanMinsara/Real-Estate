import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { List, Rows4 } from 'lucide-react'

import { PropertyCard } from '../components/properties/PropertyCard.tsx'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import {
  resetFilters,
  setBathrooms,
  setBedrooms,
  setPriceRange,
  setQuery,
  setSortBy,
  toggleCity,
  togglePropertyType,
  toggleStatus,
} from '../store/slices/filtersSlice.ts'
import { selectCities, selectFavoriteIds, selectFilteredProperties } from '../store/selectors.ts'
import { toggleFavorite } from '../store/slices/favoritesSlice.ts'
import type { FiltersState } from '../types/filters.ts'
import type { Property, PropertyStatus, PropertyType } from '../types/property.ts'

const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
] satisfies { value: PropertyType; label: string }[]

const STATUS_OPTIONS = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
] satisfies { value: PropertyStatus; label: string }[]

const BEDROOM_OPTIONS = [
  { value: null, label: 'Any' },
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 5, label: '5+' },
]

const BATHROOM_OPTIONS = BEDROOM_OPTIONS

const PAGE_SIZE = 6

export default function ListingsPage() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)
  const properties = useAppSelector(selectFilteredProperties)
  const cities = useAppSelector(selectCities)
  const favorites = useAppSelector(selectFavoriteIds)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState<string>(filters.query)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setSearchTerm(filters.query)
  }, [filters.query])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      dispatch(setQuery(searchTerm))
    }, 250)

    return () => window.clearTimeout(handle)
  }, [dispatch, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(properties.length / PAGE_SIZE))
  const paginatedProperties = useMemo<Property[]>(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return properties.slice(start, start + PAGE_SIZE)
  }, [currentPage, properties])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Find Your Ideal Property</h1>
          <p className="mt-2 text-slate-500">
            Browse curated listings across premier cities. Fine-tune filters to match your lifestyle and investment
            goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
          >
            <Rows4 className="h-4 w-4" /> Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${viewMode === 'list' ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
          >
            <List className="h-4 w-4" /> List
          </button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <label htmlFor="search" className="text-sm font-semibold text-slate-600">
              Search
            </label>
            <input
              id="search"
              type="search"
              placeholder="City, neighborhood, address"
              value={searchTerm}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600">Property Type</p>
            <div className="flex flex-col gap-2">
              {PROPERTY_TYPES.map((type) => {
                const checked = filters.propertyTypes.includes(type.value)
                return (
                  <label key={type.value} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => dispatch(togglePropertyType(type.value))}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    {type.label}
                  </label>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600">Status</p>
            <div className="flex flex-col gap-2">
              {STATUS_OPTIONS.map((status) => {
                const checked = filters.status.includes(status.value)
                return (
                  <label key={status.value} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => dispatch(toggleStatus(status.value))}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    {status.label}
                  </label>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600">Price Range</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                value={filters.priceRange[0]}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  dispatch(setPriceRange([Number(event.target.value) || 0, filters.priceRange[1]]))
                }
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                type="number"
                min={0}
                value={filters.priceRange[1]}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    setPriceRange([
                      filters.priceRange[0],
                      Number(event.target.value) || filters.priceRange[0],
                    ]),
                  )
                }
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Bedrooms</label>
              <select
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={filters.bedrooms ?? ''}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  dispatch(setBedrooms(event.target.value ? Number(event.target.value) : null))
                }
              >
                {BEDROOM_OPTIONS.map((option) => (
                  <option key={option.label} value={option.value ?? ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Bathrooms</label>
              <select
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={filters.bathrooms ?? ''}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  dispatch(setBathrooms(event.target.value ? Number(event.target.value) : null))
                }
              >
                {BATHROOM_OPTIONS.map((option) => (
                  <option key={option.label} value={option.value ?? ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600">Cities</p>
            <div className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-2">
              {cities.map((city) => (
                <label key={city} className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={filters.cities.includes(city)}
                    onChange={() => dispatch(toggleCity(city))}
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  {city}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-600">Sort by</label>
            <select
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={filters.sortBy}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                dispatch(setSortBy(event.target.value as FiltersState['sortBy']))
              }
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Size: Largest</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light"
              onClick={() => dispatch(resetFilters())}
            >
              Reset Filters
            </button>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
            >
              Save Search
            </button>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {paginatedProperties.length} of {properties.length} properties
            </p>
          </div>

          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
                : 'flex flex-col divide-y divide-slate-200 overflow-hidden rounded-3xl bg-white'
            }
          >
            {paginatedProperties.map((property) => (
              <div
                key={property.id}
                className={
                  viewMode === 'list'
                    ? 'p-4 transition hover:bg-slate-50'
                    : ''
                }
              >
                <PropertyCard
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <span>{currentPage}</span>
              <span className="text-slate-400">/</span>
              <span>{totalPages}</span>
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

