import { z } from 'zod';

// Definindo o esquema para o endereço
const AddressSchema = z.object({
  country: z.string(),
  postalCode: z.string(),
  street: z.string(),
  number: z.string(),
  additionalInformation: z.string(),
  district: z.string(),
  city: z.object({
    code: z.string(),
    name: z.string(),
  }),
  state: z.string(),
});

// Definindo o esquema para o evento de atividade
const ActivityEventSchema = z.object({
  name: z.string(),
  startOn: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "startOn deve ser uma data válida",
  }),
  endOn: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "endOn deve ser uma data válida",
  }),
  atvEvId: z.string(),
});

// Definindo o esquema para o imposto aproximado
const ApproximateTaxSchema = z.object({
  source: z.string(),
  version: z.string(),
  totalRate: z.number(),
});

// Definindo o esquema principal
const BorrowerSchema = z.object({
  type: z.enum(['Undefined', 'NaturalPerson', 'LegalEntity']),
  name: z.string(),
  federalTaxNumber: z.number(),
  municipalTaxNumber: z.string(),
  taxRegime: z.enum(['Isento', 'MicroempreendedorIndividual', 'SimplesNacional', 'LucroPresumido', 'LucroReal']),
  email: z.string().email(),
  address: AddressSchema,
});

export const ServiceSchema = z.object({
  borrower: BorrowerSchema,
  externalId: z.string(),
  cityServiceCode: z.string(),
  federalServiceCode: z.string(),
  cnaeCode: z.string(),
  description: z.string(),
  servicesAmount: z.number(),
  rpsSerialNumber: z.string(),
  issuedOn: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "issuedOn deve ser uma data válida",
  }),
  rpsNumber: z.number(),
  taxationType: z.enum([
    'None', 'WithinCity', 'OutsideCity', 'Export', 'Free', 'Immune',
    'SuspendedCourtDecision', 'SuspendedAdministrativeProcedure', 'OutsideCityFree',
    'OutsideCityImmune', 'OutsideCitySuspended', 'OutsideCitySuspendedAdministrativeProcedure',
    'ObjectiveImune',
  ]),
  issRate: z.number(),
  issTaxAmount: z.number(),
  deductionsAmount: z.number(),
  discountUnconditionedAmount: z.number(),
  discountConditionedAmount: z.number(),
  irAmountWithheld: z.number(),
  pisAmountWithheld: z.number(),
  cofinsAmountWithheld: z.number(),
  csllAmountWithheld: z.number(),
  inssAmountWithheld: z.number(),
  issAmountWithheld: z.number(),
  othersAmountWithheld: z.number(),
  approximateTax: ApproximateTaxSchema,
  additionalInformation: z.string(),
  location: AddressSchema,
  activityEvent: ActivityEventSchema,
});