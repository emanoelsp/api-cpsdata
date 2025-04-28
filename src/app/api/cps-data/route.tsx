import { NextResponse } from "next/server"

// Define types for our data structure
type TimeSeriesPoint = {
  temperature: number
  pressure: number
  flowRate: number
  timestamp: number
}

type CPSData = {
  // Static data
  id: string
  type: string
  location: string
  status: string
  speed: number
  protocol: string

  // Current values (latest measurement)
  temperature: number
  pressure: number
  flowRate: number
  timestamp: number

  // Historical time series data
  series: TimeSeriesPoint[]
}

// Single CPS data instance with series data
let cpsData: CPSData = {
  id: "CPS001",
  type: "Sensor",
  location: "Line1",
  status: "Active",
  speed: 100,
  protocol: "MQTT",
  temperature: 0,
  pressure: 0,
  flowRate: 0,
  timestamp: 0,
  series: [],
}

// Maximum number of time series points to keep
const MAX_SERIES_POINTS = 60 // Keep last 60 seconds of data

// In-memory storage for series data (Vercel-compatible)
const timeSeriesData: TimeSeriesPoint[] = []

// Generate new data point
function generateDataPoint() {
  const currentTime = Date.now()

  // Generate new measurement values
  const newTemperature = Number.parseFloat((Math.random() * 100).toFixed(2))
  const newPressure = Number.parseFloat((Math.random() * 10).toFixed(2))
  const newFlowRate = Number.parseFloat((Math.random() * 100).toFixed(2))

  // Create new time series point
  const newPoint: TimeSeriesPoint = {
    temperature: newTemperature,
    pressure: newPressure,
    flowRate: newFlowRate,
    timestamp: currentTime,
  }

  return newPoint
}

export async function GET() {
  const newPoint = generateDataPoint()

  cpsData = {
    ...cpsData,
    temperature: newPoint.temperature,
    pressure: newPoint.pressure,
    flowRate: newPoint.flowRate,
    timestamp: newPoint.timestamp,
  }

  timeSeriesData.push(newPoint)

  while (timeSeriesData.length > MAX_SERIES_POINTS) {
    timeSeriesData.shift()
  }

  const responseData = {
    ...cpsData,
    series: [...timeSeriesData],
  }

  return NextResponse.json(responseData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
