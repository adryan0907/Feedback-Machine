export interface Question {
  question: string
  options: string[]
}

export const questions: Question[] = [
  {
    question: "How would you rate your overall university experience so far?",
    options: ["Excellent", "Good", "Average", "Below Average", "Poor"]
  },
  {
    question: "Which aspect of university life do you enjoy the most?",
    options: ["Academic learning", "Social activities", "Campus facilities", "Extracurricular clubs", "Personal growth"]
  },
  {
    question: "How well does the university support your academic goals?",
    options: ["Very well", "Adequately", "Somewhat", "Not enough", "Poorly"]
  },
  {
    question: "How satisfied are you with the variety of courses offered?",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
  },
  {
    question: "What area do you think the university should improve the most?",
    options: ["Teaching quality", "Campus facilities", "Student support services", "Research opportunities", "Career guidance"]
  }
]

