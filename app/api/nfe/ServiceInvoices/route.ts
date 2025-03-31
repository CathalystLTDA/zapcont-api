/* eslint-disable @typescript-eslint/no-unused-vars */
import { NfseBody } from '@/app/@types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { company_id, body }: { company_id: string, body: NfseBody } = await req.json()

    if (!company_id || !body) {
      return NextResponse.json({ error: 'Missing company_id or body' }, { status: 400 })
    }
    const response = await fetch(`${process.env.NFEIO_API_URL}/companies/${company_id}/serviceinvoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NFEIO_API_KEY}`, // Certifique-se de ter sua chave de API configurada no .env
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (response.status === 400) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
    if (response.status === 401) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (response.status === 408) {
      return NextResponse.json({ error: 'Time limit exceeded' }, { status: 408 })
    }
    if (!response.ok) {
      return NextResponse.json({ status: response.status })
    }

    return NextResponse.json({ data: data, status: 202 }) // Retorna a resposta da API da NFE.io
  } catch (error) {
    return NextResponse.json({ error: 'Error processing', status: 500 }) // Retorna um erro genérico
  }
}
