import { Spinner } from './ui/spinner'

// src/components/loading-state.tsx
export function LoadingState() {
  return (
    <div className="w-full min-h-[500px] p-4 flex items-center justify-center">
      <div className="text-center flex gap-2">
        <div className="text-4xl">
          <Spinner />
        </div>
        <p>Loading website info...</p>
      </div>
    </div>
  )
}
