import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type CPSData = {
    id: string
    tipo: string
    localizacao: string
    status: string
    velocidade: number
    protocolo: string
    temperatura: number
    pressao: number
    vasao: number
    timestamp: number
}

let cpsData: CPSData[] = [
    {
        id: 'CPS001',
        tipo: 'Sensor',
        localizacao: 'Linha1',
        status: 'Ativo',
        velocidade: 100,
        protocolo: 'MQTT',
        temperatura: 0,
        pressao: 0,
        vasao: 0,
        timestamp: 0
    }
]

function updateCPSData() {
    cpsData = cpsData.map(cps => ({
        ...cps,
        temperatura: parseFloat((Math.random() * 100).toFixed(2)),
        pressao: parseFloat((Math.random() * 10).toFixed(2)),
        vasao: parseFloat((Math.random() * 100).toFixed(2)),
        timestamp: Date.now()
    }))

    // Salvar dados em um arquivo JSON
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir)
    }
    fs.writeFileSync(path.join(dataDir, 'cps-data.json'), JSON.stringify(cpsData, null, 2))

    console.log('CPS data updated:', cpsData)
}

// Atualizar dados a cada segundo
setInterval(updateCPSData, 1000)

export async function GET() {
    return NextResponse.json(cpsData, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}

// Iniciar a atualização dos dados
updateCPSData()

// Simular o servidor rodando
console.log('Server is running. Press Ctrl+C to stop.')
setInterval(() => {}, 1000)