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
      <h2 className="text-xl font-semibold">Configuração da Máquina: {machine.id}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Informações Estáticas</h3>
          <p>
            <strong>Tipo:</strong> {machine.tipo}
          </p>
          <p>
            <strong>Localização:</strong> {machine.localizacao}
          </p>
          <p>
            <strong>Status:</strong> {machine.status}
          </p>
          <p>
            <strong>Velocidade:</strong> {machine.velocidade} Mbps
          </p>
          <p>
            <strong>Protocolo:</strong> {machine.protocolo}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Dados em Tempo Real</h3>
          <p>
            <strong>Temperatura:</strong> {machine.temperatura.toFixed(2)}°C
          </p>
          <p>
            <strong>Pressão:</strong> {machine.pressao.toFixed(2)} bar
          </p>
          <p>
            <strong>Vazão:</strong> {machine.vasao.toFixed(2)} m³/h
          </p>
          <p>
            <strong>Última Atualização:</strong> {new Date(machine.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {machine.series && machine.series.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Histórico de Dados</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperatura" stroke="#8884d8" name="Temperatura (°C)" />
                <Line type="monotone" dataKey="pressao" stroke="#82ca9d" name="Pressão (bar)" />
                <Line type="monotone" dataKey="vasao" stroke="#ff7300" name="Vazão (m³/h)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default MachineDetails
