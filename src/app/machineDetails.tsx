import type React from "react"
import type { CPSData } from "./page"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MachineDetailsProps {
  machine: CPSData
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machine }) => {
  // Format timestamp for chart display
  const chartData =
    machine.series?.map((point) => ({
      ...point,
      time: new Date(point.timestamp).toLocaleTimeString(),
    })) || []

  return (
    <div className="mt-8 p-4 bg-gray-100 text-gray-700 border rounded shadow-md">
      <h2 className="text-xl font-semibold">Machine Configuration: {machine.id}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Static Information</h3>
          <p>
            <strong>Type:</strong> {machine.type}
          </p>
          <p>
            <strong>Location:</strong> {machine.location}
          </p>
          <p>
            <strong>Status:</strong> {machine.status}
          </p>
          <p>
            <strong>Speed:</strong> {machine.speed} Mbps
          </p>
          <p>
            <strong>Protocol:</strong> {machine.protocol}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
          <p>
            <strong>Temperature:</strong> {machine.temperature.toFixed(2)}°C
          </p>
          <p>
            <strong>Pressure:</strong> {machine.pressure.toFixed(2)} bar
          </p>
          <p>
            <strong>Flow Rate:</strong> {machine.flowRate.toFixed(2)} m³/h
          </p>
          <p>
            <strong>Last Update:</strong> {new Date(machine.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {machine.series && machine.series.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Data History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                <Line type="monotone" dataKey="pressure" stroke="#82ca9d" name="Pressure (bar)" />
                <Line type="monotone" dataKey="flowRate" stroke="#ff7300" name="Flow Rate (m³/h)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default MachineDetails
