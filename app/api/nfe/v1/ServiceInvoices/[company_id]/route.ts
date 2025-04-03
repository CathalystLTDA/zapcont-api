import { ServiceSchema } from "@/app/schemas/service";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V1_API_URL; // URL da API
const API_KEY = process.env.NFEIO_API_KEY; // Chave da API

export async function POST(req: NextRequest, context: { params: Promise<{ company_id: string }> }) {
  try {
    // Pegando o company_id diretamente do context.params
    const { company_id } = await context.params;

    const body = await req.json();

    const parsedBody = ServiceSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid request body", details: parsedBody.error.format() }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/companies/${company_id}/serviceinvoices`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(parsedBody.data),
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

export async function GET(req: NextRequest, context: { params: Promise<{ company_id: string }> }) {
  try {
    const { company_id } = await context.params;

    const response = await fetch(`${API_URL}/companies/${company_id}/serviceinvoices`, {
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
