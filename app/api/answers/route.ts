import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ANSWERS_FILE = path.join(process.cwd(), 'answers.json')

// Initialize file if it doesn't exist
if (!fs.existsSync(ANSWERS_FILE)) {
  fs.writeFileSync(ANSWERS_FILE, JSON.stringify({ answers: [] }))
}

export async function GET() {
  try {
    const data = fs.readFileSync(ANSWERS_FILE, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({ answers: [] })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = fs.readFileSync(ANSWERS_FILE, 'utf8')
    const existingData = JSON.parse(data)
    
    // Add timestamp to the answers
    const answerWithTimestamp = {
      ...body,
      timestamp: new Date().toISOString()
    }
    
    // Add new answers to existing ones
    existingData.answers = [...existingData.answers, answerWithTimestamp]
    
    fs.writeFileSync(ANSWERS_FILE, JSON.stringify(existingData, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save answers' }, { status: 500 })
  }
} 