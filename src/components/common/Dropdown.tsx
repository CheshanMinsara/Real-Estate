import React, { useEffect, useRef, useState } from 'react'

type DropdownProps = {
  trigger: React.ReactNode
  align?: 'left' | 'right'
  children: React.ReactNode
  className?: string
}

export function Dropdown({ trigger, align = 'left', children, className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="inline-flex items-center">
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 mt-2 w-56 rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
