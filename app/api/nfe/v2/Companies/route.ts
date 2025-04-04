
import CompanyV2Schema from "@/app/schemas/company-v2";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V2_API_URL;
const API_KEY = process.env.NFEIO_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Valida os dados com Zod
    const validation = CompanyV2Schema.safeParse(body);

    if (!validation.success) {
      // Extrai os erros de forma mais legível
      const formattedErrors = validation.error.errors.map(err => ({
        path: err.path.join("."), // Junta os caminhos para mostrar "address.city.code" por exemplo
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: "Erro de validação",
          issues: formattedErrors, // Lista de erros com nomes dos campos
        },
        { status: 400 }
      );
    }

    // Se passou na validação, continua com a requisição
    const response = await fetch(`${API_URL}/companies`, {
      method: "POST",
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
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: "Erro interno", details: errorMessage }, { status: 500 });
  }
}

// Método GET para listar empresas
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/companies`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}


