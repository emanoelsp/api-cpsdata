"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Smartphone } from "lucide-react"

const MachineDetails = dynamic(() => import("./machineDetails"), {
  ssr: false,
})

export interface TimeSeriesPoint {
  temperature: number
  pressure: number
  flowRate: number
  timestamp: number
}

export interface CPSData {
  id: string
  type: string
  location: string
  status: string
  speed: number
  protocol: string
  temperature: number
  pressure: number
  flowRate: number
  timestamp: number
  series: TimeSeriesPoint[]
}

export default function Topology() {
  const [cpsData, setCpsData] = useState<CPSData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch("/api/cps-data")

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data: CPSData = await response.json()
        setCpsData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching CPS data:", err)
        setError("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !cpsData) {
    return <div className="container mx-auto p-4">Loading data...</div>
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!cpsData) {
    return <div className="container mx-auto p-4">No data available</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CPS DATA</h1>

      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Location: {cpsData.location}</h2>
        <div className="flex flex-wrap gap-6 mt-4 justify-center">
          <div className="relative cursor-pointer">
            <Smartphone className="h-12 w-12 text-blue-500" />
            <p className="mt-2 text-center">{cpsData.id}</p>
          </div>
        </div>
      </div>

      <MachineDetails machine={cpsData} />
    </div>
  )
}
