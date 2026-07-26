# Relatório de Auditoria Técnica de SEO, Acessibilidade e CRO — FounderPage

## 1. Visão Geral da Auditoria

* **Data da Auditoria:** 24 de Julho de 2026
* **Ambiente de Produção / Deploy:** `https://founderpage.site`
* **Repositório:** `https://github.com/t0non/lpFounderPage`
* **Domínio Canônico Atual:** `https://founderpage.site/` (Domínio Oficial de Produção)

---

## 2. Problemas Encontrados e Diagnóstico

### P0 — Crítico (Segurança, Indexação e Confiabilidade)

1. **WhatsApp Placeholder em Produção:**
   * **Arquivo:** `script.js` (linha 5)
   * **Problema:** O número `5531900000000` estava configurado no script, gerando links quebrados/fictícios ao clicar nos botões de conversão.
   * **Solução:** Centralizado em `CONFIG.whatsappNumber` e adicionado tratamento de aviso com fallback gracioso. Registrado no `SEO-TODO.md`.

2. **Avaliações e Prova Social Não Verificável (Google Reviews):**
   * **Arquivo:** `index.html` (linhas 303-491 antigas)
   * **Problema:** Existiam alegações de "empresa mais bem avaliada no Google", nota 5.0 fictícia e depoimentos sem link ou comprovação de origem.
   * **Solução:** Removidas alegações não comprovadas de acordo com as regras éticas do Google/Bing. Substituídas por uma seção de **Portfólio Comprovado** exibindo projetos reais (`Instituto do Sono`, `Mangá & Prosa`, `Puro Charme`). Pendência registrada no `SEO-TODO.md`.

3. **Inconsistência de Domínio Canônico e Meta Tags Absolutas:**
   * **Arquivo:** `index.html` (head)
   * **Problema:** Mistura de URLs relativas no `og:image` e declarações que podiam causar problemas de indexação cruzada na Vercel.
   * **Solução:** Configurada URL canônica consistente (`https://lp-founder-page.vercel.app/`), criado asset `assets/images/og-image.png` (1200x630) e padronizados `og:url`, `og:image`, `twitter:image` e sitemap.

---

### P1 — Alto (SEO On-Page, Semântica e Acessibilidade)

4. **Desvio de Hierarquia de Headings e Múltiplas Tags:**
   * **Arquivo:** `index.html`
   * **Problema:** Saltos de `h2` direto para `h4` nos cards e falta de um `h1` único com intenção explícita "criação de sites profissionais".
   * **Solução:** Reestruturada a hierarquia para `H1` único no Hero, `H2` para grandes seções e `H3` para sub-cards/features.

5. **Erros de Ortografia e Acentuação Gramatical:**
   * **Arquivo:** `index.html`
   * **Problema:** Palavras sem acento (`CRIACAO`, `ATE`, `versao`, `sao`, `Nao`, `conexao`, `ficara`, `periodo`, `configuracoes`, `indexacao`, `seu preço e questionado`, `você se ve`).
   * **Solução:** Correção ortográfica integral efetuada em todas as seções e no JSON-LD.

6. **Acessibilidade e Navegação por Teclado:**
   * **Arquivo:** `index.html` & `styles.css`
   * **Problema:** Ausência de `skip-link` para pular navegação, ausência de `:focus-visible` destacado e falta de `aria-controls` / `aria-expanded` corretos nos acordeões e menu.
   * **Solução:** Implementado `skip-link`, ativados contornos `:focus-visible` em dourado, adicionados atributos ARIA completos e suporte ao fechamento do menu via tecla `Escape`.

7. **Cumprimento da Preferência por Movimento Reduzido:**
   * **Arquivo:** `script.js` & `styles.css`
   * **Problema:** Animações do `.reveal` e barras de scroll podiam causar desconforto a usuários com sensibilidade vestibular.
   * **Solução:** Adicionado suporte nativo a `@media (prefers-reduced-motion: reduce)` e verificação via JavaScript antes de registrar observers.

---

### P2 — Médio (Performance e Manutenção)

8. **Falta de Dimensões Explícitas e Alt Text em Imagens:**
   * **Arquivo:** `index.html`
   * **Problema:** Imagens sem `width` e `height` causando Cumulative Layout Shift (CLS).
   * **Solução:** Adicionadas dimensões explícitas em todas as imagens (`logo.png`, `sessao1.png`, `selogarantia.png`, e portfólio), além de `loading="lazy"` e `decoding="async"` para imagens abaixo da dobra.

9. **Sobrecarga de Fontes de Rede:**
   * **Arquivo:** `index.html`
   * **Problema:** Carregamento simultâneo de 5 famílias tipográficas (Inter, Outfit, DM Sans, Manrope, Roboto).
   * **Solução:** Otimizado o carregamento no Google Fonts para utilizar apenas 2 famílias principais (`Outfit` para títulos e `Inter` para corpo do texto), reduzindo o tempo de carregamento em redes móveis.

---

## 3. Checklist de Validação Pós-Deploy

- [x] O site carrega em 200 OK sem erros de JS no console.
- [x] `robots.txt` acessível em `/robots.txt` permitindo `OAI-SearchBot` e bloqueando `GPTBot` para treino.
- [x] `sitemap.xml` acessível em `/sitemap.xml` apontando para a URL canônica.
- [x] Schema.org JSON-LD contendo `@graph` com `#website`, `#webpage`, `#organization`, `#service` e `#faq` sem erros de validação.
- [x] Imagem Open Graph 1200x630 gerada e configurada em `assets/images/og-image.png`.
- [x] Formulário com atributos `name`, `autocomplete` e validação HTML5.
- [x] Páginas de suporte `privacy.html`, `terms.html` e `404.html` criadas e operacionais.
