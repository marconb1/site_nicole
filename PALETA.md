# Paleta compartilhada

As cores são definidas em `:root`, no início de `css/style.css`.
`css/conteudos.css` usa as mesmas variáveis. Os arquivos HTML continuam
carregando as folhas de estilo existentes, sem dependências novas.

| Uso | Variável | Cor |
| --- | --- | --- |
| Fundo principal | `--color-white` | `#FFFFFF` |
| Texto e títulos | `--color-text` | `#414141` |
| Texto secundário | `--color-muted` | `#62666B` |
| Botões e rodapés | `--color-primary` | `#556B90` |
| Links | `--color-link` | `#405674` |
| Links ao passar o mouse | `--color-link-hover` | `#8A4450` |
| Fundo rosa das apresentações | `--color-rose` | `#FAF1F3` |
| Fundo rosa secundário | `--color-rose-soft` | `#FAF6F7` |
| Pequenos títulos em rosa escuro | `--color-rose-ink` | `#75414A` |
| Detalhes e bordas de destaque | `--color-rose-accent` | `#B76E79` |
| Bordas suaves | `--color-border` | `#EADCE0` |
| Arte azul dos conteúdos | `--color-blue-soft` | `#E0E8F0` |

O rosa forte fica em pequenos detalhes. A home usa o mesmo fundo claro das
páginas de atendimento, títulos escuros, botão azul com texto branco e rodapé
azul. As seções presencial e online também usam fundo claro e texto escuro.
O verde do botão de WhatsApp permanece como cor específica desse serviço.

## Contraste das combinações principais

| Texto / fundo | Relação |
| --- | --- |
| `#414141` / `#FAF1F3` | 9,21:1 |
| `#FFFFFF` / `#556B90` | 5,40:1 |
| `#405674` / `#FFFFFF` | 7,50:1 |
| `#75414A` / `#FAF1F3` | 7,25:1 |
| `#405674` / `#FAF1F3` | 6,76:1 |

Referência: [WCAG 2.2 — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Verificação no navegador

Executar a partir da raiz do repositório, com Node 22+, Python 3 e Chromium
instalados. O comando abre um servidor temporário local e um navegador
headless, encerrados ao concluir. Não publica o site.

```sh
node tools/check-palette.mjs --screenshots
```

Para registrar o site publicado, sem modificá-lo:

```sh
node tools/check-palette.mjs --live --screenshots
```

Para conferir somente a home e seus estados interativos, em sete larguras
(1440, 1280, 1024, 992, 768, 390 e 320 px):

```sh
node tools/check-palette.mjs --home-only --screenshots
```

Relatórios e capturas ficam em `examples/paleta/`. As capturas “publicado”
registram o site online; “proposta” registra o checkout local. Os dois prints
fornecidos na pasta `examples` foram preservados.

Foram verificados home, três páginas de atendimento, listagem de conteúdos e
um artigo representativo, nas larguras de 1440, 390 e 320 px. A verificação
inclui contraste do texto renderizado, largura da página, imagens, erros de
JavaScript, consistência das cores principais e funcionamento do menu móvel.
Hover do botão principal, foco por teclado e menu fixo são conferidos na home.
A checagem da home também verifica título em uma linha a partir de 992 px,
“Porto Alegre” sem quebra interna e espaço mínimo de 60 px antes de “Sobre mim”.

O cálculo usa as cores computadas de texto e dos fundos ancestrais. Não é
uma auditoria completa de acessibilidade: não avalia texto em imagens,
antialiasing ou todas as combinações de sobreposição e transparência. Durante
as capturas, analytics e o mapa externo são bloqueados; a integração do mapa
não faz parte dessa verificação.
