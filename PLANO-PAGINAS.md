# Plano: Melhorias nas páginas internas

## Contexto

Home page está sólida — hero scroll-driven, animações, smooth scroll. As 6 páginas internas foram construídas com estrutura e conteúdo corretos, mas ficaram sem animações de entrada, com heroes leves demais em algumas e com um formulário que usa `mailto:` (abre cliente de email) em vez de envio real. Este plano organiza os tópicos do mais impactante ao mais visual.

---

## Tópico 1 — /contato: Formulário funcional com Resend

**Problema:** `action="mailto:"` abre cliente de e-mail do sistema — péssima UX.
**Solução:** Criar endpoint `app/api/contact/route.ts` com Resend (chave já existe em `About me/APIs.md`).

**Arquivos afetados:**
- `app/contato/page.tsx` → converter para `'use client'`, controlar estado `idle | sending | success | error`
- `app/api/contact/route.ts` → **NOVO**, handler POST com Resend
- `.env.local` → adicionar `RESEND_API_KEY`

**O que fazer:**
1. Novo `route.ts`: recebe `{ nome, email, telefone, mensagem }` via POST, envia com Resend para `contato@labpaulistarc.com.br`
2. `page.tsx`: `fetch('/api/contact')` no submit, loading state no botão, mensagem de sucesso/erro inline (sem redirect)
3. Validação básica no cliente (campos required) e no servidor (checar campos presentes)

---

## Tópico 2 — /sobre: Animações de reveal nas seções

**Problema:** 5 seções estáticas, nenhuma animação de entrada. Página mais longa do site.

**O que fazer:**
- Seção "Nossa história": texto e foto revelam da esquerda/direita com `IntersectionObserver` + GSAP
- Seção "Missão e Visão": 2 cards revelam com stagger leve
- Seção "Estrutura e equipe": igual à história — foto esquerda, texto direita
- Seção "Ações sociais": 6 cards com stagger reveal (mesmo padrão de ValoresSection)

**Arquivo afetado:** `app/sobre/page.tsx` → converter para `'use client'`

---

## Tópico 3 — /qualidade: Animações de reveal

**Problema:** Seções de ONA e PNCQ (texto + logo + imagem de certificação) são estáticas.

**O que fazer:**
- Seção ONA: texto revela da esquerda, imagem ONA-nivel3.png da direita
- Seção PNCQ: logo PNCQ da esquerda, texto da direita (mesmo padrão invertido)
- `CertificacoesTimeline` já tem animação ✓

**Arquivo afetado:** `app/qualidade/page.tsx` → converter para `'use client'`

---

## Tópico 4 — /compliance: Animações de reveal

**Problema:** Seção de pilares (6 cards) e liderança são estáticos.

**O que fazer:**
- Seção liderança: texto da esquerda + logo da direita com reveal
- Seção pilares: 6 cards com stagger reveal (mesmo padrão de ValoresSection)
- Seção canal de denúncia: 3 itens revelam com stagger leve

**Arquivo afetado:** `app/compliance/page.tsx` → converter para `'use client'`

---

## Tópico 5 — /unidades: Hero com foto de fundo

**Problema:** Hero atual tem fundo `#f7f7f7` simples, sem foto — contrasta com a qualidade visual das outras páginas que têm heroes escuros com foto.

**O que fazer:**
- Substituir seção hero por versão com `lab-frente.webp` de fundo (igual ao padrão das páginas sobre/qualidade/compliance)
- Fundo escuro `#0a0a0a`, foto com `opacity-30`, gradiente direcional
- Texto branco com heading em Playfair
- Unidade Santa Gertrudes não tem foto (`foto: ""`) — manter o card sem imagem ou usar `lab-exames.png` como fallback

**Arquivo afetado:** `app/unidades/page.tsx`

---

## Tópico 6 — /exames: Hero com mais impacto

**Problema:** Hero atual tem fundo `#f7f7f7` simples — mesma limitação que Unidades.

**O que fazer:**
- Substituir por hero com `lab-exames.png` de fundo escurecido (foto já existe no `/public`)
- Texto branco sobre dark, mesmo padrão das outras páginas
- Manter `ExamesSearch` e `ExamesGrid` abaixo sem alteração

**Arquivo afetado:** `app/exames/page.tsx`

---

## Ordem recomendada

| Prioridade | Tópico | Impacto | Esforço |
|---|---|---|---|
| 1 | /contato — formulário Resend | Funcional | Médio |
| 2 | /unidades — hero foto | Visual imediato | Baixo |
| 3 | /exames — hero foto | Visual imediato | Baixo |
| 4 | /sobre — animações reveal | Polimento | Médio |
| 5 | /qualidade — animações reveal | Polimento | Baixo |
| 6 | /compliance — animações reveal | Polimento | Baixo |

---

## Padrões a reutilizar

- **IntersectionObserver + GSAP** → mesmo padrão de `components/ValoresSection.tsx`
- **Hero dark com foto** → mesmo padrão de `app/sobre/page.tsx` (seção hero já pronta)
- **Remetente Resend** → `onboarding@resend.dev` (plano gratuito, sem domínio próprio)
- **Chave Resend** → em `About me/APIs.md`
