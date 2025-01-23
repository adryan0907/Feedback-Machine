import { NextResponse } from "next/server"

interface Pixel {
  x: number
  y: number
  color: string
}

const pixels: Pixel[] = []

export async function GET() {
  return NextResponse.json({ pixels })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newPixel: Pixel = body
  pixels.push(newPixel)
  return NextResponse.json({ success: true, pixels })
}

