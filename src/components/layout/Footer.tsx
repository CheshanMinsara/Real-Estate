import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
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
              <span className="text-xl font-bold">Real Estate Market</span>
            </div>
            <p className="mb-6 text-sm text-cream/90">
              Your trusted partner in real estate. We connect buyers, sellers, and agents to create successful property
              transactions across Sri Lanka.
            </p>
            <div className="mb-6 space-y-2 text-sm text-cream/90">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+94 712345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>realestatemarketsl@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:border-accent hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:border-accent hover:text-accent"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">For Buyers</h3>
            <ul className="space-y-2 text-sm text-cream/90">
              <li>
                <Link to="/listings" className="hover:text-white">
                  Search Properties
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Buyer's Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Neighborhood Info
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">For Sellers</h3>
            <ul className="space-y-2 text-sm text-cream/90">
              <li>
                <a href="#" className="hover:text-white">
                  List Your Property
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Home Valuation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Seller's Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Market Reports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-cream/90">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8">
          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-cream/90">
              Get the latest property listings and market insights delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-cream/30 bg-primary/30 px-4 py-2.5 text-sm text-cream placeholder-cream/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-gold-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-cream/70 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Real Estate Market. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-accent">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

