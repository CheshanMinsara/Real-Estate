import { Linkedin, Mail, Phone } from 'lucide-react'

import { useAppSelector } from '../store/hooks.ts'

export default function AgentsPage() {
  const agents = useAppSelector((state) => {
    const unique = new Map(
      state.properties.items.map((property) => [property.agent.id, property.agent]),
    )
    return Array.from(unique.values())
  })

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Meet Our Advisory Team</h1>
        <p className="mt-3 text-lg text-slate-600">
          Elite agents with hyper-local expertise, negotiating power, and white-glove client service.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <article key={agent.id} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <img
              src={agent.avatar ?? '/images/agents/placeholder-agent.jpg'}
              alt={agent.name}
              className="mx-auto h-28 w-28 rounded-full object-cover"
            />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{agent.name}</h2>
            <p className="text-sm text-slate-500">Luxury Property Advisor</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {agent.phone}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {agent.email}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light"
              >
                Call
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/company/primenest"
                className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

