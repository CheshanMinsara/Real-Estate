import { Search, MapPin, ChevronDown, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { PropertyCard } from '../components/properties/PropertyCard.tsx'
import Dropdown from '../components/common/Dropdown'
import { toggleFavorite } from '../store/slices/favoritesSlice.ts'
import {
  resetFilters,
  setPropertyTypes,
  setQuery,
} from '../store/slices/filtersSlice.ts'
import { selectFavoriteIds } from '../store/selectors.ts'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'

type SearchFormValues = {
  search: string
  location: string
  propertyType: string
  price: string
}

export default function HomePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const favorites = useAppSelector(selectFavoriteIds)
  const featuredProperties = useAppSelector((state) => state.properties.items.slice(0, 3))


  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SearchFormValues>({
    defaultValues: {
      search: '',
      location: '',
      propertyType: 'All Types',
      price: 'Any Price',
    },
  })

  const onSubmit = (values: SearchFormValues) => {
    dispatch(resetFilters())
    if (values.search.trim()) {
      dispatch(setQuery(values.search.trim()))
    }
    if (values.location && values.location !== 'Location') {
      dispatch(setQuery(values.location))
    }
    if (values.propertyType && values.propertyType !== 'All Types') {
      const typeMap: Record<string, 'house' | 'apartment' | 'condo'> = {
        House: 'house',
        Apartment: 'apartment',
        Condo: 'condo',
      }
      if (typeMap[values.propertyType]) {
        dispatch(setPropertyTypes([typeMap[values.propertyType]]))
      }
    }
    navigate('/listings')
  }

  // Local labels for dropdown buttons (keeps UI updated when selecting)
  const [locationLabel, setLocationLabel] = useState('Location')
  const [typeLabel, setTypeLabel] = useState('All Types')
  const [priceLabel, setPriceLabel] = useState('Any Price')

  const statsData = useMemo(
    () => [
      { icon: '🏢', label: 'Active Properties', value: '15,420+', color: 'text-blue-600' },
      { icon: '📍', label: 'Cities Covered', value: '250+', color: 'text-blue-600' },
      { icon: '📈', label: 'Successful Sales', value: '8,750+', color: 'text-green-600' },
      { icon: '👥', label: 'Expert Agents', value: '1,200+', color: 'text-orange-600' },
    ],
    [],
  )

  const features = useMemo(
    () => [
      { icon: '🛡️', title: 'Verified Listings', description: 'All properties verified', color: 'text-green-600' },
      { icon: '🕐', title: '24/7 Support', description: 'Always here to help', color: 'text-blue-600' },
      { icon: '🏆', title: 'Award Winning', description: 'Industry recognized', color: 'text-blue-600' },
    ],
    [],
  )

  return (
    <div className="space-y-16 pb-16">
      <section className="relative min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="images/hero-main.jpg"
            alt="Modern minimalist houses with blue sky"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage/40 via-sage/20 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[700px] flex-col items-center justify-center px-6 py-32 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <h1 className="mb-4 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              BUY • SELL • RENT
            </h1>
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">PROPERTIES</h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-12 text-2xl font-semibold sm:text-3xl"
          >
            SRI LANKA
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-full max-w-4xl rounded-2xl bg-cream/95 p-6 shadow-2xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage" />
                <input
                  type="search"
                  placeholder="Search by neighborhood, city, or property features..."
                  className="w-full rounded-xl border border-sage/30 bg-cream py-4 pl-12 pr-4 text-charcoal placeholder:text-sage focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  {...register('search')}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Dropdown
                  trigger={
                    <div className="flex w-full items-center justify-between rounded-xl border border-sage/30 bg-cream px-4 py-3 text-left text-sm text-charcoal hover:border-accent">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{locationLabel}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    {['Colombo', 'Kandy', 'Galle', 'Negombo'].map((city) => (
                      <button
                        type="button"
                        key={city}
                        onClick={() => {
                          setValue('location', city)
                          setLocationLabel(city)
                        }}
                        className="text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                <Dropdown
                  trigger={
                    <div className="flex w-full items-center justify-between rounded-xl border border-sage/30 bg-cream px-4 py-3 text-left text-sm text-charcoal hover:border-accent">
                      <span>{typeLabel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    {['All Types', 'House', 'Apartment', 'Condo'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          setValue('propertyType', t)
                          setTypeLabel(t)
                        }}
                        className="text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                <Dropdown
                  trigger={
                    <div className="flex w-full items-center justify-between rounded-xl border border-sage/30 bg-cream px-4 py-3 text-left text-sm text-charcoal hover:border-accent">
                      <span>{priceLabel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    {['Any Price', 'Under 50,000,000', '50,000,000 - 100,000,000', '100,000,000+'].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => {
                          setValue('price', p)
                          setPriceLabel(p)
                        }}
                        className="text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-primary"
                >
                  <Filter className="h-4 w-4" />
                  <span>More Filters</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gold px-6 py-4 text-base font-semibold text-charcoal transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Searching...' : 'Search Properties'}
              </button>
            </form>
          </motion.div>

          {/* REM Logo in bottom right */}
          <div className="absolute bottom-8 right-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
              <svg className="h-12 w-12" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 40 L40 20 L60 40 L60 60 L20 60 Z"
                  stroke="#c9b76a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M35 60 L35 48 L45 48 L45 60"
                  stroke="#c9b76a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <text
                  x="40"
                  y="78"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#c9b76a"
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  letterSpacing="1.5"
                >
                  REM
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl space-y-8 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-charcoal">Featured Properties</h2>
          <p className="mt-3 text-lg text-charcoal/70">
            Discover our handpicked selection of premium properties from top locations across Sri Lanka.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/listings')}
            className="flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-semibold text-charcoal transition hover:bg-gold-light"
          >
            View All Properties
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary">Trusted by Thousands</h2>
            <p className="mt-3 text-lg text-charcoal/80">
              Join our growing community of satisfied buyers, sellers, and agents who have found success through our
              platform across Sri Lanka
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 iteSms-center justify-center rounded-full bg-sky/30 text-3xl">
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="mt-2 text-sm text-charcoal/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky/30 text-2xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal">{feature.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

