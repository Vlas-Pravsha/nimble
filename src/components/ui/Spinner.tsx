import { Loader2 } from 'lucide-react'

export const Spinner: React.FC = () => (
  <div className="flex items-center justify-center w-full h-dvh">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
)
