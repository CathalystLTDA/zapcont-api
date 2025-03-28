type Provider = {
  id: string;
  tradeName: string;
  openningDate: string; // data no formato ISO 8601 ex: 2023-10-21
  taxRegime: "Isento" | "MicroempreendedorIndividual" | "SimplesNacional" | "LucroPresumido" | "LucroReal";
  specialTaxRegime: "Automatico" | "Nenhum" | "MicroempresaMunicipal" | "Estimativa" | "SociedadeDeProfissionais" | "Cooperativa" | "MicroempreendedorIndividual" | "MicroempresarioEmpresaPequenoPorte";
  legalNature: "EmpresaPublica" | "SociedadeEconomiaMista" | "SociedadeAnonimaAberta" | "SociedadeAnonimaFechada" | "SociedadeEmpresariaLimitada" | "SociedadeEmpresariaEmNomeColetivo" | "SociedadeEmpresariaEmComanditaSimples" | "SociedadeEmpresariaEmComanditaporAcoes" | "SociedadeemContaParticipacao" | "Empresario" | "Cooperativa" | "ConsorcioSociedades" | "GrupoSociedades" | "EmpresaDomiciliadaExterior" | "ClubeFundoInvestimento" | "SociedadeSimplesPura" | "SociedadeSimplesLimitada" | "SociedadeSimplesEmNomeColetivo" | "SociedadeSimplesEmComanditaSimples" | "EmpresaBinacional" | "ConsorcioEmpregadores" | "ConsorcioSimples" | "EireliNaturezaEmpresaria" | "EireliNaturezaSimples" | "ServicoNotarial" | "FundacaoPrivada" | "ServicoSocialAutonomo" | "CondominioEdilicio" | "ComissaoConciliacaoPrevia" | "EntidadeMediacaoArbitragem" | "PartidoPolitico" | "EntidadeSindical" | "EstabelecimentoBrasilFundacaoAssociacaoEstrangeiras" | "FundacaoAssociacaoDomiciliadaExterior" | "OrganizacaoReligiosa" | "ComunidadeIndigena" | "FundoPrivado" | "AssociacaoPrivada";
  economicActivities: Array<{ type: "Main" | "Secondary"; code: number }>;
  companyRegistryNumber: number;
  regionalTaxNumber: number;
  municipalTaxNumber: string;
  issRate: number;
  federalTaxDetermination: "NotInformed" | "Default" | "SimplesNacional";
  municipalTaxDetermination: "NotInformed" | "Default" | "SimplesNacional";
  loginName: string;
  loginPassword: string;
  authIssueValue: string;
  name: string;
  federalTaxNumber: number;
  email: string;
  address: Address;
  status: "Active" | "Inactive" | "Suspended";
  type: "Undefined" | "NaturalPerson" | "LegalEntity" | "LegalPerson" | "Company" | "Customer";
  createdOn: string;
  modifiedOn: string;
};

type Borrower = {
  parentId: string;
  id: string;
  name: string;
  federalTaxNumber: number;
  email: string;
  address: Address;
};

type Address = {
  country: string;
  postalCode: string;
  street: string;
  number: string;
  additionalInformation: string;
  district: string;
  city: City;
};

type City = {
  code: string;
  name: string;
  state: string;
};

type Location_t = {
  state: string;
  country: string;
  postalCode: string;
  street: string;
  number: string;
  district: string;
  additionalInformation: string;
  city: City;
};

type ActivityEvent = {
  name: string;
  startOn: string;
  endOn: string;
  atvEvId: string;
};

type ApproximateTax = {
  source: string;
  version: string;
  totalRate: number;
};

export type NfseBody = {
  id: string;
  environment: 'Development' | 'Production' | 'Staging';
  flowStatus: 'CancelFailed' | 'IssueFailed' | 'Issued' | 'Cancelled' | 'PullFromCityHall' | 'WaitingCalculateTaxes' | 'WaitingDefineRpsNumber' | 'WaitingSend' | 'WaitingSendCancel' | 'WaitingReturn' | 'WaitingDownload';
  flowMessage: string;
  provider: Provider;
  borrower: Borrower;
  externalId: string;
  batchNumber: number;
  batchCheckNumber: string;
  number: number;
  checkCode: string;
  status: 'Error' | 'None' | 'Created' | 'Issued' | 'Cancelled';
  rpsType: 'Rps' | 'RpsMista' | 'Cupom';
  rpsStatus: 'Normal' | 'Canceled' | 'Lost';
  taxationType: 'None' | 'WithinCity' | 'OutsideCity' | 'Export' | 'Free' | 'Immune' | 'SuspendedCourtDecision' | 'SuspendedAdministrativeProcedure' | 'OutsideCityFree' | 'OutsideCityImmune' | 'OutsideCitySuspended' | 'OutsideCitySuspendedAdministrativeProcedure' | 'ObjectiveImune';
  issuedOn: string;
  cancelledOn: string;
  rpsSerialNumber: string;
  rpsNumber: number;
  cityServiceCode: string;
  federalServiceCode: string;
  description: string;
  servicesAmount: number;
  deductionsAmount: number;
  discountUnconditionedAmount: number;
  discountConditionedAmount: number;
  baseTaxAmount: number;
  issRate: number;
  issTaxAmount: number;
  irAmountWithheld: number;
  pisAmountWithheld: number;
  cofinsAmountWithheld: number;
  csllAmountWithheld: number;
  inssAmountWithheld: number;
  issAmountWithheld: number;
  othersAmountWithheld: number;
  amountWithheld: number;
  amountNet: number;
  location: Location_t;
  activityEvent: ActivityEvent;
  approximateTax: ApproximateTax;
  additionalInformation: string;
  createdOn: string;
  modifiedOn: string;
}