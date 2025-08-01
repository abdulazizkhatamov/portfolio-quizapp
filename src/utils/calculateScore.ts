const calculateScore = (totalQuestions: number, correctAnswers: number) => {
  if (totalQuestions === 0) {
    return 0
  }
  return Number(((correctAnswers * 100) / totalQuestions).toFixed(2))
}

export default calculateScore
