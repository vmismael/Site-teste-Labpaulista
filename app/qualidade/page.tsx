import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import QualidadeContent from "./QualidadeContent";

export const metadata: Metadata = {
  title: `Qualidade e Certificações | ${SITE_NAME}`,
  description:
    "ONA Nível III e Platina PNCQ por 15 anos consecutivos. Conheça nossa trajetória de excelência.",
};

export default function QualidadePage() {
  return <QualidadeContent />;
}
