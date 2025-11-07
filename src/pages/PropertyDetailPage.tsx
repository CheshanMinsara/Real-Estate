import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Ruler } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { PropertyCard } from '../components/properties/PropertyCard.tsx'
import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { toggleFavorite } from '../store/slices/favoritesSlice.ts'
import { selectFavoriteIds, selectFilteredProperties } from '../store/selectors.ts'
import { formatCurrency } from '../utils/formatCurrency.ts'
import type { Property } from '../types/property.ts'

type ViewingForm = {
  name: string
  email: string
  phone: string
  preferredDate: string
  message: string
}

export default function PropertyDetailPage() {
  const { propertyId } = useParams<{ propertyId: string }>()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(selectFavoriteIds)
  const properties = useAppSelector((state) => state.properties.items)
  const similar = useAppSelector(selectFilteredProperties)

  const property = properties.find((item) => item.id === propertyId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ViewingForm>()

  if (!property) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Property not found</h1>
        <p className="mt-4 text-slate-500">This listing may have been removed or is temporarily unavailable.</p>
      </div>
    )
  }

  const isFavorite = favorites.includes(property.id)

  const galleryImages = property.images.length > 0 ? property.images : ['/images/placeholder-property.jpg']

  const similarProperties = useMemo<Property[]>(
    () =>
      similar
        .filter((item) => item.id !== property.id && item.propertyType === property.propertyType)
        .slice(0, 3),
    [property.id, property.propertyType, similar],
  )

  const onSubmit = (values: ViewingForm) => {
    console.log('Viewing request submitted', {
      propertyId: property.id,
      ...values,
    })
    reset()
  }

  const mapSrc = `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=en&z=14&output=embed`

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      <section className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">{property.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-500">
              <MapPin className="h-4 w-4" /> {property.address}, {property.city}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-accent">
              {formatCurrency(property.price, property.status === 'for-rent')}
            </p>
            <button
              className="mt-4 inline-flex items-center gap-3 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              onClick={() => dispatch(toggleFavorite(property.id))}
            >
              {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={galleryImages[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {galleryImages.slice(1).map((image) => (
              <motion.img
                key={image}
                src={image}
                alt={property.title}
                className="h-48 w-full rounded-3xl object-cover"
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Property Details</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{property.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <Ruler className="h-4 w-4 text-primary" />
                  {property.squareFootage.toLocaleString()} sq ft
                </p>
                <p className="text-sm text-slate-600">Bedrooms: {property.bedrooms}</p>
                <p className="text-sm text-slate-600">Bathrooms: {property.bathrooms}</p>
                {property.yearBuilt ? (
                  <p className="text-sm text-slate-600">Built in {property.yearBuilt}</p>
                ) : null}
                {property.lotSize ? (
                  <p className="text-sm text-slate-600">Lot size: {property.lotSize} acres</p>
                ) : null}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Key Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm" id="schedule-viewing">
              <h2 className="text-2xl font-semibold text-slate-900">Schedule a Viewing</h2>
              <p className="mt-2 text-sm text-slate-500">
                Share your preferred time and an agent will reach out within 24 hours.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('name', { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('email', { required: true })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('phone')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="preferredDate">
                      Preferred Date
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('preferredDate')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    {...register('message')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Listing Agent</h2>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={property.agent.avatar ?? '/images/agents/placeholder-agent.jpg'}
                  alt={property.agent.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-semibold text-slate-900">{property.agent.name}</p>
                  <p className="text-sm text-slate-500">PrimeNest Realty</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> {property.agent.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> {property.agent.email}
                </p>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl shadow-sm">
              <iframe
                title="Property location"
                src={mapSrc}
                className="h-80 w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </section>
          </aside>
        </div>
      </section>

      {similarProperties.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Similar Properties</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {similarProperties.map((item) => (
              <div key={item.id}>
                <PropertyCard
                  property={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

