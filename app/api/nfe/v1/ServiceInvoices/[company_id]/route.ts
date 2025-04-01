import { NfseBodySchema } from "@/app/types/nfse";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_API_URL; // URL da API
const API_KEY = process.env.NFEIO_API_KEY; // Chave da API
export async function POST(req: NextRequest, context: { params: { company_id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("company_id");

    const body = await req.json();
    
    const parsedBody = NfseBodySchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid request body", details: parsedBody.error.format() }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/companies/${companyId}/serviceinvoices`, {
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
