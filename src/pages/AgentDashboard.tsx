import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateProperty, addProperty } from '../store/slices/propertiesSlice'
import type { Property } from '../types/property'

export default function AgentDashboard() {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const properties = useAppSelector((s) => s.properties.items)

  const agents = useMemo(() => {
    const map = new Map(properties.map((p) => [p.agent.id, p.agent]))
    return Array.from(map.values())
  }, [properties])

  // If no agentId provided, redirect to first agent dashboard (if any).
  // Use effect to avoid navigating during render.
  useEffect(() => {
    if (!agentId && agents.length > 0) {
      navigate(`/agent/${agents[0].id}/dashboard`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId, agents.length])

  const agent = agents.find((a) => a.id === agentId) ?? agents[0]
  const agentProperties = properties.filter((p) => p.agent.id === agent?.id)

  const stats = useMemo(() => {
    const total = agentProperties.length
    const totalValue = agentProperties.reduce((s, p) => s + p.price, 0)
    const avg = total ? Math.round(totalValue / total) : 0
    return { total, totalValue, avg }
  }, [agentProperties])

  // Local edit state (price edits)
  const [edits, setEdits] = useState<Record<string, Partial<Property>>>({})

  function handlePriceChange(id: string, value: string) {
    const num = Number(value || 0)
    setEdits((e) => ({ ...e, [id]: { ...(e[id] ?? {}), price: num } }))
  }

  function saveProperty(id: string) {
    const prop = properties.find((p) => p.id === id)
    if (!prop) return
    const changed = edits[id]
    if (!changed) return
    const updated: Property = { ...prop, ...changed }
    dispatch(updateProperty(updated))
    setEdits((e) => {
      const copy = { ...e }
      delete copy[id]
      return copy
    })
  }

  function toggleStatus(id: string) {
    const prop = properties.find((p) => p.id === id)
    if (!prop) return
    const updated: Property = { ...prop, status: prop.status === 'for-sale' ? 'for-rent' : 'for-sale' }
    dispatch(updateProperty(updated))
  }

  // Add a very small property form
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState<number | ''>('')

  function addNewProperty() {
    if (!agent) return
    if (!newTitle || !newPrice) return
    const id = String(Date.now())
    const p: Property = {
      id,
      title: newTitle,
      price: Number(newPrice),
      address: 'TBD',
      city: 'Unknown',
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 500,
      propertyType: 'house',
      status: 'for-sale',
      images: [],
      description: '',
      features: [],
      agent,
      coordinates: { lat: 0, lng: 0 },
    }
    dispatch(addProperty(p))
    setNewTitle('')
    setNewPrice('')
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Agent Dashboard</h1>
        <div className="flex gap-3">
          <Link to="/agents" className="text-sm text-primary underline">Back to agents</Link>
        </div>
      </div>

      {agent ? (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl border p-6">
            <img src={agent.avatar ?? '/images/agents/placeholder-agent.jpg'} alt={agent.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <h2 className="mt-4 text-xl font-semibold text-center">{agent.name}</h2>
            <p className="mt-2 text-center text-sm text-slate-600">Agent</p>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between"><span>Listings</span><span>{stats.total}</span></div>
              <div className="flex justify-between"><span>Total Value</span><span>Rs {stats.totalValue.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Avg Price</span><span>Rs {stats.avg.toLocaleString()}</span></div>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold">Add Property</h3>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full rounded border px-3 py-2 text-sm" />
              <input value={newPrice ?? ''} onChange={(e) => setNewPrice(Number(e.target.value) || '')} placeholder="Price" type="number" className="w-full rounded border px-3 py-2 text-sm" />
              <button onClick={addNewProperty} className="w-full rounded bg-primary px-3 py-2 text-sm text-white">Add</button>
            </div>
          </aside>

          <main>
            <h3 className="mb-4 text-lg font-semibold">Properties</h3>
            <div className="grid gap-4">
              {agentProperties.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="text-sm text-slate-600">{p.city} • {p.propertyType}</div>
                    <div className="text-lg font-semibold">{p.title}</div>
                    <div className="mt-1 text-sm text-slate-500">Rs {p.price.toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue={p.price} onChange={(e) => handlePriceChange(p.id, e.target.value)} className="w-24 rounded border px-2 py-1 text-sm" />
                    <button onClick={() => saveProperty(p.id)} className="rounded bg-green-500 px-3 py-1 text-sm text-white">Save</button>
                    <button onClick={() => toggleStatus(p.id)} className="rounded border px-3 py-1 text-sm">{p.status === 'for-sale' ? 'Mark Rent' : 'Mark Sale'}</button>
                  </div>
                </div>
              ))}
              {agentProperties.length === 0 && (
                <div className="rounded-lg border p-6 text-center text-sm text-slate-600">No properties for this agent.</div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="rounded-2xl border p-6 text-center">No agents found.</div>
      )}
    </div>
  )
}
