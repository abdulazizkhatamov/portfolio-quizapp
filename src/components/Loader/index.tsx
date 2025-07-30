import { LoaderIcon } from 'lucide-react'
import React from 'react'

interface LoaderProps {
  title?: string
  message?: string
}

const Loader: React.FC<LoaderProps> = ({
  title = 'Just one second',
  message = 'We are fetching that content for you.',
}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] px-4">
      <div className="flex items-center gap-4 p-6 rounded-md bg-white dark:bg-neutral-900 shadow-md w-full max-w-md">
        <LoaderIcon className="w-8 h-8 text-blue-500 animate-spin" />
        <div className="text-gray-800 dark:text-gray-100">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
