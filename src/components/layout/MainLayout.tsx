import { Outlet } from 'react-router-dom'

import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

