import { z } from 'zod';

// Enums
const PaymentMethod = z.enum([
  'Cash', 'Cheque', 'CreditCard', 'DebitCard', 'StoreCredict',
  'FoodVouchers', 'MealVouchers', 'GiftVouchers', 'FuelVouchers',
  'BankBill', 'BankDeposit', 'InstantPayment', 'WireTransfer',
  'Cashback', 'WithoutPayment', 'Others'
]);

const PaymentType = z.enum(['InCash', 'Term']);

const FlagCard = z.enum([
  'None', 'Visa', 'Mastercard', 'AmericanExpress', 'Sorocred',
  'DinersClub', 'Elo', 'Hipercard', 'Aura', 'Cabal', 'Alelo',
  'BanesCard', 'CalCard', 'Credz', 'Discover', 'GoodCard',
  'GreenCard', 'Hiper', 'JCB', 'Mais', 'MaxVan', 'Policard',
  'RedeCompras', 'Sodexo', 'ValeCard', 'Verocheque', 'VR',
  'Ticket', 'Other'
]);

const IntegrationPaymentType = z.enum(['Integrated', 'NotIntegrated']);

const OperationType = z.enum(['Outgoing', 'Incoming']);

const Destination = z.enum([
  'None', 'Internal_Operation', 'Interstate_Operation', 'International_Operation'
]);

const PrintType = z.enum([
  'None', 'NFeNormalPortrait', 'NFeNormalLandscape', 'NFeSimplified',
  'DANFE_NFC_E', 'DANFE_NFC_E_MSG_ELETRONICA'
]);

const PurposeType = z.enum([
  'None', 'Normal', 'Complement', 'Adjustment', 'Devolution'
]);

const ConsumerType = z.enum(['FinalConsumer', 'Normal']);

const ConsumerPresenceType = z.enum([
  'None', 'Presence', 'Internet', 'Telephone', 'Delivery', 'OthersNonPresenceOperation'
]);

const PersonType = z.enum([
  'Undefined', 'NaturalPerson', 'LegalEntity', 'Company', 'Customer'
]);

const ReceiverStateTaxIndicator = z.enum([
  'None', 'TaxPayer', 'Exempt', 'NonTaxPayer'
]);

const TaxRegime = z.enum([
  'None', 'LucroReal', 'LucroPresumido', 'SimplesNacional',
  'SimplesNacionalExcessoSublimite', 'MicroempreendedorIndividual', 'Isento'
]);

const ShippingModality = z.enum([
  'ByIssuer', 'ByReceiver', 'ByThirdParties', 'OwnBySender', 'OwnByBuyer', 'Free'
]);

const StateCode = z.enum([
  'NA', 'RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB',
  'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT',
  'GO', 'DF', 'EX'
]);

const ExemptReason = z.enum(['Agriculture', 'Others', 'DevelopmentEntities']);

const DuductionIndicator = z.enum(['NotDeduct', 'Deduce']);

const InternationalTransportType = z.enum([
  'None', 'Maritime', 'River', 'Lake', 'Airline', 'Postal', 'Railway',
  'Highway', 'Network', 'Own', 'Ficta', 'Courier', 'Handcarry'
]);

const IntermediationType = z.enum([
  'None', 'ByOwn', 'ImportOnBehalf', 'ByOrder'
]);

// Helper schemas
const CityResource = z.object({
  code: z.string().nullable(),
  name: z.string().nullable()
});

const AddressResource = z.object({
  state: z.string().nullable(),
  city: CityResource.nullable(),
  district: z.string().nullable(),
  additionalInformation: z.string().nullable(),
  street: z.string().nullable(),
  number: z.string().nullable(),
  postalCode: z.string().nullable(),
  country: z.string().nullable(),
  phone: z.string().nullable()
});

const CardResource = z.object({
  federalTaxNumber: z.string().nullable(),
  flag: FlagCard,
  authorization: z.string().nullable(),
  integrationPaymentType: IntegrationPaymentType,
  federalTaxNumberRecipient: z.string().nullable(),
  idPaymentTerminal: z.string().nullable()
});

const PaymentDetailResource = z.object({
  method: PaymentMethod,
  methodDescription: z.string().nullable(),
  paymentType: PaymentType,
  amount: z.number().nullable(),
  card: CardResource.nullable(),
  paymentDate: z.string().datetime().nullable(),
  federalTaxNumberPag: z.string().nullable(),
  statePag: z.string().nullable()
});

const PaymentResource = z.object({
  paymentDetail: z.array(PaymentDetailResource).nullable(),
  payBack: z.number().nullable()
});

const BuyerResource = z.object({
  accountId: z.string().nullable(),
  id: z.string().nullable(),
  name: z.string().nullable(),
  federalTaxNumber: z.number().nullable(),
  email: z.string().nullable(),
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumberIndicator: ReceiverStateTaxIndicator,
  tradeName: z.string().nullable(),
  taxRegime: TaxRegime,
  stateTaxNumber: z.string().nullable()
});

const ReboqueResource = z.object({
  plate: z.string().nullable(),
  uf: z.string().nullable(),
  rntc: z.string().nullable(),
  wagon: z.string().nullable(),
  ferry: z.string().nullable()
});

const VolumeResource = z.object({
  volumeQuantity: z.number().int().nullable(),
  species: z.string().nullable(),
  brand: z.string().nullable(),
  volumeNumeration: z.string().nullable(),
  netWeight: z.number().nullable(),
  grossWeight: z.number().nullable()
});

const TransportVehicleResource = z.object({
  plate: z.string().nullable(),
  state: z.string().nullable(),
  rntc: z.string().nullable()
});

const TransportRateResource = z.object({
  serviceAmount: z.number().nullable(),
  bcRetentionAmount: z.number().nullable(),
  icmsRetentionRate: z.number().nullable(),
  icmsRetentionAmount: z.number().nullable(),
  cfop: z.number().nullable(),
  cityGeneratorFactCode: z.number().nullable()
});

const TransportGroupResource = z.object({
  accountId: z.string().nullable(),
  id: z.string().nullable(),
  name: z.string().nullable(),
  federalTaxNumber: z.number().nullable(),
  email: z.string().nullable(),
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: z.string().nullable(),
  transportRetention: z.string().nullable()
});

const TransportInformationResource = z.object({
  freightModality: ShippingModality,
  transportGroup: TransportGroupResource.nullable(),
  reboque: ReboqueResource.nullable(),
  volume: VolumeResource.nullable(),
  transportVehicle: TransportVehicleResource.nullable(),
  sealNumber: z.string().nullable(),
  transpRate: TransportRateResource.nullable()
});

const TaxCouponInformationResource = z.object({
  modelDocumentFiscal: z.string().nullable(),
  orderECF: z.string().nullable(),
  orderCountOperation: z.number().nullable()
});

const DocumentInvoiceReferenceResource = z.object({
  state: z.number().nullable(),
  yearMonth: z.string().nullable(),
  federalTaxNumber: z.string().nullable(),
  model: z.string().nullable(),
  series: z.string().nullable(),
  number: z.string().nullable()
});

const DocumentElectronicInvoiceResource = z.object({
  accessKey: z.string().nullable()
});

const TaxDocumentsReferenceResource = z.object({
  taxCouponInformation: TaxCouponInformationResource.nullable(),
  documentInvoiceReference: DocumentInvoiceReferenceResource.nullable(),
  documentElectronicInvoice: DocumentElectronicInvoiceResource.nullable()
});

const TaxpayerCommentsResource = z.object({
  field: z.string().nullable(),
  text: z.string().nullable()
});

const ReferencedProcessResource = z.object({
  identifierConcessory: z.string().nullable(),
  identifierOrigin: z.number().int().nullable(),
  concessionActType: z.number().int().nullable()
});

const AdditionalInformationResource = z.object({
  fisco: z.string().nullable(),
  taxpayer: z.string().nullable(),
  xmlAuthorized: z.array(z.number()).nullable(),
  effort: z.string().nullable(),
  order: z.string().nullable(),
  contract: z.string().nullable(),
  taxDocumentsReference: z.array(TaxDocumentsReferenceResource).nullable(),
  taxpayerComments: z.array(TaxpayerCommentsResource).nullable(),
  referencedProcess: z.array(ReferencedProcessResource).nullable()
});

const ExportResource = z.object({
  state: StateCode,
  office: z.string().nullable(),
  local: z.string().nullable()
});

const CIDEResource = z.object({
  bc: z.number().nullable(),
  rate: z.number().nullable(),
  cideAmount: z.number().nullable()
});

const PumpResource = z.object({
  spoutNumber: z.number().int().nullable(),
  number: z.number().int().nullable(),
  tankNumber: z.number().int().nullable(),
  beginningAmount: z.number().nullable(),
  endAmount: z.number().nullable(),
  percentageBio: z.number().nullable()
});

const FuelOriginResource = z.object({
  indImport: z.number().int().nullable(),
  cUFOrig: z.number().int().nullable(),
  pOrig: z.number().nullable()
});

const FuelResource = z.object({
  codeANP: z.string().nullable(),
  percentageNG: z.number().nullable(),
  descriptionANP: z.string().nullable(),
  percentageGLP: z.number().nullable(),
  percentageNGn: z.number().nullable(),
  percentageGNi: z.number().nullable(),
  startingAmount: z.number().nullable(),
  codif: z.string().nullable(),
  amountTemp: z.number().nullable(),
  stateBuyer: z.string().nullable(),
  cide: CIDEResource.nullable(),
  pump: PumpResource.nullable(),
  fuelOrigin: FuelOriginResource.nullable()
});

const AdditionResource = z.object({
  code: z.number().int().nullable(),
  manufacturer: z.string().nullable(),
  amount: z.number().nullable(),
  drawback: z.number().int().nullable()
});

const ImportDeclarationResource = z.object({
  code: z.string().nullable(),
  registeredOn: z.string().datetime().nullable(),
  customsClearanceName: z.string().nullable(),
  customsClearanceState: StateCode,
  customsClearancedOn: z.string().datetime().nullable(),
  additions: z.array(AdditionResource).nullable(),
  exporter: z.string().nullable(),
  internationalTransport: InternationalTransportType,
  intermediation: IntermediationType,
  acquirerFederalTaxNumber: z.string().nullable(),
  stateThird: z.string().nullable()
});

const ExportHintResource = z.object({
  registryId: z.string().nullable(),
  accessKey: z.string().nullable(),
  quantity: z.number().nullable()
});

const ExportDetailResource = z.object({
  drawback: z.string().nullable(),
  hintInformation: ExportHintResource.nullable()
});

const TaxDeterminationResource = z.object({
  operationCode: z.number().int().nullable(),
  issuerTaxProfile: z.string().nullable(),
  buyerTaxProfile: z.string().nullable(),
  origin: z.string().nullable(),
  acquisitionPurpose: z.string().nullable()
});

const IcmsTaxResource = z.object({
  origin: z.string().nullable(),
  cst: z.string().nullable(),
  csosn: z.string().nullable(),
  baseTaxModality: z.string().nullable(),
  baseTax: z.number().nullable(),
  baseTaxSTModality: z.string().nullable(),
  baseTaxSTReduction: z.string().nullable(),
  baseTaxST: z.number().nullable(),
  baseTaxReduction: z.number().nullable(),
  stRate: z.number().nullable(),
  stAmount: z.number().nullable(),
  stMarginAmount: z.number().nullable(),
  rate: z.number().nullable(),
  amount: z.number().nullable(),
  percentual: z.number().nullable(),
  snCreditRate: z.number().nullable(),
  snCreditAmount: z.number().nullable(),
  stMarginAddedAmount: z.string().nullable(),
  stRetentionAmount: z.string().nullable(),
  baseSTRetentionAmount: z.string().nullable(),
  baseTaxOperationPercentual: z.string().nullable(),
  ufst: z.string().nullable(),
  amountSTReason: z.string().nullable(),
  baseSNRetentionAmount: z.string().nullable(),
  snRetentionAmount: z.string().nullable(),
  amountOperation: z.string().nullable(),
  percentualDeferment: z.string().nullable(),
  baseDeferred: z.string().nullable(),
  exemptAmount: z.number().nullable(),
  exemptReason: ExemptReason,
  exemptAmountST: z.number().nullable(),
  exemptReasonST: ExemptReason,
  fcpRate: z.number().nullable(),
  fcpAmount: z.number().nullable(),
  fcpstRate: z.number().nullable(),
  fcpstAmount: z.number().nullable(),
  fcpstRetRate: z.number().nullable(),
  fcpstRetAmount: z.number().nullable(),
  baseTaxFCPSTAmount: z.number().nullable(),
  substituteAmount: z.number().nullable(),
  stFinalConsumerRate: z.number().nullable(),
  effectiveBaseTaxReductionRate: z.number().nullable(),
  effectiveBaseTaxAmount: z.number().nullable(),
  effectiveRate: z.number().nullable(),
  effectiveAmount: z.number().nullable(),
  deductionIndicator: DuductionIndicator
});

const IPITaxResource = z.object({
  cst: z.string().nullable(),
  classificationCode: z.string().nullable(),
  classification: z.string().nullable(),
  producerCNPJ: z.string().nullable(),
  stampCode: z.string().nullable(),
  stampQuantity: z.number().nullable(),
  base: z.number().nullable(),
  rate: z.number().nullable(),
  unitQuantity: z.number().nullable(),
  unitAmount: z.number().nullable(),
  amount: z.number().nullable()
});

const IITaxResource = z.object({
  baseTax: z.string().nullable(),
  customsExpenditureAmount: z.string().nullable(),
  amount: z.number().nullable(),
  iofAmount: z.number().nullable(),
  vEnqCamb: z.number().nullable()
});

const PISTaxResource = z.object({
  cst: z.string().nullable(),
  baseTax: z.number().nullable(),
  rate: z.number().nullable(),
  amount: z.number().nullable(),
  baseTaxProductQuantity: z.number().nullable(),
  productRate: z.number().nullable()
});

const CofinsTaxResource = z.object({
  cst: z.string().nullable(),
  baseTax: z.number().nullable(),
  rate: z.number().nullable(),
  amount: z.number().nullable(),
  baseTaxProductQuantity: z.number().nullable(),
  productRate: z.number().nullable()
});

const ICMSUFDestinationTaxResource = z.object({
  vBCUFDest: z.number().nullable(),
  pFCPUFDest: z.number().nullable(),
  pICMSUFDest: z.number().nullable(),
  pICMSInter: z.number().nullable(),
  pICMSInterPart: z.number().nullable(),
  vFCPUFDest: z.number().nullable(),
  vICMSUFDest: z.number().nullable(),
  vICMSUFRemet: z.number().nullable(),
  vBCFCPUFDest: z.number().nullable()
});

const InvoiceItemTaxResource = z.object({
  totalTax: z.number().nullable(),
  icms: IcmsTaxResource.nullable(),
  ipi: IPITaxResource.nullable(),
  ii: IITaxResource.nullable(),
  pis: PISTaxResource.nullable(),
  cofins: CofinsTaxResource.nullable(),
  icmsDestination: ICMSUFDestinationTaxResource.nullable()
});

const InvoiceItemResource = z.object({
  code: z.string().nullable(),
  codeGTIN: z.string().nullable(),
  description: z.string().nullable(),
  ncm: z.string().nullable(),
  nve: z.array(z.string()).nullable(),
  extipi: z.string().nullable(),
  cfop: z.number().nullable(),
  unit: z.string().nullable(),
  quantity: z.number().nullable(),
  unitAmount: z.number().nullable(),
  totalAmount: z.number().nullable(),
  codeTaxGTIN: z.string().nullable(),
  unitTax: z.string().nullable(),
  quantityTax: z.number().nullable(),
  taxUnitAmount: z.number().nullable(),
  freightAmount: z.number().nullable(),
  insuranceAmount: z.number().nullable(),
  discountAmount: z.number().nullable(),
  othersAmount: z.number().nullable(),
  totalIndicator: z.boolean().nullable(),
  cest: z.string().nullable(),
  tax: InvoiceItemTaxResource.nullable(),
  additionalInformation: z.string().nullable(),
  numberOrderBuy: z.string().nullable(),
  itemNumberOrderBuy: z.number().int().nullable(),
  importControlSheetNumber: z.string().nullable(),
  fuelDetail: FuelResource.nullable(),
  benefit: z.string().nullable(),
  importDeclarations: z.array(ImportDeclarationResource).nullable(),
  exportDetails: z.array(ExportDetailResource).nullable(),
  taxDetermination: TaxDeterminationResource.nullable()
});

const BillResource = z.object({
  number: z.string().nullable(),
  originalAmount: z.number().nullable(),
  discountAmount: z.number().nullable(),
  netAmount: z.number().nullable()
});

const DuplicateResource = z.object({
  number: z.string().nullable(),
  expirationOn: z.string().datetime().nullable(),
  amount: z.number().nullable()
});

const BillingResource = z.object({
  bill: BillResource.nullable(),
  duplicates: z.array(DuplicateResource).nullable()
});

const IssuerFromRequestResource = z.object({
  stStateTaxNumber: z.string().nullable()
});

const IntermediateResource = z.object({
  federalTaxNumber: z.number().nullable(),
  identifier: z.string().nullable()
});

const DeliveryInformationResource = z.object({
  accountId: z.string().nullable(),
  id: z.string().nullable(),
  name: z.string().nullable(),
  federalTaxNumber: z.number().nullable(),
  email: z.string().nullable(),
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: z.string().nullable()
});

const WithdrawalInformationResource = z.object({
  accountId: z.string().nullable(),
  id: z.string().nullable(),
  name: z.string().nullable(),
  federalTaxNumber: z.number().nullable(),
  email: z.string().nullable(),
  address: AddressResource.nullable(),
  type: PersonType,
  stateTaxNumber: z.string().nullable()
});

const ICMSTotal = z.object({
  baseTax: z.number().nullable(),
  icmsAmount: z.number().nullable(),
  icmsExemptAmount: z.number().nullable(),
  stCalculationBasisAmount: z.number().nullable(),
  stAmount: z.number().nullable(),
  productAmount: z.number(),
  freightAmount: z.number().nullable(),
  insuranceAmount: z.number().nullable(),
  discountAmount: z.number().nullable(),
  iiAmount: z.number().nullable(),
  ipiAmount: z.number().nullable(),
  pisAmount: z.number().nullable(),
  cofinsAmount: z.number().nullable(),
  othersAmount: z.number().nullable(),
  invoiceAmount: z.number(),
  fcpufDestinationAmount: z.number().nullable(),
  icmsufDestinationAmount: z.number().nullable(),
  icmsufSenderAmount: z.number().nullable(),
  federalTaxesAmount: z.number(),
  fcpAmount: z.number().nullable(),
  fcpstAmount: z.number().nullable(),
  fcpstRetAmount: z.number().nullable(),
  ipiDevolAmount: z.number().nullable(),
  qBCMono: z.number().nullable(),
  vICMSMono: z.number().nullable(),
  qBCMonoReten: z.number().nullable(),
  vICMSMonoReten: z.number().nullable(),
  qBCMonoRet: z.number().nullable(),
  vICMSMonoRet: z.number().nullable()
});

const ISSQNTotal = z.object({
  totalServiceNotTaxedICMS: z.number().nullable(),
  baseRateISS: z.number().nullable(),
  totalISS: z.number().nullable(),
  valueServicePIS: z.number().nullable(),
  valueServiceCOFINS: z.number().nullable(),
  provisionService: z.string().datetime().nullable(),
  deductionReductionBC: z.number().nullable(),
  valueOtherRetention: z.number().nullable(),
  discountUnconditional: z.number().nullable(),
  discountConditioning: z.number().nullable(),
  totalRetentionISS: z.number().nullable(),
  codeTaxRegime: z.number().nullable()
});

const Total = z.object({
  icms: ICMSTotal.nullable(),
  issqn: ISSQNTotal.nullable()
});

// Main schema
const ProductInvoiceQueueIssueResource = z.object({
  id: z.string().nullable(),
  payment: z.array(PaymentResource).nullable(),
  serie: z.number().int().nullable(),
  number: z.number().int().nullable(),
  operationOn: z.string().datetime().nullable(),
  operationNature: z.string().nullable(),
  operationType: OperationType,
  destination: Destination,
  printType: PrintType,
  purposeType: PurposeType,
  consumerType: ConsumerType,
  presenceType: ConsumerPresenceType,
  contingencyOn: z.string().datetime().nullable(),
  contingencyJustification: z.string().nullable(),
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
  totals: Total.nullable()
});

export default ProductInvoiceQueueIssueResource;