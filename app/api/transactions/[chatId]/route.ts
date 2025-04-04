// app/api/transactions/[chatId]/route.ts
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    try {
        const { chatId } = await params;

        if (!chatId) {
            return NextResponse.json(
                { error: 'chatId is required' },
                { status: 400 }
            );
        }

        const transactions = await prisma.transaction.findMany({
            where: { chatId },
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}