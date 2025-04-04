import { NextResponse } from 'next/server';
import {
    getUserInfoByChatId,
    updateUserInfo,
    deleteUserInfo
} from '@/app/utils/userInfo';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    try {
        const { chatId } = await params;

        if (!chatId) {
            return NextResponse.json(
                { error: 'Invalid chatId' },
                { status: 400 }
            );
        }

        const userInfo = await getUserInfoByChatId(chatId);
        return NextResponse.json(userInfo);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    try {
        const { chatId } = await params;
        const updates = await request.json();

        if (!chatId) {
            return NextResponse.json(
                { error: 'chatId is required' },
                { status: 400 }
            );
        }

        const user = await updateUserInfo(chatId, updates);
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
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

        await deleteUserInfo(chatId);
        return NextResponse.json(
            { message: 'User deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}