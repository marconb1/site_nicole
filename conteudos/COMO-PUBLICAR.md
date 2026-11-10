# Publicar conteúdos

O site é HTML estático, sem painel de administração nem etapa de build.
A listagem fica em `conteudos/index.html`; o visual, em `css/conteudos.css`.
A listagem começa com cinco ensaios de autoria de Nicole, importados do
Substack e documentados em `SUBSTACK.md`. Depois, destaca seis artigos sobre infância, adolescência, processo
terapêutico e sofrimento. Duas leituras complementares tratam de atendimento
online e duração. Há também três guias de atendimento: infantil, adolescentes
e adultos. Os guias têm página própria, referências, perguntas frequentes,
perfil profissional e links para outras leituras. Os ensaios preservam a
estrutura original, com autoria, data e link para o Substack, sem FAQs novas.

## Adicionar um artigo

1. Criar `conteudos/tema-do-artigo/index.html`, com o texto completo em HTML.
   Usar o cabeçalho e o rodapé da listagem; ajustar os caminhos locais para
   começarem com `/`, como `/css/style.css`.
2. Definir título, descrição, URL canônica e metadados de compartilhamento
   específicos. Usar um único `h1`, subtítulos claros e links para os
   atendimentos relacionados. Incluir o caminho Início → Conteúdos → Artigo.
3. Após revisão da Nicole, identificar a autoria real, registro profissional
   e datas reais de publicação e revisão. Distinguir autor de revisor quando
   forem pessoas diferentes. Não atribuir automaticamente textos à Nicole.
   Incluir referências quando o tema fizer afirmações clínicas.
4. Acrescentar JSON-LD `BlogPosting` com título, descrição, URL, autor real,
   datas e `mainEntityOfPage`, além de `BreadcrumbList` correspondente ao
   caminho visível. Remover o esquema `CollectionPage` da cópia do artigo.
5. Copiar um `article.content-card` na listagem e ajustar categoria, título,
   resumo, arte e link. Acrescentar a URL ao `ItemList` e atualizar
   `numberOfItems` e as posições. O texto deve existir antes do card.
6. Adicionar a URL a `sitemap.xml`, com a data da alteração real, e à seção
   Conteúdos de `llms.txt`. Atualizar o `lastmod` da listagem se ela mudou.
7. Conferir os links, o texto no celular e os dados estruturados antes de
   publicar pelo processo habitual do site.

Os textos estão formatados para o leitor final, conforme
solicitado. A avaliação dos guias pela Nicole acontece antes da publicação
pelo fluxo habitual do repositório. Nos guias, não há atribuição de autoria,
indicação de revisão realizada ou datas de publicação fictícias. A caixa
“Conheça Nicole” apresenta a profissional e sua formação; não é uma assinatura
de autoria. Ao definir a autoria e a revisão reais, acrescentar essas
informações de forma consistente no texto e nos dados estruturados.
Nos ensaios importados do Substack, a autoria de Nicole e a data original
estão identificadas na página e no JSON-LD, a partir da publicação de origem.
Não criar cards clicáveis para artigos inexistentes.

## Próximas pautas

O plano completo está em `PLANO-EDITORIAL.md`. Os seis temas prioritários já estão contemplados; novas pautas devem
complementar os textos existentes.

Cada pauta deve responder uma dúvida concreta com a perspectiva clínica da
profissional. O objetivo é construir uma biblioteca útil aos poucos, sem
repetir textos para diferentes bairros ou prometer resultados clínicos.
