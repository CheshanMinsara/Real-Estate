import { Suspense } from 'react'

import { Loader } from './components/common/Loader.tsx'
import { AppRoutes } from './routes/AppRoutes.tsx'

export function App() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </div>
  )
}

export default App

