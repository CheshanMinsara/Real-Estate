import { motion } from 'framer-motion'

const values = [
  {
    title: 'Client-First Advisory',
    description:
      'From first viewing to closing, our advisors craft bespoke strategies centered on your goals and lifestyle.',
  },
  {
    title: 'Market Intelligence',
    description:
      'We blend on-the-ground expertise with advanced analytics to anticipate market trends in every neighborhood.',
  },
  {
    title: 'Trusted Partnerships',
    description:
      'Mortgage specialists, legal partners, and interior designers—curated to deliver a seamless end-to-end journey.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-slate-900">Redefining Luxury Real Estate Experiences</h1>
          <p className="text-lg leading-relaxed text-slate-600">
            PrimeNest Realty connects discerning buyers and investors with coveted properties across the United States.
            Our curated portfolio spans waterfront estates, skyline penthouses, and tech-enabled smart homes. With over
            15 years of market leadership, we pair world-class service with data-backed insights to unlock opportunity
            in every transaction.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            We believe finding a home should feel personal, elevated, and transparent. Our advisors, marketing team,
            and partner network remain by your side long after the keys are handed over.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl"
        >
          <img
            src="/images/about-team.jpg"
            alt="PrimeNest Realty team"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary">{value.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{value.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-primary px-8 py-10 text-white">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">15+ Years</p>
            <p className="mt-2 text-xl font-semibold">Experience in luxury real estate advisory</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">97% Satisfaction</p>
            <p className="mt-2 text-xl font-semibold">Client retention across buying and selling journeys</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">US & Global Reach</p>
            <p className="mt-2 text-xl font-semibold">Licensed agents and partner network in 20+ cities</p>
          </div>
        </div>
      </section>
    </div>
  )
}

