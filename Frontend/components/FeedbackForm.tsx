'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface FeedbackFormProps {
  onSubmit: (feedback: string) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    onSubmit(feedback)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Final Thoughts on Your Campus Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">Any additional comments about your university experience?</p>
        <Textarea
          className="w-full mb-4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts here..."
        />
        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  )
}

