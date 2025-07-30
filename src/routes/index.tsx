import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { SetStateAction } from 'react'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import Quiz from '@/components/Quiz'
import Result from '@/components/Result'
import shuffle from '@/utils/shuffle'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<{
    title: string
    message: string
  } | null>(null)
  const [data, setData] = useState<Array<any> | null>(null)
  const [countdownTime, setCountdownTime] = useState<number | null>(null)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [resultData, setResultData] = useState<any>(null)

  const startQuiz = (
    data: Array<any>,
    countdownTime: SetStateAction<number | null>,
  ) => {
    setLoading(true)
    setLoadingMessage({
      title: 'Loading your quiz...',
      message: "It won't be long!",
    })
    setCountdownTime(countdownTime)

    setTimeout(() => {
      setData(data)
      setIsQuizStarted(true)
      setLoading(false)
    }, 1000)
  }

  const endQuiz = (resultData: any) => {
    setLoading(true)
    setLoadingMessage({
      title: 'Fetching your results...',
      message: 'Just a moment!',
    })

    setTimeout(() => {
      setIsQuizStarted(false)
      setIsQuizCompleted(true)
      setResultData(resultData)
      setLoading(false)
    }, 2000)
  }

  const replayQuiz = () => {
    if (!data) return

    setLoading(true)
    setLoadingMessage({
      title: 'Getting ready for round two.',
      message: "It won't take long!",
    })

    const shuffledData = shuffle(data).map((item) => ({
      ...item,
      options: shuffle(item.options),
    }))

    setData(shuffledData)

    setTimeout(() => {
      setIsQuizStarted(true)
      setIsQuizCompleted(false)
      setResultData(null)
      setLoading(false)
    }, 1000)
  }

  const resetQuiz = () => {
    setLoading(true)
    setLoadingMessage({
      title: 'Loading the home screen.',
      message: 'Thank you for playing!',
    })

    setTimeout(() => {
      setData(null)
      setCountdownTime(null)
      setIsQuizStarted(false)
      setIsQuizCompleted(false)
      setResultData(null)
      setLoading(false)
    }, 1000)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-900 dark:to-neutral-800 text-gray-800 dark:text-gray-100 transition-all duration-300">
        {loading && loadingMessage && (
          <div className="flex items-center justify-center min-h-screen">
            <Loader {...loadingMessage} />
          </div>
        )}

        {!loading && !isQuizStarted && !isQuizCompleted && (
          <main className="flex items-center justify-center py-16 px-4">
            <Main startQuiz={startQuiz} />
          </main>
        )}

        {!loading && isQuizStarted && (
          <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Quiz
              data={data!}
              countdownTime={countdownTime!}
              endQuiz={endQuiz}
            />
          </main>
        )}

        {!loading && isQuizCompleted && (
          <main className="flex items-center justify-center py-16 px-4">
            <Result
              {...resultData}
              replayQuiz={replayQuiz}
              resetQuiz={resetQuiz}
            />
          </main>
        )}
      </div>
    </Layout>
  )
}
