import { Spinner } from './ui/spinner'

// src/components/loading-state.tsx
export function LoadingState() {
  return (
    <div className="w-[380px] min-h-[500px] p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-2">
          <Spinner />
        </div>
        <p>Loading website info...</p>
      </div>
    </div>
  )
}
