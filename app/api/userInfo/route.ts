import { NextResponse } from 'next/server';
import { registerUserInfo } from '@/app/utils/userInfo';
import { checkUserExists } from '@/app/utils/user';

export async function POST(request: Request) {
  try {
    const { chatId, nome, cpf, dataNascimento, email } = await request.json();

    if (!chatId || !nome || !cpf || !dataNascimento || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userExists = await checkUserExists(chatId);

    if (userExists === null) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    const user = await registerUserInfo(chatId, nome, cpf, dataNascimento, email);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}