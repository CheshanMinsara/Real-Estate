import { Search, Grid3x3, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Dropdown from '../common/Dropdown'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <svg className="h-8 w-8" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* House Icon */}
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
              {/* REM Text */}
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
          <span className="text-xl font-bold text-cream">Real Estate Market</span>
        </NavLink>

        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage" />
            <input
              type="search"
              placeholder="Search properties by location, type, or price..."
              className="w-full rounded-full border border-sage/30 bg-cream/90 py-2.5 pl-12 pr-4 text-sm text-charcoal placeholder:text-sage focus:border-accent focus:bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden items-center gap-2 text-sm font-medium text-cream hover:text-accent md:flex">
            <Search className="h-4 w-4" />
            <span>Search Properties</span>
          </button>
          <NavLink to="/agent/dashboard" className="hidden items-center gap-2 text-sm font-medium text-cream hover:text-accent md:flex">
            <Grid3x3 className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>

          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-sm font-semibold text-charcoal transition hover:bg-accent-light">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/20 text-xs font-semibold">JS</div>
                <ChevronDown className="h-4 w-4" />
              </div>
            }
          >
            <nav className="flex flex-col gap-1">
              <NavLink to="/agent/dashboard" className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Profile
              </NavLink>
              <NavLink to="/favorites" className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Favorites
              </NavLink>
              <button className="mt-2 rounded bg-red-50 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-100">Logout</button>
            </nav>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

