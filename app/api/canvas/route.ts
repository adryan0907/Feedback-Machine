import { NextResponse } from 'next/server'

let canvas: string[][] = Array(5).fill(null).map(() => Array(5).fill(null))

export async function GET() {
  return NextResponse.json({ canvas })
}

export async function POST(request: Request) {
  const body = await request.json()
  canvas = body.canvas
  return NextResponse.json({ success: true })
}

