import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import ComplianceContent from "./ComplianceContent";

export const metadata: Metadata = {
  title: `Programa Compliance | ${SITE_NAME}`,
  description:
    "Conheça o Programa de Compliance do Laboratório Paulista: ética, boas práticas clínicas e canais de denúncia.",
};

export default function CompliancePage() {
  return <ComplianceContent />;
}
