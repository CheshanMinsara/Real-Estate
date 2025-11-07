import { useForm } from 'react-hook-form'
import { Building, Mail, Phone } from 'lucide-react'

type ContactFormValues = {
  name: string
  email: string
  phone?: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormValues>()

  const onSubmit = (values: ContactFormValues) => {
    console.log('Contact form submitted', values)
    reset()
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Let’s Start Your Next Move</h1>
        <p className="mt-3 text-lg text-slate-600">
          Share your vision and we’ll connect you with the right advisor within minutes.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-600">
                Full Name
              </label>
              <input
                id="name"
                {...register('name', { required: true })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-slate-600">
              Phone (optional)
            </label>
            <input
              id="phone"
              {...register('phone')}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-600">
              How can we assist you?
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message', { required: true })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tell us about your property goals, preferred locations, or timelines."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </form>

        <aside className="space-y-6 rounded-3xl bg-primary p-8 text-white">
          <h2 className="text-2xl font-semibold">PrimeNest Realty HQ</h2>
          <p className="text-sm text-white/80">
            Schedule a consultation or visit our experience center to explore high-definition virtual tours and curated
            investment briefs.
          </p>
          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <Building className="mt-1 h-5 w-5 text-accent" />
              <span>
                1200 Market Street, Suite 28B
                <br />
                San Francisco, CA 94105
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-accent" /> +1 (555) 728-4420
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent" /> hello@primenestrealty.com
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-sm text-white">
            <p className="font-semibold">Office Hours</p>
            <p>Monday - Saturday: 9:00 AM – 6:30 PM PT</p>
            <p>Sunday appointments available upon request.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

