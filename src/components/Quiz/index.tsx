import React, { useEffect, useState } from 'react'
import he from 'he'

import { ChevronRightIcon, InfoIcon } from 'lucide-react'
import Countdown from '../Countdown'
import getLetter from '@/utils/getLetter'

interface QuizProps {
  data: Array<any>
  countdownTime: number
  endQuiz: (result: {
    totalQuestions: number
    correctAnswers: number
    timeTaken: number
    questionsAndAnswers: Array<any>
  }) => void
}

const Quiz: React.FC<QuizProps> = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [userSelectedAns, setUserSelectedAns] = useState<string | null>(null)
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<Array<any>>([])
  const [timeTaken, setTimeTaken] = useState<number | null>(null)

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [questionIndex])

  const handleItemClick = (answer: string) => {
    setUserSelectedAns(answer)
  }

  const handleNext = () => {
    const currentQuestion = data[questionIndex]
    const isCorrect =
      userSelectedAns === he.decode(currentQuestion.correct_answer)
    const point = isCorrect ? 1 : 0

    const qna = [
      ...questionsAndAnswers,
      {
        question: he.decode(currentQuestion.question),
        user_answer: userSelectedAns,
        correct_answer: he.decode(currentQuestion.correct_answer),
        point,
      },
    ]

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken: timeTaken ?? 0,
        questionsAndAnswers: qna,
      })
    }

    setCorrectAnswers(correctAnswers + point)
    setQuestionIndex(questionIndex + 1)
    setUserSelectedAns(null)
    setQuestionsAndAnswers(qna)
  }

  const timeOver = (finalTimeTaken: number) => {
    endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken: finalTimeTaken,
      questionsAndAnswers,
    })
  }

  const current = data[questionIndex]

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-white gap-2">
          <InfoIcon className="w-6 h-6 text-blue-600" />
          {`Question ${questionIndex + 1} of ${data.length}`}
        </div>

        <Countdown
          countdownTime={countdownTime}
          timeOver={timeOver}
          setTimeTaken={setTimeTaken}
        />
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 p-4 rounded-md text-lg">
          <strong>{`Q. ${he.decode(current.question)}`}</strong>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
          Please choose one of the following answers:
        </h3>

        <div className="flex flex-col space-y-2">
          {current.options.map((option: string, i: number) => {
            const decoded = he.decode(option)
            const isActive = userSelectedAns === decoded

            return (
              <button
                key={decoded}
                onClick={() => handleItemClick(decoded)}
                className={`flex items-center text-left px-4 py-3 border rounded-md transition ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-white border-gray-300 dark:border-neutral-700'
                }`}
              >
                <span className="font-bold mr-3">{getLetter(i)}</span> {decoded}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!userSelectedAns}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md disabled:opacity-50"
        >
          Next
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Quiz
