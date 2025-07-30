import { DownloadIcon, GithubIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Header: React.FC = () => {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [appAccepted, setAppAccepted] = useState(false)

  let isAppInstalled = false

  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches || appAccepted)
  ) {
    isAppInstalled = true
  }

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPromptEvent(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const installApp = () => {
    if (promptEvent) {
      promptEvent.prompt()
      promptEvent.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          setAppAccepted(true)
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
      })
    }
  }

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 bg-gray-900 text-white shadow">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">QuizApp</h1>
        <p className="text-sm text-gray-400 -mt-1">by Abdulaziz Khatamov</p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://github.com/abdulazizkhatamov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <GithubIcon className="w-4 h-4" />
          GitHub
        </a>

        {promptEvent && !isAppInstalled && (
          <button
            onClick={installApp}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition"
          >
            <DownloadIcon className="w-5 h-5" />
            Install App
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

// Type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}
