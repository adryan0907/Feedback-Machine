export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
}

export interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

