export function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

