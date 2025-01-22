import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const pixelsFilePath = path.join(process.cwd(), "pixels.json")

export async function GET() {
  try {
    if (fs.existsSync(pixelsFilePath)) {
      const pixelsData = fs.readFileSync(pixelsFilePath, "utf-8")
      return NextResponse.json(JSON.parse(pixelsData))
    } else {
      return NextResponse.json({ pixels: [] })
    }
  } catch (error) {
    console.error("Error reading pixels:", error)
    return NextResponse.json({ error: "Failed to read pixels" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate incoming pixel data
    if (!Array.isArray(body.pixels) || body.pixels.length !== GRID_SIZE * GRID_SIZE) {
      return NextResponse.json({ error: "Invalid pixel data" }, { status: 400 })
    }

    // Save pixel data to the file
    fs.writeFileSync(pixelsFilePath, JSON.stringify({ pixels: body.pixels }), "utf-8")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving pixels:", error)
    return NextResponse.json({ error: "Failed to save pixels" }, { status: 500 })
  }
}
