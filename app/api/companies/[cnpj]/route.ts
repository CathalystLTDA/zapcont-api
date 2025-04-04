import { NextResponse } from 'next/server';
import { getCompanyByCNPJ, updateCompany, deleteCompany } from '@/app/utils/companies';

// GET - Single company by CNPJ
export async function GET(
    req: Request,
    { params }: { params: Promise<{ cnpj: string }> }
) {
    try {
        const { cnpj } = await params;

        const company = await getCompanyByCNPJ(cnpj);
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Not Found' },
            { status: 404 }
        );
    }
}

// PUT - Update company
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ cnpj: string }> }
) {
    try {
        const body = await req.json();
        const { cnpj } = await params;
        if (!cnpj) {
            return NextResponse.json(
                { error: 'CNPJ is required' },
                { status: 400 }
            );
        }
        const updatedCompany = await updateCompany(cnpj, body);
        return NextResponse.json(updatedCompany, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Bad Request' },
            { status: 400 }
        );
    }
}

// DELETE - Remove company
export async function DELETE(
    req: Request,
    { params }: { params: { cnpj: string } }
) {
    try {
        await deleteCompany(params.cnpj);
        return NextResponse.json(
            { message: 'Company deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Bad Request' },
            { status: 400 }
        );
    }
}