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
}

export async function GET() {
    // Simular geração de dados dos CPS
    const cpsData: CPSData[] = [
        {
            id: 'CPS001',
            tipo: 'Sensor',
            localizacao: 'Linha1',
            status: 'Ativo',
            velocidade: 100,
            protocolo: 'MQTT'
        },
        {
            id: 'CPS002',
            tipo: 'Atuador',
            localizacao: 'Linha2',
            status: 'Inativo',
            velocidade: 0,
            protocolo: 'OPC-UA'
        },
        {
            id: 'CPS003',
            tipo: 'Atuador',
            localizacao: 'Linha1',
            status: 'Ativo',
            velocidade: 120,
            protocolo: 'HTTPS'
        },
        {
            id: 'CPS004',
            tipo: 'Atuador',
            localizacao: 'Linha1',
            status: 'Ativo',
            velocidade: 130,
            protocolo: 'HTTPS'
        },
        {
            id: 'CPS005',
            tipo: 'Sensor',
            localizacao: 'Linha2',
            status: 'Ativo',
            velocidade: 130,
            protocolo: 'HTTPS'
        },
        {
            id: 'CPS006',
            tipo: 'Atuador',
            localizacao: 'Linha1',
            status: 'Ativo',
            velocidade: 130,
            protocolo: 'HTTPS'
        }
        ,]

    // Salvar dados em um arquivo JSON
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir)
    }
    fs.writeFileSync(path.join(dataDir, 'cps-data.json'), JSON.stringify(cpsData, null, 2))

    return NextResponse.json(cpsData, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}