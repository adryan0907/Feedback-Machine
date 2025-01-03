import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuestionCardProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
}

export function QuestionCard({ question, options, onAnswer }: QuestionCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              variant="outline"
              className="w-full"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

