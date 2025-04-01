import { z } from "zod";

// Esquema para City
const CitySchema = z.object({
  code: z.string(),
  name: z.string(),
  state: z.string(),
});

// Esquema para Address
const AddressSchema = z.object({
  country: z.string(),
  postalCode: z.string(),
  street: z.string(),
  number: z.string(),
  additionalInformation: z.string(),
  district: z.string(),
  city: CitySchema,
});

// Esquema para Location_t
const LocationSchema = z.object({
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  street: z.string(),
  number: z.string(),
  district: z.string(),
  additionalInformation: z.string(),
  city: CitySchema,
});

// Esquema para Provider
const ProviderSchema = z.object({
  id: z.string(),
  tradeName: z.string(),
  openningDate: z.string(), // data no formato ISO 8601
  taxRegime: z.enum(["Isento", "MicroempreendedorIndividual", "SimplesNacional", "LucroPresumido", "LucroReal"]),
  specialTaxRegime: z.enum([
    "Automatico", "Nenhum", "MicroempresaMunicipal", "Estimativa", "SociedadeDeProfissionais",
    "Cooperativa", "MicroempreendedorIndividual", "MicroempresarioEmpresaPequenoPorte"
  ]),
  legalNature: z.enum([
    "EmpresaPublica", "SociedadeEconomiaMista", "SociedadeAnonimaAberta", "SociedadeAnonimaFechada",
    "SociedadeEmpresariaLimitada", "SociedadeEmpresariaEmNomeColetivo", "SociedadeEmpresariaEmComanditaSimples",
    "SociedadeEmpresariaEmComanditaporAcoes", "SociedadeemContaParticipacao", "Empresario", "Cooperativa",
    "ConsorcioSociedades", "GrupoSociedades", "EmpresaDomiciliadaExterior", "ClubeFundoInvestimento",
    "SociedadeSimplesPura", "SociedadeSimplesLimitada", "SociedadeSimplesEmNomeColetivo",
    "SociedadeSimplesEmComanditaSimples", "EmpresaBinacional", "ConsorcioEmpregadores", "ConsorcioSimples",
    "EireliNaturezaEmpresaria", "EireliNaturezaSimples", "ServicoNotarial", "FundacaoPrivada",
    "ServicoSocialAutonomo", "CondominioEdilicio", "ComissaoConciliacaoPrevia", "EntidadeMediacaoArbitragem",
    "PartidoPolitico", "EntidadeSindical", "EstabelecimentoBrasilFundacaoAssociacaoEstrangeiras",
    "FundacaoAssociacaoDomiciliadaExterior", "OrganizacaoReligiosa", "ComunidadeIndigena",
    "FundoPrivado", "AssociacaoPrivada"
  ]),
  economicActivities: z.array(
    z.object({
      type: z.enum(["Main", "Secondary"]),
      code: z.number(),
    })
  ),
  companyRegistryNumber: z.number(),
  regionalTaxNumber: z.number(),
  municipalTaxNumber: z.string(),
  issRate: z.number(),
  federalTaxDetermination: z.enum(["NotInformed", "Default", "SimplesNacional"]),
  municipalTaxDetermination: z.enum(["NotInformed", "Default", "SimplesNacional"]),
  loginName: z.string(),
  loginPassword: z.string(),
  authIssueValue: z.string(),
  name: z.string(),
  federalTaxNumber: z.number(),
  email: z.string().email(),
  address: AddressSchema,
  status: z.enum(["Active", "Inactive", "Suspended"]),
  type: z.enum(["Undefined", "NaturalPerson", "LegalEntity", "LegalPerson", "Company", "Customer"]),
  createdOn: z.string(),
  modifiedOn: z.string(),
});

// Esquema para Borrower
const BorrowerSchema = z.object({
  parentId: z.string(),
  id: z.string(),
  name: z.string(),
  federalTaxNumber: z.number(),
  email: z.string().email(),
  address: AddressSchema,
});

// Esquema para ActivityEvent
const ActivityEventSchema = z.object({
  name: z.string(),
  startOn: z.string(),
  endOn: z.string(),
  atvEvId: z.string(),
});

// Esquema para ApproximateTax
const ApproximateTaxSchema = z.object({
  source: z.string(),
  version: z.string(),
  totalRate: z.number(),
});

// Esquema principal para NfseBody
export const NfseBodySchema = z.object({
  id: z.string(),
  environment: z.enum(["Development", "Production", "Staging"]),
  flowStatus: z.enum([
    "CancelFailed", "IssueFailed", "Issued", "Cancelled", "PullFromCityHall",
    "WaitingCalculateTaxes", "WaitingDefineRpsNumber", "WaitingSend",
    "WaitingSendCancel", "WaitingReturn", "WaitingDownload"
  ]),
  flowMessage: z.string(),
  provider: ProviderSchema,
  borrower: BorrowerSchema,
  externalId: z.string(),
  batchNumber: z.number(),
  batchCheckNumber: z.string(),
  number: z.number(),
  checkCode: z.string(),
  status: z.enum(["Error", "None", "Created", "Issued", "Cancelled"]),
  rpsType: z.enum(["Rps", "RpsMista", "Cupom"]),
  rpsStatus: z.enum(["Normal", "Canceled", "Lost"]),
  taxationType: z.enum([
    "None", "WithinCity", "OutsideCity", "Export", "Free", "Immune",
    "SuspendedCourtDecision", "SuspendedAdministrativeProcedure", "OutsideCityFree",
    "OutsideCityImmune", "OutsideCitySuspended", "OutsideCitySuspendedAdministrativeProcedure",
    "ObjectiveImune"
  ]),
  issuedOn: z.string(),
  cancelledOn: z.string(),
  rpsSerialNumber: z.string(),
  rpsNumber: z.number(),
  cityServiceCode: z.string(),
  federalServiceCode: z.string(),
  description: z.string(),
  servicesAmount: z.number(),
  deductionsAmount: z.number(),
  discountUnconditionedAmount: z.number(),
  discountConditionedAmount: z.number(),
  baseTaxAmount: z.number(),
  issRate: z.number(),
  issTaxAmount: z.number(),
  irAmountWithheld: z.number(),
  pisAmountWithheld: z.number(),
  cofinsAmountWithheld: z.number(),
  csllAmountWithheld: z.number(),
  inssAmountWithheld: z.number(),
  issAmountWithheld: z.number(),
  othersAmountWithheld: z.number(),
  amountWithheld: z.number(),
  amountNet: z.number(),
  location: LocationSchema,
  activityEvent: ActivityEventSchema,
  approximateTax: ApproximateTaxSchema,
  additionalInformation: z.string(),
  createdOn: z.string(),
  modifiedOn: z.string(),
});

// Tipo inferido do schema
export type NfseBody = z.infer<typeof NfseBodySchema>;