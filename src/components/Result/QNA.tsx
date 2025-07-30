import React from 'react'

interface QNAProps {
  questionsAndAnswers: Array<{
    question: string
    user_answer: string
    correct_answer: string
    point: number
  }>
}

const QNA: React.FC<QNAProps> = ({ questionsAndAnswers }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full border border-gray-300 dark:border-neutral-700 divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">No.</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Questions
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Your Answers
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Correct Answers
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {questionsAndAnswers.map((item, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 dark:hover:bg-neutral-800 even:bg-gray-50 dark:even:bg-neutral-900"
            >
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                {i + 1}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                {item.question}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                {item.user_answer}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                {item.correct_answer}
              </td>
              <td className="px-4 py-2 text-sm text-center text-gray-800 dark:text-white">
                {item.point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default QNA
