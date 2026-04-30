import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE_NAME}`,
  description: "Política de privacidade e uso de dados do Laboratório Paulista.",
  robots: { index: false, follow: false },
};

export default function PrivacidadePage() {
  return (
    <section className="bg-white py-24" aria-labelledby="privacidade-heading">
      <div className="container-content max-w-2xl">
        <p className="text-[#0052ff] text-xs font-medium tracking-widest uppercase mb-4">
          LGPD
        </p>
        <h1
          id="privacidade-heading"
          className="text-[#0a0a0a] text-4xl font-bold mb-10"
        >
          Política de Privacidade
        </h1>

        <div className="flex flex-col gap-8 text-[#6b6b6b] text-base leading-relaxed">
          <section aria-labelledby="coleta-heading">
            <h2 id="coleta-heading" className="text-[#0a0a0a] font-semibold text-lg mb-3">
              Coleta de dados
            </h2>
            <p>
              O Laboratório Paulista coleta apenas os dados necessários para
              prestação dos serviços solicitados, como nome, contato e
              informações para agendamento de exames. Não compartilhamos seus
              dados com terceiros sem seu consentimento, exceto quando exigido
              por lei.
            </p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading" className="text-[#0a0a0a] font-semibold text-lg mb-3">
              Cookies
            </h2>
            <p>
              Utilizamos cookies para melhorar a experiência de navegação no
              site. Cookies funcionais garantem o funcionamento básico do site.
              Você pode recusar cookies não essenciais nas configurações do seu
              navegador.
            </p>
          </section>

          <section aria-labelledby="direitos-heading">
            <h2 id="direitos-heading" className="text-[#0a0a0a] font-semibold text-lg mb-3">
              Seus direitos (LGPD)
            </h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018), você tem direito a acessar, corrigir ou solicitar a
              exclusão de seus dados pessoais. Para exercer esses direitos,
              entre em contato conosco pelos canais disponíveis na página de
              Contato.
            </p>
          </section>

          <section aria-labelledby="contato-dpo-heading">
            <h2 id="contato-dpo-heading" className="text-[#0a0a0a] font-semibold text-lg mb-3">
              Contato
            </h2>
            <p>
              Para dúvidas sobre esta política ou sobre o tratamento de seus
              dados, entre em contato pelo telefone (19) 3524-9876 ou acesse
              nossa página de Contato.
            </p>
          </section>

          <p className="text-[#6b6b6b] text-xs pt-4 border-t border-[rgba(0,0,0,0.08)]">
            Última atualização: abril de 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
