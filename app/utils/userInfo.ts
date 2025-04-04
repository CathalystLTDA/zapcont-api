import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkCompanyExists(cnpj: string): Promise<boolean> {
  const companyExists = await prisma.companies.findUnique({
    where: { cnpj },
  });
  return Boolean(companyExists);
}

interface CreateCompanyInput {
  cnpj: string;
  chatId: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  bairro?: string;
  estado?: string;
  cep?: string;
}

export async function createCompany({
  cnpj,
  chatId,
  nomeFantasia = 'teste',
  razaoSocial = 'teste',
  telefone = 'teste',
  email = 'teste',
  endereco = 'teste',
  cidade = 'teste',
  bairro = 'teste',
  estado = 'teste',
  cep = 'teste',
}: CreateCompanyInput) {
  const companyExists = await checkCompanyExists(cnpj);
  if (companyExists) {
    throw new Error('Company already exists');
  }

  return await prisma.companies.create({
    data: {
      cnpj,
      chatId,
      nomeFantasia,
      razaoSocial,
      telefone,
      email,
      endereco,
      cidade,
      estado,
      bairro,
      cep,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function getCompanyByCNPJ(cnpj: string) {
  const company = await prisma.companies.findUnique({
    where: { cnpj },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  return company;
}

export async function getCompanyByChatId(chatId: string) {
  const company = await prisma.companies.findMany({
    where: { chatId },
  });

  if (!company.length) {
    throw new Error('Company not found');
  }

  return company;
}
