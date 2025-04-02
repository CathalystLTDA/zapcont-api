import { z } from "zod"

export const createCompanySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    tradeName: z.string().optional(),
    federalTaxNumber: z.number(),
    email: z.string().email(),
    address: z.object({
      country: z.string(),
      postalCode: z.string().optional(),
      street: z.string(),
      number: z.string(),
      additionalInformation: z.string().optional(),
      district: z.string().optional(),
      city: z.object({
        name: z.string().optional(),
        code: z.number().optional(),
      }).optional(),
      state: z.string(),
    }),
    openningDate: z.string(),
    taxRegime: z.enum([
      "Isento",
      "MicroempreendedorIndividual",
      "SimplesNacional",
      "LucroPresumido",
      "LucroReal",
    ]),
    specialTaxRegime: z
      .enum([
        "Automatico",
        "Nenhum",
        "MicroempresaMunicipal",
        "Estimativa",
        "SociedadeDeProfissionais",
        "Cooperativa",
        "MicroempreendedorIndividual",
        "MicroempresarioEmpresaPequenoPorte",
      ])
      .optional(),
    legalNature: z.enum([
      "EmpresaPublica",
      "SociedadeEconomiaMista",
      "SociedadeAnonimaAberta",
      "SociedadeAnonimaFechada",
      "SociedadeEmpresariaLimitada",
      "SociedadeEmpresariaEmNomeColetivo",
      "SociedadeEmpresariaEmComanditaSimples",
      "SociedadeEmpresariaEmComanditaporAcoes",
      "SociedadeemContaParticipacao",
      "Empresario",
      "Cooperativa",
      "ConsorcioSociedades",
      "GrupoSociedades",
      "EmpresaDomiciliadaExterior",
      "ClubeFundoInvestimento",
      "SociedadeSimplesPura",
      "SociedadeSimplesLimitada",
      "SociedadeSimplesEmNomeColetivo",
      "SociedadeSimplesEmComanditaSimples",
      "EmpresaBinacional",
      "ConsorcioEmpregadores",
      "ConsorcioSimples",
      "EireliNaturezaEmpresaria",
      "EireliNaturezaSimples",
      "ServicoNotarial",
      "FundacaoPrivada",
      "ServicoSocialAutonomo",
      "CondominioEdilicio",
      "ComissaoConciliacaoPrevia",
      "EntidadeMediacaoArbitragem",
      "PartidoPolitico",
      "EntidadeSindical",
      "EstabelecimentoBrasilFundacaoAssociacaoEstrangeiras",
      "FundacaoAssociacaoDomiciliadaExterior",
      "OrganizacaoReligiosa",
      "ComunidadeIndigena",
      "FundoPrivado",
      "AssociacaoPrivada",
    ]),
    economicActivities: z
      .array(
        z.object({
          type: z.enum(["Main", "Secondary"]),
          code: z.number(),
        })
      )
      .optional(),
    companyRegistryNumber: z.number().optional(),
    regionalTaxNumber: z.number().optional(),
    municipalTaxNumber: z.string(),
    rpsSerialNumber: z.string().optional(),
    rpsNumber: z.number().optional(),
    issRate: z.number().optional(),
    environment: z.enum(["Development", "Production", "Staging"]).optional(),
    fiscalStatus: z
      .enum(["CityNotSupported", "Pending", "Inactive", "None", "Active"])
      .optional(),
    federalTaxDetermination: z
      .enum(["NotInformed", "Default", "SimplesNacional"])
      .optional(),
    municipalTaxDetermination: z
      .enum(["NotInformed", "Default", "SimplesNacional"])
      .optional(),
    loginName: z.string().optional(),
    loginPassword: z.string().optional(),
    authIssueValue: z.string().optional(),
    certificate: z
      .object({
        thumbprint: z.string(),
        modifiedOn: z.string(),
        expiresOn: z.string(),
        status: z.enum(["Overdue", "Pending", "None", "Active"]),
      })
      .optional(),
    createdOn: z.string().optional(),
    modifiedOn: z.string().optional(),
  });