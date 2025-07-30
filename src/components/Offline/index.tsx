import { WifiSyncIcon } from 'lucide-react'
import React, { useEffect } from 'react'

const Offline: React.FC = () => {
  useEffect(() => {
    const reloadOnline = () => window.location.reload()
    window.addEventListener('online', reloadOnline)

    return () => {
      window.removeEventListener('online', reloadOnline)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[300px] px-4">
      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-8 max-w-xl w-full text-center">
        <div className="text-5xl text-gray-500 mb-4">
          <WifiSyncIcon className="mx-auto w-12 h-12" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Offline
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-base">
          There is no Internet connection. We'll try to reload automatically
          once you're back online!{' '}
          <span role="img" aria-label="signal">
            📶
          </span>
        </p>
      </div>
    </div>
  )
}

export default Offline
