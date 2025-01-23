import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PIXELS_FILE = path.join(process.cwd(), 'pixels.json')

// Initialize file if it doesn't exist
if (!fs.existsSync(PIXELS_FILE)) {
  fs.writeFileSync(PIXELS_FILE, JSON.stringify({ pixels: [] }))
}

export async function GET() {
  try {
    const data = fs.readFileSync(PIXELS_FILE, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({ pixels: [] })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = fs.readFileSync(PIXELS_FILE, 'utf8')
    const existingData = JSON.parse(data)
    
    // Add new pixels to existing ones
    existingData.pixels = [...existingData.pixels, ...body.pixels]
    
    fs.writeFileSync(PIXELS_FILE, JSON.stringify(existingData))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save pixels' }, { status: 500 })
  }
} 