import { NextResponse } from 'next/server';
import { TransactionType } from '@prisma/client';
import { registerTransaction } from '@/app/utils/transactions';


export async function POST(request: Request) {
    try {
        const { amount, description, type, chatId } = await request.json();

        if (!amount || !description || !type || !chatId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!Object.values(TransactionType).includes(type)) {
            return NextResponse.json(
                { error: 'Invalid transaction type' },
                { status: 400 }
            );
        }

        const newTransaction = await registerTransaction(
            amount,
            description,
            type,
            chatId
        );

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}