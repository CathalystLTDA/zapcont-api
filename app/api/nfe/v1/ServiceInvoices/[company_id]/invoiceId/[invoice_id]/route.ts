import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V1_API_URL; // URL da API
const API_KEY = process.env.NFEIO_API_KEY; // Chave da API

export async function GET(req: NextRequest, context: { params: { company_id: string, invoice_id: string } }) {
  try {
    // Pegando o company_id diretamente do context.params
    const { company_id, invoice_id } = await context.params;

    const response = await fetch(`${API_URL}/companies/${company_id}/serviceinvoices/${invoice_id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno", details: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
  }
}

// PUT - Enviar email da nota fiscal
export async function PUT(req: NextRequest, context: { params: { company_id: string, invoice_id: string } }) {
  try {
    const { company_id, invoice_id } = await context.params;
    const body = await req.json();

    const response = await fetch(`${API_URL}/companies/${company_id}/serviceinvoices/${invoice_id}/sendemail`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno", details: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
  }
}