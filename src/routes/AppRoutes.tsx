import { lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { MainLayout } from '../components/layout/MainLayout.tsx'

const HomePage = lazy(() => import('../pages/HomePage.tsx'))
const ListingsPage = lazy(() => import('../pages/ListingsPage.tsx'))
const PropertyDetailPage = lazy(() => import('../pages/PropertyDetailPage.tsx'))
const AboutPage = lazy(() => import('../pages/AboutPage.tsx'))
const ContactPage = lazy(() => import('../pages/ContactPage.tsx'))
const AgentsPage = lazy(() => import('../pages/AgentsPage.tsx'))
const AgentDashboard = lazy(() => import('../pages/AgentDashboard.tsx'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage.tsx'))

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listings/:propertyId" element={<PropertyDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="agent/:agentId/dashboard" element={<AgentDashboard />} />
          <Route path="agent/dashboard" element={<AgentDashboard />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

