import React from 'react';
import { CPSData } from './page';

interface MachineDetailsProps {
  machine: CPSData;
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machine }) => (
  <div className="mt-8 p-4 bg-gray-100 text-gray-700 border rounded shadow-md">
    <h2 className="text-xl font-semibold">Configuração da Máquina: {machine.id}</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Informações Estáticas</h3>
        <p><strong>Tipo:</strong> {machine.tipo}</p>
        <p><strong>Localização:</strong> {machine.localizacao}</p>
        <p><strong>Status:</strong> {machine.status}</p>
        <p><strong>Velocidade:</strong> {machine.velocidade} Mbps</p>
        <p><strong>Protocolo:</strong> {machine.protocolo}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Dados em Tempo Real</h3>
        <p><strong>Temperatura:</strong> {machine.temperatura.toFixed(2)}°C</p>
        <p><strong>Pressão:</strong> {machine.pressao.toFixed(2)} bar</p>
        <p><strong>Vazão:</strong> {machine.vasao.toFixed(2)} m³/h</p>
        <p><strong>Última Atualização:</strong> {new Date(machine.timestamp).toLocaleString()}</p>
      </div>
    </div>
  </div>
);

export default MachineDetails;

