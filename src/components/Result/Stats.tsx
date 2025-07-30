import React from 'react'
import { HouseIcon, PlayIcon } from 'lucide-react'
import calculateScore from '@/utils/calculateScore'
import calculateGrade from '@/utils/calculateGrade'
import timeConverter from '@/utils/timeConverter'
import ShareButton from '@/components/ShareButton'

interface StatsProps {
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  replayQuiz: () => void
  resetQuiz: () => void
}

const Stats: React.FC<StatsProps> = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers)
  const gradeResult = calculateGrade(score)
  const grade = gradeResult?.grade ?? ''
  const remarks = gradeResult?.remarks ?? ''
  const { hours, minutes, seconds } = timeConverter(timeTaken) ?? {
    hours: '0',
    minutes: '0',
    seconds: '0',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-4">
        {remarks}
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Grade: {grade}
      </h2>
      <h3 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-2">
        Total Questions: {totalQuestions}
      </h3>
      <h3 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-2">
        Correct Answers: {correctAnswers}
      </h3>
      <h3 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-2">
        Your Score: {score}%
      </h3>
      <h3 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-2">
        Passing Score: 60%
      </h3>
      <h3 className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6">
        Time Taken:{' '}
        {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={replayQuiz}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-md text-sm"
        >
          <PlayIcon className="w-5 h-5" />
          Play Again
        </button>

        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-3 rounded-md text-sm"
        >
          <HouseIcon className="w-5 h-5" />
          Back to Home
        </button>

        <ShareButton />
      </div>
    </div>
  )
}

export default Stats
