import { NextRequest, NextResponse } from 'next/server';
import { createCompany, getCompanyByCNPJ, getCompanyByChatId, updateCompany, deleteCompany } from '@/app/utils/companies';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const company = await createCompany(body);
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cnpj = searchParams.get('cnpj');
    const chatId = searchParams.get('chatId');

    if (cnpj) {
      const company = await getCompanyByCNPJ(cnpj);
      return NextResponse.json(company, { status: 200 });
    }

    if (chatId) {
      const companies = await getCompanyByChatId(chatId);
      return NextResponse.json(companies, { status: 200 });
    }

    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updatedCompany = await updateCompany(body.cnpj, body);
    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cnpj = searchParams.get('cnpj');

    if (!cnpj) {
      return NextResponse.json({ error: 'Missing CNPJ parameter' }, { status: 400 });
    }

    await deleteCompany(cnpj);
    return NextResponse.json({ message: 'Company deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
