import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserInfoByChatId(chatId: string) {
  const userInfo = await prisma.userInfo.findUnique({
    where: { chatId },
  });
  return Boolean(companyExists);
}

interface CreateCompanyInput {
  cnpj: string;
  chatId: string;
  nomeFantasia: string;
  razaoSocial: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  bairro: string;
  estado: string;
  cep: string;
}

export async function createCompany({
  cnpj,
  chatId,
  nomeFantasia,
  razaoSocial,
  telefone,
  email,
  endereco,
  cidade,
  bairro,
  estado,
  cep
}: CreateCompanyInput) {
  const companyExists = await checkCompanyExists(cnpj);
  if (companyExists) {
    throw new Error('Company already exists');
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

async function updateUser(chatId: string, updates: Partial<{ nome: string; cpf: string; dataNascimento: string; email: string }>) {
  const user = await prisma.userState.update({
    where: { chatId },
    data: {
      ...updates,
      updatedAt: new Date(),
    },
  });

  return user;
}

async function deleteUser(chatId: string) {
  await prisma.userState.delete({
    where: { chatId },
  });

  return { message: 'User deleted successfully' };
}

async function checkUserExists(chatId: string): Promise<boolean> {
  const user = await prisma.userState.findUnique({ where: { chatId } });
  return !!user;
}
