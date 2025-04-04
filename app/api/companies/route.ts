import { NextResponse } from 'next/server';
import { createCompany } from '@/app/utils/companies';

// POST - Create new company
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const company = await createCompany(body);
        return NextResponse.json(company, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Bad Request' },
            { status: 400 }
        );
    }
}