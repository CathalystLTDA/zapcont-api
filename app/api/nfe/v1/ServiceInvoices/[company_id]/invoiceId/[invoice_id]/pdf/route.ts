// Arquivo: app/api/companies/[company_id]/serviceinvoices/[invoice_id]/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NFEIO_V1_API_URL;
const API_KEY = process.env.NFEIO_API_KEY;

// GET - Obter PDF da nota fiscal
export async function GET(req: NextRequest, context: { params: { company_id: string, invoice_id: string } }) {
  try {
    const { company_id, invoice_id } = await context.params;

    const response = await fetch(`${API_URL}/companies/${company_id}/serviceinvoices/${invoice_id}/pdf`, {
      method: "GET",
      headers: {
        "Accept": "application/pdf",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      // Tenta obter detalhes do erro
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Erro ao obter PDF" };
      }
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    // Obtém o PDF como buffer
    const pdfBuffer = await response.arrayBuffer();
    
    // Retorna o PDF com o tipo de conteúdo apropriado
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="nfe-${invoice_id}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno", details: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
  }
}