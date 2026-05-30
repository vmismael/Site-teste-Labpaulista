import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import TransparenciaContent from "./TransparenciaContent";

export const metadata: Metadata = {
  title: `Transparência | ${SITE_NAME}`,
  description:
    "Indicadores de desempenho do Laboratório Paulista: exames entregues no prazo, satisfação do cliente e taxa de recoleta — dados reais, publicados anualmente.",
};

export default function TransparenciaPage() {
  return <TransparenciaContent />;
}
