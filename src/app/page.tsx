'use client'

import React, { useState, useEffect } from 'react';
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

interface CPSData {
  id: string;
  tipo: string;
  localizacao: string;
  status: string;
  velocidade: number;
  protocolo: string;
  configuracao: string;
}

export default function Topologia() {
  const [cpsData, setCpsData] = useState<CPSData[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<CPSData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/cps-data');
      const data = await response.json();
      setCpsData(data);
    }
    fetchData();
  }, []);

  // Agrupar as máquinas pela localização
  const groupedByLocation = cpsData.reduce((acc, cps) => {
    if (!acc[cps.localizacao]) {
      acc[cps.localizacao] = [];
    }
    acc[cps.localizacao].push(cps);
    return acc;
  }, {} as Record<string, CPSData[]>);

  const handleMachineClick = (machine: CPSData) => {
    setSelectedMachine(machine);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> ARQUITETURA DE CONTROLE - Topologia de Máquinas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedByLocation).map(([location, machines]) => (
          <div key={location} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Localização: {location}</h2>
            <div className="flex flex-wrap gap-6 mt-4 justify-center">
              {machines.map((machine) => (
                <div
                  key={machine.id}
                  className="relative cursor-pointer"
                  onClick={() => handleMachineClick(machine)}
                >
                  {/* Exibir o ícone dependendo do tipo de máquina */}
                  {machine.tipo === 'Sensor' ? (
                    <DevicePhoneMobileIcon className="h-12 w-12 text-blue-500" />
                  ) : (
                    <ComputerDesktopIcon className="h-12 w-12 text-green-500" />
                  )}
                  <p className="mt-2 text-center">{machine.id}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Exibir detalhes da máquina selecionada */}
      {selectedMachine && (
        <div className="mt-8 p-4 bg-gray-100 text-gray-700 border rounded shadow-md">
          <h2 className="text-xl font-semibold">Configuração da Máquina: {selectedMachine.id}</h2>
          <p><strong>Tipo:</strong> {selectedMachine.tipo}</p>
          <p><strong>Localização:</strong> {selectedMachine.localizacao}</p>
          <p><strong>Status:</strong> {selectedMachine.status}</p>
          <p><strong>Velocidade:</strong> {selectedMachine.velocidade} Mbps</p>
          <p><strong>Protocolo:</strong> {selectedMachine.protocolo}</p>
        </div>
      )}
    </div>
  );
}
