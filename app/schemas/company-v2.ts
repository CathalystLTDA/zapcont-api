import { z } from 'zod';

// Define the tax regime enum
const TaxRegimeEnum = z.enum([
  'isento',
  'microempreendedorIndividual',
  'simplesNacional',
  'lucroPresumido',
  'lucroReal',
  'none'
]);

// Define the city schema
const CitySchema = z.object({
  code: z.string().describe('Cód. do Município, segundo o Tabela de Municípios do IBGE'),
  name: z.string().describe('Nome do Município')
}).describe('Cidade do Endereço');

// Define the address schema
const AddressSchema = z.object({
  state: z.string().describe('Estado, ex.: SP, RJ, AC, padrão ISO 3166-2 ALFA 2.'),
  city: CitySchema,
  district: z.string().describe('Bairro do Endereço'),
  additionalInformation: z.string().optional().describe('Complemento do Endereço, ex.: AP 2, BL A.'),
  street: z.string().describe('Logradouro do Endereço'),
  number: z.string().describe('Número do Endereço. Usar S/N para "sem número".'),
  postalCode: z.string().describe('Cód. Endereço Postal (CEP)'),
  country: z.string().describe('País, ex.: BRA, ARG, USA, padrão ISO 3166-1 ALFA-3.')
}).describe('Endereço');

// Define the company schema
const CompanySchema = z.object({
  name: z.string().describe('Razão Social'),
  accountId: z.string().optional().describe('Identificador da conta'),
  tradeName: z.string().describe('Nome Fantasia'),
  federalTaxNumber: z.number().int().describe('Número de Inscrição Federal (CNPJ)'),
  taxRegime: TaxRegimeEnum.optional().describe('Regime Tributário'),
  address: AddressSchema
}).describe('Dados da Empresa');

// Define the body schema
const CompanyV2Schema = z.object({
  company: CompanySchema
});

export type Company = z.infer<typeof CompanySchema>;
export type CompanyBody = z.infer<typeof CompanyV2Schema>;

export default CompanyV2Schema;