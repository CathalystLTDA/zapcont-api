import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V1_API_URL;
const API_KEY = process.env.NFEIO_API_KEY;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ company_id: string }> }
) {
  try {
    const id = (await params).company_id;
    
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
    const id = (await params).company_id;
    
    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }
    
    // Get request body (company data to update)
    const body = await req.json();
    
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