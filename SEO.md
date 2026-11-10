# Revisão de SEO e descoberta por assistentes

Revisão feita em 9 de novembro de 2026. Domínio: https://psiconicoletartarelli.com.br/.

## Diagnóstico

O site tem uma base técnica adequada para descoberta: HTML estático em português, conteúdo disponível sem JavaScript, HTTPS, URL canônica, endereço, telefone, CRP, sitemap e dados estruturados. A página inicial apareceu na pesquisa pública pelo domínio durante a revisão. Isso demonstra descoberta nessa consulta, sem estabelecer posição para buscas genéricas ou presença recorrente nas respostas de assistentes.

A consulta HTTP ao site publicado retornou 200 para a página inicial, `robots.txt` e `sitemap.xml`, sem cabeçalho `X-Robots-Tag` restritivo nessas respostas. O `robots.txt` já permite todos os agentes. Portanto, acrescentar permissões individuais para bots não resolveria uma restrição existente. Isso não comprova acesso de todos os IPs dos rastreadores: bloqueios de hospedagem ou CDN precisam ser verificados se surgirem erros nos painéis ou logs.

As principais lacunas eram a pouca explicação dos atendimentos infantil e adolescente, a ausência de páginas próprias para esses serviços e informações do JSON-LD sem correspondência no texto visível, como o horário das 8h às 20h e a faixa de preço. Também havia referências a favicon e script de formulário que retornavam 404, além de uma tela de carregamento dependente de JavaScript.

## Alterações preparadas neste repositório

- Página inicial com apresentação direta da profissional, localização, públicos atendidos, links para os serviços e perguntas frequentes.
- Páginas estáticas `/psicologa-infantil-porto-alegre/` e `/psicologa-adolescentes-porto-alegre/`, com conteúdo específico, contato, endereço, navegação e URLs canônicas próprias. Funcionam sem JavaScript.
- Dados estruturados conectando pessoa, consultório, site e serviços por identificadores estáveis. Removidos horário e faixa de preço sem confirmação no conteúdo.
- Sitemap incluindo as três páginas. A data `lastmod` deve mudar apenas quando houver alteração relevante no conteúdo da página.
- Arquivo `llms.txt` com um resumo factual e links públicos. É um complemento experimental; não é uma instrução para um assistente recomendar a profissional.
- Remoção das referências que retornavam 404 e da tela de carregamento. A apresentação principal passou a usar texto estático em lugar de um título animado vazio no HTML.

As alterações são locais. Publicar o repositório no ambiente de hospedagem é uma etapa posterior. Não há garantia de indexação, ranking ou recomendação por qualquer assistente.

## Prioridades após a publicação

| Prioridade | Ação | Como verificar |
| --- | --- | --- |
| 1 | Conferir e verificar o Perfil da Empresa no Google da Nicole. Manter nome profissional, categoria adequada, endereço, sala, telefone, site, serviços e fotos reais consistentes. Confirmar CEP e horários antes de informá-los. O CEP atual foi preservado do site; não foi validado em fonte postal. | Abrir o perfil no Maps e comparar com o site. O mapa incorporado atual aponta para o endereço do prédio; não comprova que exista um perfil profissional verificado. |
| 1 | Verificar o domínio no Google Search Console, enviar `/sitemap.xml` e inspecionar as três páginas publicadas. | Confirmar a URL canônica escolhida, o acesso do Googlebot e o estado de indexação na inspeção de URL. |
| 2 | Verificar o domínio no Bing Webmaster Tools e enviar o mesmo sitemap, seguindo a [documentação do Bing](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed). | Acompanhar rastreamento e indexação no painel. Isso amplia a cobertura de busca; não garante inclusão no ChatGPT ou no Claude. |
| 2 | Conferir perfis profissionais e referências legítimas já existentes, com nome, formação, telefone e endereço consistentes. Quando houver espaço editorial apropriado, incluir o link do site. | Revisar os perfis e links reais. Não comprar menções ou criar cadastros em massa. |
| 2 | Fazer a revisão clínica dos novos textos com Nicole e acrescentar detalhes úteis confirmados: início do acompanhamento, participação dos responsáveis, idades atendidas, acessibilidade e horários. | Publicar apenas informações que descrevam a prática real. A formação já informada é em psicoterapia de orientação psicanalítica; não acrescentar o título de especialista em psicologia infantil ou adolescência sem comprovação. |
| 3 | Acompanhar resultados por pelo menos um ciclo mensal, comparando com uma linha de base anterior à publicação. | Ver consultas, páginas, impressões e cliques no Search Console; contatos recebidos e referências de origem no Analytics, quando disponíveis. |

Para acompanhamento, use grupos como “psicóloga zona sul porto alegre”, “psicóloga cristal porto alegre”, “psicóloga infantil porto alegre” e “psicóloga adolescentes porto alegre”. Observe também as variações reais que aparecerem no Search Console. Consultas isoladas nos assistentes variam conforme localização, contexto, modelo e uso de busca; não são uma medida estável de ranking.

## O que a documentação sustenta

- **Google Search e recursos de IA:** continuam valendo os fundamentos de SEO, acesso ao conteúdo e informações úteis. O Google declara que `llms.txt` não afeta sua visibilidade ou classificação. Não há marcação especial exigida para IA. Fontes: [guia de otimização para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) e [recursos de IA e seu site](https://developers.google.com/search/docs/appearance/ai-features).
- **ChatGPT:** `OAI-SearchBot` é o rastreador de busca. `GPTBot` tem finalidade de treinamento e sua permissão é independente. Permitir treinamento não é requisito para aparecer na busca. Fonte: [documentação oficial dos rastreadores da OpenAI](https://developers.openai.com/api/docs/bots).
- **Claude:** `Claude-SearchBot` participa da busca; `Claude-User` recupera páginas a pedido do usuário; `ClaudeBot` tem finalidade de treinamento. Fonte: [documentação da Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).
- **Gemini:** `Google-Extended` controla usos específicos relacionados a treinamento e grounding em produtos Gemini; não é um sinal de ranking na Pesquisa Google. O site já não o bloqueia. Fonte: [documentação dos rastreadores do Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers).
- **Busca local:** relevância, distância e destaque influenciam os resultados. Um perfil completo e preciso e referências reais ajudam; nenhuma alteração técnica elimina o fator distância ou compra uma posição. Fonte: [orientação oficial do Perfil da Empresa](https://support.google.com/business/answer/7091?hl=pt-BR).
- **`llms.txt`:** é uma proposta para fornecer contexto e links a agentes que a utilizem. Não existe aqui evidência de que sua presença faça ChatGPT, Gemini ou Claude recomendar o consultório. Fonte: [proposta do formato](https://llmstxt.org/).

## Verificação técnica após publicar

Na versão local, foram conferidos os links internos e suas âncoras, arquivos referenciados, URLs canônicas, correspondência com o sitemap, permissões do `robots.txt`, sintaxe e identificadores do JSON-LD e sintaxe do JavaScript. No Chromium, as três páginas foram verificadas em larguras de 320, 390, 768 e 1440 pixels, além de 390 pixels sem JavaScript: sem rolagem horizontal da página, imagens principais quebradas ou exceções de JavaScript. A validação externa do vocabulário Schema.org e a indexação real ficam para a versão publicada.

O navegador ainda pode solicitar automaticamente `/favicon.ico`, que não existe no site e retorna 404. A referência explícita ao arquivo inexistente foi retirada. Isso não bloqueia a leitura das páginas; um ícone próprio pode ser adicionado posteriormente.

1. Abrir as três páginas, `robots.txt`, `sitemap.xml` e `llms.txt` no domínio público e confirmar HTTP 200.
2. Conferir no celular a navegação e os links de contato, inclusive WhatsApp, telefone e mapa.
3. Validar as páginas no [Schema Markup Validator](https://validator.schema.org/) e no [Rich Results Test](https://search.google.com/test/rich-results). Dados estruturados descrevem o conteúdo; não garantem resultados destacados.
4. No Search Console e no Bing Webmaster Tools, confirmar que as páginas podem ser rastreadas e solicitar nova inspeção após a publicação.
