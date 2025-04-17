import { NextResponse } from "next/server"

// Define types for our data structure
type TimeSeriesPoint = {
  temperatura: number
  pressao: number
  vasao: number
  timestamp: number
}

type CPSData = {
  // Static data
  id: string
  tipo: string
  localizacao: string
  status: string
  velocidade: number
  protocolo: string

  // Current values (latest measurement)
  temperatura: number
  pressao: number
  vasao: number
  timestamp: number

  // Historical time series data
  series: TimeSeriesPoint[]
}

// Single CPS data instance with series data
let cpsData: CPSData = {
  id: "CPS001",
  tipo: "Sensor",
  localizacao: "Linha1",
  status: "Ativo",
  velocidade: 100,
  protocolo: "MQTT",
  temperatura: 0,
  pressao: 0,
  vasao: 0,
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
  const newTemperatura = Number.parseFloat((Math.random() * 100).toFixed(2))
  const newPressao = Number.parseFloat((Math.random() * 10).toFixed(2))
  const newVasao = Number.parseFloat((Math.random() * 100).toFixed(2))

  // Create new time series point
  const newPoint: TimeSeriesPoint = {
    temperatura: newTemperatura,
    pressao: newPressao,
    vasao: newVasao,
    timestamp: currentTime,
  }

  return newPoint
}

export async function GET() {
  // Generate a new data point for this request
  const newPoint = generateDataPoint()

  // Update the CPS data with the new values
  cpsData = {
    ...cpsData,
    temperatura: newPoint.temperatura,
    pressao: newPoint.pressao,
    vasao: newPoint.vasao,
    timestamp: newPoint.timestamp,
  }

  // Add the new point to our in-memory series data
  timeSeriesData.push(newPoint)

  // Keep only the most recent points
  while (timeSeriesData.length > MAX_SERIES_POINTS) {
    timeSeriesData.shift()
  }

  // Add the series data to the response
  const responseData = {
    ...cpsData,
    series: [...timeSeriesData], // Create a copy of the series data
  }

  return NextResponse.json(responseData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
