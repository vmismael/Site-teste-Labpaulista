import {
  Heart,
  Scale,
  ShieldCheck,
  BadgeCheck,
  HandHeart,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export interface Unidade {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  telefones: string[];
  horarios: { dias: string; horario: string }[];
  mapsEmbedUrl: string;
  mapsLink: string;
  foto?: string;
}

export const UNIDADES: Unidade[] = [
  {
    nome: "Unidade Rio Claro",
    endereco: "Avenida 13, 576 — Esquina com Rua 5",
    bairro: "Centro",
    cidade: "Rio Claro",
    cep: "13500-340",
    telefones: [
      "(19) 3524-9876",
      "(19) 3533-5656",
      "(19) 3523-4700",
      "(19) 3617-9876",
    ],
    horarios: [
      { dias: "Seg – Sex", horario: "06h30 às 18h00" },
      { dias: "Sábado", horario: "06h30 às 12h00" },
    ],
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laborat%C3%B3rio+Paulista+An%C3%A1lises+Cl%C3%ADnicas+Avenida+13+576+Rio+Claro+SP&output=embed&hl=pt-BR&z=15",
    mapsLink: "https://maps.google.com/?q=Laboratório+Paulista+Análises+Clínicas+Avenida+13+576+Rio+Claro+SP",
    foto: "/lab-frente.webp",
  },
  {
    nome: "Unidade Santa Gertrudes",
    endereco: "Rua Três, 902 — Centro (entre Avenidas 02 e 04)",
    bairro: "Centro",
    cidade: "Santa Gertrudes",
    cep: "",
    telefones: ["(19) 3545-0808", "(19) 3545-5454"],
    horarios: [
      { dias: "Seg – Sex", horario: "06h30 às 17h00" },
      { dias: "Sábado", horario: "06h30 às 10h30" },
    ],
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laborat%C3%B3rio+Paulista+An%C3%A1lises+Cl%C3%ADnicas+Rua+Tr%C3%AAs+902+Santa+Gertrudes+SP&output=embed&hl=pt-BR&z=15",
    mapsLink: "https://maps.google.com/?q=Laboratório+Paulista+Análises+Clínicas+Rua+Três+902+Santa+Gertrudes+SP",
    foto: "/lab-santa.webp",
  },
];

export interface Especialidade {
  nome: string;
  descricao: string;
}

export const ESPECIALIDADES: Especialidade[] = [
  {
    nome: "Bioquímica",
    descricao:
      "Análise de glicose, colesterol, triglicerídeos, enzimas hepáticas e marcadores metabólicos.",
  },
  {
    nome: "Hematologia",
    descricao:
      "Hemograma completo, coagulograma e avaliação das células sanguíneas.",
  },
  {
    nome: "Hormônios e Marcadores Tumorais",
    descricao:
      "Dosagem hormonal e rastreamento de marcadores para diagnóstico oncológico.",
  },
  {
    nome: "Imunologia",
    descricao:
      "Sorologias, pesquisa de anticorpos e avaliação do sistema imunológico.",
  },
  {
    nome: "Microbiologia",
    descricao:
      "Culturas bacterianas, antibiogramas e identificação de agentes infecciosos.",
  },
  {
    nome: "Parasitologia",
    descricao:
      "Pesquisa de parasitas intestinais e avaliação de amostras fecais.",
  },
  {
    nome: "Urinálise",
    descricao:
      "Exame de urina tipo I, urocultura e análise físico-química completa.",
  },
  {
    nome: "Biologia Molecular",
    descricao:
      "PCR, detecção viral e análises genéticas de alta precisão diagnóstica.",
  },
];

export interface Valor {
  titulo: string;
  descricao: string;
  Icon: LucideIcon;
}

export const VALORES: Valor[] = [
  {
    titulo: "Saúde",
    descricao: "O bem-estar do paciente é o centro de cada decisão que tomamos.",
    Icon: Heart,
  },
  {
    titulo: "Ética",
    descricao: "Conduta íntegra em todas as relações, sem exceção.",
    Icon: Scale,
  },
  {
    titulo: "Segurança",
    descricao:
      "Protocolos rigorosos para garantir a segurança de cada resultado.",
    Icon: ShieldCheck,
  },
  {
    titulo: "Credibilidade",
    descricao: "Mais de 20 anos de resultados confiáveis e certificações reconhecidas.",
    Icon: BadgeCheck,
  },
  {
    titulo: "Boas Ações",
    descricao: "Comprometimento com o impacto positivo na comunidade e nos pacientes.",
    Icon: HandHeart,
  },
  {
    titulo: "Sustentabilidade",
    descricao: "Responsabilidade socioambiental integrada à nossa operação.",
    Icon: Leaf,
  },
];

export interface Certificacao {
  ano: string;
  mes?: string;
  titulo: string;
  descricao: string;
  destaque?: boolean;
}

export const CERTIFICACOES: Certificacao[] = [
  {
    ano: "2003",
    titulo: "Início no PNCQ",
    descricao:
      "Participação no Programa Nacional de Controle de Qualidade da SBAC, com avaliação Excelente.",
  },
  {
    ano: "2014",
    mes: "Agosto",
    titulo: "ONA Nível I",
    descricao:
      "Primeira certificação pela Organização Nacional de Acreditação.",
  },
  {
    ano: "2016",
    mes: "Setembro",
    titulo: "ONA Nível II",
    descricao: "Evolução para o segundo nível de acreditação em qualidade.",
  },
  {
    ano: "2018",
    mes: "Novembro",
    titulo: "ONA Nível III — Excelência",
    descricao:
      "Nível máximo de acreditação ONA. Reconhecimento de excelência em processos, gestão e assistência.",
    destaque: true,
  },
  {
    ano: "2018+",
    titulo: "Certificado Platina PNCQ",
    descricao:
      "15 anos consecutivos de excelência no Programa Nacional de Controle de Qualidade.",
    destaque: true,
  },
];

export const WHATSAPP_URL = "https://wa.me/5519994757375";
export const EMAIL = "contato@labpaulistarc.com.br";
export const RESULTADOS_URL = "https://shift.laboratoriopaulista.com:8443/shift/lis/laboratoriopaulista/elis/s01.iu.web.Login.cls";
export const INSTAGRAM = "https://www.instagram.com/laboratoriopaulistasp";
export const FACEBOOK = "https://www.facebook.com/laboratoriopaulistasp";

export const SITE_NAME = "Laboratório Paulista de Análises Clínicas";
export const SITE_DESCRIPTION =
  "Excelência em análises clínicas desde 2003. Certificação ONA III e Platina PNCQ. Unidades em Rio Claro e Santa Gertrudes, SP.";
