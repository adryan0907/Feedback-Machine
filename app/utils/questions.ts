export interface Question {
  question: string;
  options: string[];
}

export const questions: Question[] = [
  {
    question: "How do you think technology will impact human creativity in the next decade?",
    options: [
      "Technology will enhance human creativity",
      "Technology will limit human creativity",
      "Technology and creativity will balance each other",
      "Technology's impact will vary by creative field"
    ]
  },
  {
    question: "What do you believe is the most crucial skill universities should focus on developing in students for the future workforce?",
    options: [
      "Critical thinking and problem-solving",
      "Digital literacy and tech adaptation",
      "Emotional intelligence and collaboration",
      "Innovation and entrepreneurial mindset"
    ]
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

