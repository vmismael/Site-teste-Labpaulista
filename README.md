# Laboratório Paulista — Site Institucional

Site institucional do Laboratório Paulista de Análises Clínicas, com unidades em Rio Claro e Santa Gertrudes, SP.

## Stack

- **Next.js 14** App Router
- **TypeScript** strict
- **Tailwind CSS**
- Animações em Canvas (DNA Helix 3D) e SVG puro — sem Framer Motion
- Fontes: Playfair Display + IBM Plex Sans
- Deploy: Vercel

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero com animação DNA, carrossel de convênios, exames, certificações |
| `/sobre` | História, missão, estrutura e ações sociais |
| `/exames` | Busca em tempo real em ~650 exames |
| `/qualidade` | Certificações ONA III e Platina PNCQ |
| `/compliance` | Pilares de compliance e canal de denúncia |
| `/unidades` | Endereços, horários e mapas das 2 unidades |
| `/contato` | Canais de atendimento e formulário |

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse em `http://localhost:3000`.

## Variáveis de ambiente

Nenhuma variável de ambiente necessária para rodar localmente. Para funcionalidades de email (formulário de contato), configure `RESEND_API_KEY` no `.env.local`.
