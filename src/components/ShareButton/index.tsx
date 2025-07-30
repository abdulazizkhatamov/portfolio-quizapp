import { Share2Icon } from 'lucide-react'
import React, { useState } from 'react'

const shareUrl =
  'https://portfolio-quizapp-git-main-abdulazizkhfs-projects.vercel.app/'
const shareText = 'Check out this quiz app — it rocks!'

const ShareButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    if (typeof navigator.share === 'function') {
      navigator
        .share({
          title: document.title,
          text: shareText,
          url: shareUrl,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log(error.message))
    }
  }

  const isNativeShareSupported = typeof navigator.share === 'function'

  return (
    <>
      {isNativeShareSupported ? (
        <button
          onClick={handleClick}
          title="Share"
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
        >
          <Share2Icon className="w-5 h-5" />
        </button>
      ) : (
        <>
          <button
            onClick={() => setShowModal(true)}
            title="Share"
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
          >
            <Share2Icon className="w-5 h-5" />
          </button>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-sm mx-auto shadow-xl relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                  Share on
                </h2>
                <div className="flex flex-col space-y-3 items-center">
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
                      Facebook
                    </button>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl,
                    )}&text=${encodeURIComponent(shareText)}&via=_safdarjamal`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition">
                      Twitter
                    </button>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      shareUrl,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                      LinkedIn
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ShareButton
