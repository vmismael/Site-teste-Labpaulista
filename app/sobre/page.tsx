import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import SobreContent from "./SobreContent";

export const metadata: Metadata = {
  title: `Sobre Nós | ${SITE_NAME}`,
  description:
    "Conheça a história do Laboratório Paulista de Análises Clínicas, nossa missão, visão e estrutura.",
};

export default function SobrePage() {
  return <SobreContent />;
}
