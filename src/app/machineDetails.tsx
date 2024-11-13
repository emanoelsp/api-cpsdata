import React from 'react';
import { CPSData } from './page';

interface MachineDetailsProps {
  machine: CPSData;
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machine }) => (
  <div className="mt-8 p-4 bg-gray-100 text-gray-700 border rounded shadow-md">
    <h2 className="text-xl font-semibold">Configuração da Máquina: {machine.id}</h2>
    <p><strong>Tipo:</strong> {machine.tipo}</p>
    <p><strong>Localização:</strong> {machine.localizacao}</p>
    <p><strong>Status:</strong> {machine.status}</p>
    <p><strong>Velocidade:</strong> {machine.velocidade} Mbps</p>
    <p><strong>Protocolo:</strong> {machine.protocolo}</p>
  </div>
);

export default MachineDetails;