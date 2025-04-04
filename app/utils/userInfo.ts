import { PrismaClient } from '@prisma/client';
import { checkUserExists } from './user';

const prisma = new PrismaClient();

export async function getUserInfoByChatId(chatId: string) {
  const userInfo = await prisma.userInfo.findUnique({
    where: { chatId },
  });

  if (!userInfo) {
    throw new Error('User not found');
  }

  return userInfo;
}

export async function registerUserInfo(
  chatId: string,
  nome: string,
  cpf: string,
  dataNascimento: string,
  email: string,
) {
  const userInfoExists = await checkUserInfoExists(chatId);
  console.log('userInfoExists', userInfoExists);
  if (userInfoExists) {
    throw new Error('User already exists');
  }

  const user = await prisma.userInfo.create({
    data: {
      chatId,
      nome,
      cpf,
      dataNascimento,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return user;
}

export async function updateUserInfo(chatId: string, updates: Partial<{ nome: string; cpf: string; dataNascimento: string; email: string }>) {
  const user = await prisma.userInfo.update({
    where: { chatId },
    data: {
      ...updates,
      updatedAt: new Date(),
    },
  });

  return user;
}

export async function deleteUserInfo(chatId: string) {
  await prisma.userInfo.delete({
    where: { chatId },
  });

  return { message: 'User deleted successfully' };
}

export async function checkUserInfoExists(chatId: string): Promise<boolean> {
  const user = await prisma.userInfo.findUnique({ where: { chatId } });
  return user !== null;
}
