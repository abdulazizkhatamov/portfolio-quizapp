import React, { useState } from 'react'

import shuffle from '@/utils/shuffle'
import Offline from '@/components/Offline'
import CATEGORIES from '@/constants/categories'
import DIFFICULTY from '@/constants/difficulty'
import NUM_OF_QUESTIONS from '@/constants/numOfQuestions'
import QUESTIONS_TYPE from '@/constants/questionsType'
import COUNTDOWN_TIME from '@/constants/countdownTime'

interface MainProps {
  startQuiz: (questions: Array<any>, totalSeconds: number) => void
}

const Main: React.FC<MainProps> = ({ startQuiz }) => {
  const [category, setCategory] = useState('0')
  const [numOfQuestions, setNumOfQuestions] = useState(5)
  const [difficulty, setDifficulty] = useState('easy')
  const [questionsType, setQuestionsType] = useState('0')
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<any>(null)
  const [offline, setOffline] = useState(false)

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setCountdownTime({ ...countdownTime, [name]: parseInt(value) })
  }

  const allFieldsSelected =
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)

  const fetchData = () => {
    setProcessing(true)
    if (error) setError(null)

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`

    fetch(API)
      .then((res) => res.json())
      .then((data) =>
        setTimeout(() => {
          const { response_code, results } = data

          if (response_code === 1) {
            const message = (
              <>
                The API doesn't have enough questions for your query. <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </>
            )
            setProcessing(false)
            setError({ message })
            return
          }

          results.forEach((q: any) => {
            q.options = shuffle([q.correct_answer, ...q.incorrect_answers])
          })

          setProcessing(false)
          const totalSeconds =
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          startQuiz(results, totalSeconds)
        }, 1000),
      )
      .catch((err) =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true)
          } else {
            setProcessing(false)
            setError(err)
          }
        }, 1000),
      )
  }

  if (offline) return <Offline />

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            The Ultimate Trivia Quiz
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-800 rounded p-4 mb-4">
              <div className="font-semibold mb-2">Error!</div>
              <div>{error.message}</div>
              <button
                className="text-sm mt-2 underline text-red-700"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          <hr className="my-6 border-gray-200 dark:border-neutral-700" />

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
            <div>
              <p className="mb-1">Select quiz category:</p>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-neutral-800"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={processing}
              >
                {CATEGORIES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Number of questions:</p>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-neutral-800"
                value={numOfQuestions}
                onChange={(e) => setNumOfQuestions(parseInt(e.target.value))}
                disabled={processing}
              >
                {NUM_OF_QUESTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Select difficulty:</p>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-neutral-800"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={processing}
              >
                {DIFFICULTY.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Select question type:</p>
              <select
                className="w-full p-2 border rounded bg-white dark:bg-neutral-800"
                value={questionsType}
                onChange={(e) => setQuestionsType(e.target.value)}
                disabled={processing}
              >
                {QUESTIONS_TYPE.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Select countdown time:</p>
              <div className="flex gap-3">
                <select
                  name="hours"
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                  className="w-1/3 p-2 border rounded bg-white dark:bg-neutral-800"
                >
                  {COUNTDOWN_TIME.hours.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>

                <select
                  name="minutes"
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                  className="w-1/3 p-2 border rounded bg-white dark:bg-neutral-800"
                >
                  {COUNTDOWN_TIME.minutes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>

                <select
                  name="seconds"
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                  className="w-1/3 p-2 border rounded bg-white dark:bg-neutral-800"
                >
                  {COUNTDOWN_TIME.seconds.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-neutral-700" />

          <button
            onClick={fetchData}
            disabled={!allFieldsSelected || processing}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Play Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
