import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StartPageProps {
  onStart: () => void
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Welcome to CampusQuest</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          While you ride the elevator, participate in fun mini-games and share your thoughts about your university experience!
        </p>
        <Button onClick={onStart} className="w-full">
          Start Your Quest
        </Button>
      </CardContent>
    </Card>
  )
}

