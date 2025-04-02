import { z } from 'zod';

// Enums from the interface
const OperationType = z.enum(['Outgoing', 'Incoming']);
const Destination = z.enum(['None', 'Internal_Operation', 'Interstate_Operation', 'International_Operation']);
const PrintType = z.enum(['None', 'NFeNormalPortrait', 'NFeNormalLandscape', 'NFeSimplified', 'DANFE_NFC_E', 'DANFE_NFC_E_MSG_ELETRONICA']);
const PurposeType = z.enum(['None', 'Normal', 'Complement', 'Adjustment', 'Devolution']);
const ConsumerType = z.enum(['FinalConsumer', 'Normal']);
const PresenceType = z.enum(['None', 'Presence', 'Internet', 'Telephone', 'Delivery', 'OthersNonPresenceOperation']);
const PersonType = z.enum(['Undefined', 'NaturalPerson', 'LegalEntity', 'Company', 'Customer']);
const ReceiverStateTaxIndicator = z.enum(['None', 'TaxPayer', 'Exempt', 'NonTaxPayer']);
const TaxRegime = z.enum(['None', 'LucroReal', 'LucroPresumido', 'SimplesNacional', 'SimplesNacionalExcessoSublimite', 'MicroempreendedorIndividual', 'Isento']);
const ShippingModality = z.enum(['ByIssuer', 'ByReceiver', 'ByThirdParties', 'OwnBySender', 'OwnByBuyer', 'Free']);
const StateCode = z.enum(['NA', 'RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF', 'EX']);
const InternationalTransportType = z.enum(['None', 'Maritime', 'River', 'Lake', 'Airline', 'Postal', 'Railway', 'Highway', 'Network', 'Own', 'Ficta', 'Courier', 'Handcarry']);
const IntermediationType = z.enum(['None', 'ByOwn', 'ImportOnBehalf', 'ByOrder']);
const ExemptReason = z.enum(['Agriculture', 'Others', 'DevelopmentEntities']);
const DuductionIndicator = z.enum(['NotDeduct', 'Deduce']);

// Helper schemas
const dateSchema = z.string().datetime({ offset: true });
const nullableString = z.string().nullable();
const nullableNumber = z.number().nullable();
const nullableBoolean = z.boolean().nullable();

// Address related schemas
const CityResource = z.object({
  code: nullableString,
  name: nullableString,
});

const AddressResource = z.object({
  state: nullableString,
  city: CityResource.nullable(),
  district: nullableString,
  additionalInformation: nullableString,
  street: nullableString,
  number: nullableString,
  postalCode: nullableString,
  country: nullableString,
  phone: nullableString,
});

// Payment related schemas
const CardResource = z.object({
  federalTaxNumber: nullableString,
  flag: z.enum(['None']), // Assuming other possible values not provided
  authorization: nullableString,
  integrationPaymentType: z.enum(['Integrated']), // Assuming other possible values not provided
  federalTaxNumberRecipient: nullableString,
  idPaymentTerminal: nullableString,
});

const PaymentDetailResource = z.object({
  method: z.enum(['Cash']), // Assuming other possible values not provided
  methodDescription: nullableString,
  paymentType: z.enum(['InCash']), // Assuming other possible values not provided
  amount: z.number(),
  card: CardResource.nullable(),
  paymentDate: dateSchema.nullable(),
  federalTaxNumberPag: nullableString,
  statePag: nullableString,
});

const PaymentResource = z.object({
  paymentDetail: z.array(PaymentDetailResource),
  payBack: nullableNumber,
});

// Buyer related schemas
const BuyerResource = z.object({
  accountId: nullableString,
  id: nullableString,
  name: nullableString,
  federalTaxNumber: nullableNumber,
  email: nullableString,
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumberIndicator: ReceiverStateTaxIndicator,
  tradeName: nullableString,
  taxRegime: TaxRegime,
  stateTaxNumber: nullableString,
});

// Transport related schemas
const TransportGroupResource = z.object({
  accountId: nullableString,
  id: nullableString,
  name: nullableString,
  federalTaxNumber: nullableNumber,
  email: nullableString,
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: nullableString,
  transportRetention: nullableString,
});

const ReboqueResource = z.object({
  plate: nullableString,
  uf: nullableString,
  rntc: nullableString,
  wagon: nullableString,
  ferry: nullableString,
});

const VolumeResource = z.object({
  volumeQuantity: nullableNumber,
  species: nullableString,
  brand: nullableString,
  volumeNumeration: nullableString,
  netWeight: nullableNumber,
  grossWeight: nullableNumber,
});

const TransportVehicleResource = z.object({
  plate: nullableString,
  state: nullableString,
  rntc: nullableString,
});

const TransportRateResource = z.object({
  serviceAmount: nullableNumber,
  bcRetentionAmount: nullableNumber,
  icmsRetentionRate: nullableNumber,
  icmsRetentionAmount: nullableNumber,
  cfop: nullableNumber,
  cityGeneratorFactCode: nullableNumber,
});

const TransportInformationResource = z.object({
  freightModality: ShippingModality,
  transportGroup: TransportGroupResource.nullable(),
  reboque: ReboqueResource.nullable(),
  volume: VolumeResource.nullable(),
  transportVehicle: TransportVehicleResource.nullable(),
  sealNumber: nullableString,
  transpRate: TransportRateResource.nullable(),
});

// Additional information schemas
const TaxCouponInformationResource = z.object({
  modelDocumentFiscal: nullableString,
  orderECF: nullableString,
  orderCountOperation: nullableNumber,
});

const DocumentInvoiceReferenceResource = z.object({
  state: nullableNumber,
  yearMonth: nullableString,
  federalTaxNumber: nullableString,
  model: nullableString,
  series: nullableString,
  number: nullableString,
});

const DocumentElectronicInvoiceResource = z.object({
  accessKey: nullableString,
});

const TaxDocumentsReferenceResource = z.object({
  taxCouponInformation: TaxCouponInformationResource.nullable(),
  documentInvoiceReference: DocumentInvoiceReferenceResource.nullable(),
  documentElectronicInvoice: DocumentElectronicInvoiceResource.nullable(),
});

const TaxpayerCommentsResource = z.object({
  field: nullableString,
  text: nullableString,
});

const ReferencedProcessResource = z.object({
  identifierConcessory: nullableString,
  identifierOrigin: nullableNumber,
  concessionActType: nullableNumber,
});

const AdditionalInformationResource = z.object({
  fisco: nullableString,
  taxpayer: nullableString,
  xmlAuthorized: z.array(z.number()).nullable(),
  effort: nullableString,
  order: nullableString,
  contract: nullableString,
  taxDocumentsReference: z.array(TaxDocumentsReferenceResource).nullable(),
  taxpayerComments: z.array(TaxpayerCommentsResource).nullable(),
  referencedProcess: z.array(ReferencedProcessResource).nullable(),
});

const ExportResource = z.object({
  state: StateCode,
  office: nullableString,
  local: nullableString,
});

// Items related schemas
const CIDEResource = z.object({
  bc: nullableNumber,
  rate: nullableNumber,
  cideAmount: nullableNumber,
});

const PumpResource = z.object({
  spoutNumber: nullableNumber,
  number: nullableNumber,
  tankNumber: nullableNumber,
  beginningAmount: nullableNumber,
  endAmount: nullableNumber,
  percentageBio: nullableNumber,
});

const FuelOriginResource = z.object({
  indImport: nullableNumber,
  cUFOrig: nullableNumber,
  pOrig: nullableNumber,
});

const FuelResource = z.object({
  codeANP: nullableString,
  percentageNG: nullableNumber,
  descriptionANP: nullableString,
  percentageGLP: nullableNumber,
  percentageNGn: nullableNumber,
  percentageGNi: nullableNumber,
  startingAmount: nullableNumber,
  codif: nullableString,
  amountTemp: nullableNumber,
  stateBuyer: nullableString,
  cide: CIDEResource.nullable(),
  pump: PumpResource.nullable(),
  fuelOrigin: FuelOriginResource.nullable(),
});

const IcmsTaxResource = z.object({
  origin: nullableString,
  cst: nullableString,
  csosn: nullableString,
  baseTaxModality: nullableString,
  baseTax: nullableNumber,
  baseTaxSTModality: nullableString,
  baseTaxSTReduction: nullableString,
  baseTaxST: nullableNumber,
  baseTaxReduction: nullableNumber,
  stRate: nullableNumber,
  stAmount: nullableNumber,
  stMarginAmount: nullableNumber,
  rate: nullableNumber,
  amount: nullableNumber,
  percentual: nullableNumber,
  snCreditRate: nullableNumber,
  snCreditAmount: nullableNumber,
  stMarginAddedAmount: nullableString,
  stRetentionAmount: nullableString,
  baseSTRetentionAmount: nullableString,
  baseTaxOperationPercentual: nullableString,
  ufst: nullableString,
  amountSTReason: nullableString,
  baseSNRetentionAmount: nullableString,
  snRetentionAmount: nullableString,
  amountOperation: nullableString,
  percentualDeferment: nullableString,
  baseDeferred: nullableString,
  exemptAmount: nullableNumber,
  exemptReason: ExemptReason,
  exemptAmountST: nullableNumber,
  exemptReasonST: ExemptReason,
  fcpRate: nullableNumber,
  fcpAmount: nullableNumber,
  fcpstRate: nullableNumber,
  fcpstAmount: nullableNumber,
  fcpstRetRate: nullableNumber,
  fcpstRetAmount: nullableNumber,
  baseTaxFCPSTAmount: nullableNumber,
  substituteAmount: nullableNumber,
  stFinalConsumerRate: nullableNumber,
  effectiveBaseTaxReductionRate: nullableNumber,
  effectiveBaseTaxAmount: nullableNumber,
  effectiveRate: nullableNumber,
  effectiveAmount: nullableNumber,
  deductionIndicator: DuductionIndicator,
});

const IPITaxResource = z.object({
  cst: nullableString,
  classificationCode: nullableString,
  classification: nullableString,
  producerCNPJ: nullableString,
  stampCode: nullableString,
  stampQuantity: nullableNumber,
  base: nullableNumber,
  rate: nullableNumber,
  unitQuantity: nullableNumber,
  unitAmount: nullableNumber,
  amount: nullableNumber,
});

const IITaxResource = z.object({
  baseTax: nullableString,
  customsExpenditureAmount: nullableString,
  amount: nullableNumber,
  iofAmount: nullableNumber,
  vEnqCamb: nullableNumber,
});

const PISTaxResource = z.object({
  cst: nullableString,
  baseTax: nullableNumber,
  rate: nullableNumber,
  amount: nullableNumber,
  baseTaxProductQuantity: nullableNumber,
  productRate: nullableNumber,
});

const CofinsTaxResource = z.object({
  cst: nullableString,
  baseTax: nullableNumber,
  rate: nullableNumber,
  amount: nullableNumber,
  baseTaxProductQuantity: nullableNumber,
  productRate: nullableNumber,
});

const ICMSUFDestinationTaxResource = z.object({
  vBCUFDest: nullableNumber,
  pFCPUFDest: nullableNumber,
  pICMSUFDest: nullableNumber,
  pICMSInter: nullableNumber,
  pICMSInterPart: nullableNumber,
  vFCPUFDest: nullableNumber,
  vICMSUFDest: nullableNumber,
  vICMSUFRemet: nullableNumber,
  vBCFCPUFDest: nullableNumber,
});

const InvoiceItemTaxResource = z.object({
  totalTax: nullableNumber,
  icms: IcmsTaxResource.nullable(),
  ipi: IPITaxResource.nullable(),
  ii: IITaxResource.nullable(),
  pis: PISTaxResource.nullable(),
  cofins: CofinsTaxResource.nullable(),
  icmsDestination: ICMSUFDestinationTaxResource.nullable(),
});

const AdditionResource = z.object({
  code: nullableNumber,
  manufacturer: nullableString,
  amount: nullableNumber,
  drawback: nullableNumber,
});

const ImportDeclarationResource = z.object({
  code: nullableString,
  registeredOn: dateSchema.nullable(),
  customsClearanceName: nullableString,
  customsClearanceState: StateCode,
  customsClearancedOn: dateSchema.nullable(),
  additions: z.array(AdditionResource).nullable(),
  exporter: nullableString,
  internationalTransport: InternationalTransportType,
  intermediation: IntermediationType,
  acquirerFederalTaxNumber: nullableString,
  stateThird: nullableString,
});

const ExportHintResource = z.object({
  registryId: nullableString,
  accessKey: nullableString,
  quantity: nullableNumber,
});

const ExportDetailResource = z.object({
  drawback: nullableString,
  hintInformation: ExportHintResource.nullable(),
});

const TaxDeterminationResource = z.object({
  operationCode: nullableNumber,
  issuerTaxProfile: nullableString,
  buyerTaxProfile: nullableString,
  origin: nullableString,
  acquisitionPurpose: nullableString,
});

const InvoiceItemResource = z.object({
  code: nullableString,
  codeGTIN: nullableString,
  description: nullableString,
  ncm: nullableString,
  nve: z.array(z.string()).nullable(),
  extipi: nullableString,
  cfop: nullableNumber,
  unit: nullableString,
  quantity: nullableNumber,
  unitAmount: nullableNumber,
  totalAmount: nullableNumber,
  codeTaxGTIN: nullableString,
  unitTax: nullableString,
  quantityTax: nullableNumber,
  taxUnitAmount: nullableNumber,
  freightAmount: nullableNumber,
  insuranceAmount: nullableNumber,
  discountAmount: nullableNumber,
  othersAmount: nullableNumber,
  totalIndicator: nullableBoolean,
  cest: nullableString,
  tax: InvoiceItemTaxResource.nullable(),
  additionalInformation: nullableString,
  numberOrderBuy: nullableString,
  itemNumberOrderBuy: nullableNumber,
  importControlSheetNumber: nullableString,
  fuelDetail: FuelResource.nullable(),
  benefit: nullableString,
  importDeclarations: z.array(ImportDeclarationResource).nullable(),
  exportDetails: z.array(ExportDetailResource).nullable(),
  taxDetermination: TaxDeterminationResource.nullable(),
});

// Billing related schemas
const BillResource = z.object({
  number: nullableString,
  originalAmount: nullableNumber,
  discountAmount: nullableNumber,
  netAmount: nullableNumber,
});

const DuplicateResource = z.object({
  number: nullableString,
  expirationOn: dateSchema.nullable(),
  amount: nullableNumber,
});

const BillingResource = z.object({
  bill: BillResource.nullable(),
  duplicates: z.array(DuplicateResource).nullable(),
});

// Other resources
const IssuerFromRequestResource = z.object({
  stStateTaxNumber: nullableString,
});

const IntermediateResource = z.object({
  federalTaxNumber: nullableNumber,
  identifier: nullableString,
});

const DeliveryInformationResource = z.object({
  accountId: nullableString,
  id: nullableString,
  name: nullableString,
  federalTaxNumber: nullableNumber,
  email: nullableString,
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: nullableString,
});

const WithdrawalInformationResource = z.object({
  accountId: nullableString,
  id: nullableString,
  name: nullableString,
  federalTaxNumber: nullableNumber,
  email: nullableString,
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: nullableString,
});

// Totals schemas
const ICMSTotal = z.object({
  baseTax: nullableNumber,
  icmsAmount: nullableNumber,
  icmsExemptAmount: nullableNumber,
  stCalculationBasisAmount: nullableNumber,
  stAmount: nullableNumber,
  productAmount: z.number(),
  freightAmount: nullableNumber,
  insuranceAmount: nullableNumber,
  discountAmount: nullableNumber,
  iiAmount: nullableNumber,
  ipiAmount: nullableNumber,
  pisAmount: nullableNumber,
  cofinsAmount: nullableNumber,
  othersAmount: nullableNumber,
  invoiceAmount: z.number(),
  fcpufDestinationAmount: nullableNumber,
  icmsufDestinationAmount: nullableNumber,
  icmsufSenderAmount: nullableNumber,
  federalTaxesAmount: z.number(),
  fcpAmount: nullableNumber,
  fcpstAmount: nullableNumber,
  fcpstRetAmount: nullableNumber,
  ipiDevolAmount: nullableNumber,
  qBCMono: nullableNumber,
  vICMSMono: nullableNumber,
  qBCMonoReten: nullableNumber,
  vICMSMonoReten: nullableNumber,
  qBCMonoRet: nullableNumber,
  vICMSMonoRet: nullableNumber,
});

const ISSQNTotal = z.object({
  totalServiceNotTaxedICMS: nullableNumber,
  baseRateISS: nullableNumber,
  totalISS: nullableNumber,
  valueServicePIS: nullableNumber,
  valueServiceCOFINS: nullableNumber,
  provisionService: dateSchema.nullable(),
  deductionReductionBC: nullableNumber,
  valueOtherRetention: nullableNumber,
  discountUnconditional: nullableNumber,
  discountConditioning: nullableNumber,
  totalRetentionISS: nullableNumber,
  codeTaxRegime: nullableNumber,
});

const Total = z.object({
  icms: ICMSTotal.nullable(),
  issqn: ISSQNTotal.nullable(),
});

// Main schema
export const ProductSchema = z.object({
  id: nullableString,
  payment: z.array(PaymentResource).nullable(),
  serie: nullableNumber,
  number: nullableNumber,
  operationOn: dateSchema.nullable(),
  operationNature: nullableString,
  operationType: OperationType,
  destination: Destination,
  printType: PrintType,
  purposeType: PurposeType,
  consumerType: ConsumerType,
  presenceType: PresenceType,
  contingencyOn: dateSchema.nullable(),
  contingencyJustification: nullableString,
  buyer: BuyerResource.nullable(),
  transport: TransportInformationResource.nullable(),
  additionalInformation: AdditionalInformationResource.nullable(),
  export: ExportResource.nullable(),
  items: z.array(InvoiceItemResource).nullable(),
  billing: BillingResource.nullable(),
  issuer: IssuerFromRequestResource.nullable(),
  transactionIntermediate: IntermediateResource.nullable(),
  delivery: DeliveryInformationResource.nullable(),
  withdrawal: WithdrawalInformationResource.nullable(),
  totals: Total.nullable(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;