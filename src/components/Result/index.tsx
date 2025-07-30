import React, { useState } from 'react'
import QNA from '@/components/Result/QNA'
import Stats from '@/components/Result/Stats'

interface ResultProps {
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  questionsAndAnswers: Array<{
    question: string
    user_answer: string
    correct_answer: string
    point: number
  }>
  replayQuiz: () => void
  resetQuiz: () => void
}

const Result: React.FC<ResultProps> = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'Stats' | 'QNA'>('Stats')

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-neutral-700 mb-4">
        {(['Stats', 'QNA'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'Stats' ? (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
          replayQuiz={replayQuiz}
          resetQuiz={resetQuiz}
        />
      ) : (
        <QNA questionsAndAnswers={questionsAndAnswers} />
      )}
    </div>
  )
}

export default Result
