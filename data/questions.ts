import type { Question } from '@/types/quiz'

export const questions: Question[] = [
  {
    id: 1,
    text: "What is your preferred learning style?",
    options: [
      "Visual - I learn best through images and diagrams",
      "Auditory - I learn best through listening and discussion",
      "Reading/Writing - I prefer written materials",
      "Kinesthetic - I learn by doing and hands-on practice"
    ],
    correctAnswer: "Visual - I learn best through images and diagrams"
  },
  {
    id: 2,
    text: "How much time can you dedicate to learning each day?",
    options: [
      "Less than 1 hour",
      "1-2 hours",
      "2-4 hours",
      "More than 4 hours"
    ],
    correctAnswer: "1-2 hours"
  },
  {
    id: 3,
    text: "What is your current experience level with programming?",
    options: [
      "Complete beginner",
      "Some basic knowledge",
      "Intermediate level",
      "Advanced programmer"
    ],
    correctAnswer: "Complete beginner"
  }
]

