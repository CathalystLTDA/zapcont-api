import CompanyV2Schema from "@/app/schemas/company-v2";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V2_API_URL;
const API_KEY = process.env.NFEIO_API_KEY;

export async function GET(req: NextRequest, { params }: { params: Promise<{ company_id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.company_id;

    if (!id) {
      return NextResponse.json({ error: "ID ou CNPJ da empresa é obrigatório" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/companies/${id}`, {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ company_id: string }> }
) {
  try {
    // Get request body (company data to update)
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

    // Await the entire params object first
    const resolvedParams = await params;
    const id = resolvedParams.company_id;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/companies/${id}`, {
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
    console.error("Error updating company:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ company_id: string }> }
) {
  try {
    // Get company ID from the URL path parameter
    const id = (await params).company_id;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/companies/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({ message: "Empresa deletada com sucesso" });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}