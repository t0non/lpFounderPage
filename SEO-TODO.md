# SEO-TODO.md — Pendências de Informações do Proprietário da FounderPage

Os itens abaixo necessitam de confirmação ou dados oficiais por parte do proprietário do projeto FounderPage para finalizar as configurações corporativas e de indexação final.

---

## 1. Dados de Contato e Identidade Empresarial

- [ ] **Número de WhatsApp Oficial (CRÍTICO P0):**
  - **Status Atual:** Placeholder temporário `5531900000000`.
  - **Ação:** Informar o número oficial de atendimento com DDD para atualizar em `CONFIG.whatsappNumber` no arquivo `script.js`.

- [ ] **E-mail Corporativo Oficial:**
  - **Status Atual:** `contato@founderpage.com.br`.
  - **Ação:** Confirmar se esta caixa postal está ativa e configurada para receber os contatos dos clientes.

- [ ] **Instagram Oficial:**
  - **Status Atual:** `https://instagram.com/founderpage`.
  - **Ação:** Confirmar a URL correta do perfil para manter no rodapé e no JSON-LD `sameAs`.

- [ ] **CNPJ e Endereço Físico (se aplicável):**
  - **Status Atual:** Ausente no código para evitar publicação de dados não comprovados.
  - **Ação:** Se possuir empresa registrada, fornecer CNPJ e endereço para inclusão no rodapé e no Schema `Organization` / `ProfessionalService`.

---

## 2. Domínio e Redirecionamentos de Produção

- [ ] **Ativação do Domínio Personalizado `founderpage.com.br`:**
  - **Status Atual:** Utilizando temporariamente `https://lp-founder-page.vercel.app/` como domínio canônico.
  - **Ação:**
    1. Configurar os servidores de DNS (Apex `@` e `www`) na Vercel conforme as instruções no relatório final.
    2. Quando o domínio `founderpage.com.br` estiver respondendo com HTTPS válido, atualizar a constante de URL canônica no `<head>`, `sitemap.xml`, `robots.txt` e JSON-LD.

---

## 3. Avaliações e Perfil de Empresa no Google (Google Business Profile)

- [ ] **Link do Perfil Oficial do Google:**
  - **Status Atual:** Seção de avaliações genéricas removida temporariamente para cumprir as diretrizes do Google Search contra avaliações não verificáveis.
  - **Ação:** Criar ou fornecer o link oficial do Google Meu Negócio / Google Business Profile com avaliações reais recebidas dos clientes para reativar o widget com selo oficial.
