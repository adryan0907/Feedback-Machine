export interface Question {
  question: string;
  options: string[];
}

export const questions: Question[] = [
  {
    question: "How do you think technology will impact human creativity in the next decade?",
    options: [
      "Enhance it",
      "Limit it",
      "Balance both",
      "Vary by field"
    ]
  },
  {
    question: "What emerging skill do you believe will be most crucial for university graduates in 2025?",
    options: [
      "AI Skills",
      "Problem Solving",
      "Teamwork",
      "Adaptability"
    ]
  },
  {
    question: "How has your university experience aligned with modern workplace demands?",
    options: ["Perfect", "Good", "Fair", "Poor", "Bad"]
  },
  {
    question: "Which learning approach has most enhanced your university journey?",
    options: ["Projects", "Industry Work", "Global Teams", "Tech Labs", "Research"]
  },
  {
    question: "How effectively does your university embrace technology?",
    options: ["Very Well", "Well", "Average", "Below Par", "Poor"]
  },
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
];

