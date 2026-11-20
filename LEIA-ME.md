# Brasa · site da pizzaria

Site em HTML, CSS e JavaScript puros: não precisa instalar nada, nem rodar `npm`.

## Abrir no VS Code
1. **Arquivo › Abrir pasta…** e escolha a pasta `brasa-pizzaria`.
2. Instale a extensão **Live Server** (de Ritwick Dey).
3. Clique com o botão direito em `index.html` › **Open with Live Server**. O site abre no navegador e recarrega sozinho a cada vez que você salva.

## O que trocar para cada cliente
Quase tudo está em **`js/config.js`**. Procure por `TROCAR`:
- `whatsapp`: só números, com 55 e DDD (ex.: `5562999998888`). Todos os botões de pedido usam esse número.
- `endereco`, `mapa`, `instagram` e `horario`.
- `sabores`: nome, descrição, preço e fatia de cada sabor (a fatia vira a foto da pizza no cardápio).
- `cardapio`: as abas e as pizzas de cada aba.

Nome da marca e textos grandes: em `index.html`. Cores e fontes: no topo de `css/style.css` (variáveis `--brasa`, `--preto` etc.). No rodapé, troque `[SEU NOME]`.

## Imagens
- `img/pizza-inteira.png` e `img/ing/`: a pizza da entrada e os ingredientes que explodem, recortados da foto de referência. Para um cliente novo, gere uma imagem parecida (pizza inteira flutuando com ingredientes em volta, fundo preto) e me peça o recorte, ou troque só a pizza.
- `img/fatias/`: uma fatia por sabor, PNG com fundo transparente. Para um sabor novo, gere a fatia no Gemini usando uma das existentes como referência ("mesmo ângulo, mesma luz, fundo branco"), recorte o fundo e salve aqui com o nome usado em `config.js`.
- No cardápio, a pizza usa a fatia do sabor de mesmo nome. Sem fatia, aparece a pizza inteira.
- Se a imagem for do Pinterest ou de outro site, ela tem dono: use só como referência e gere a sua.

## Seções
1. **Entrada:** pizza flutuando, ingredientes explodindo, brasas, marcações de câmera e reação ao mouse e à rolagem.
2. **Cardápio:** abas e cartões com o botão "Pedir" (abre o WhatsApp com a pizza escolhida).
3. **Convite final** e rodapé.
4. **Botão flutuante do WhatsApp.**

O site respeita quem pede menos movimento no sistema (as animações desligam) e funciona no celular.

## Publicar
Qualquer hospedagem de site estático serve: arraste a pasta para **Netlify Drop** (app.netlify.com/drop), ou use **Vercel**, **GitHub Pages** ou a hospedagem do cliente (Hostinger, HostGator: envie os arquivos para `public_html`). Depois, aponte o domínio do cliente.

## Antes de entregar
- [ ] Número de WhatsApp real, testado no celular
- [ ] Endereço, mapa, Instagram e horário
- [ ] Preços conferidos com o cliente
- [ ] Fotos do cliente ou geradas por você, nenhuma copiada
- [ ] Testado no celular (Android e iPhone) e no computador
- [ ] `[SEU NOME]` trocado no rodapé

## Foto da pizza no WhatsApp
Quando o cliente clica em "Pedir", a mensagem leva o link da pizza (`p/<nome>.html`) e o WhatsApp mostra um cartão com a foto, o nome e o preço. Isso só funciona com o site publicado:
1. Publique o site e copie o endereço (ex.: `https://brasapizzaria.com.br`).
2. Em `js/config.js`, troque `site: 'https://SEU-DOMINIO.com.br'` pelo endereço real, sem barra no fim.
3. Nos arquivos da pasta `p/`, troque `https://SEU-DOMINIO.com.br` pelo mesmo endereço. No VS Code: Ctrl+Shift+H, substituir em todos os arquivos.
4. Para cada pizza nova no cardápio, crie `p/<nome>.html` e `img/og/<nome>.jpg` (peça ao Claude).

Enquanto o domínio for `SEU-DOMINIO`, a mensagem vai sem o link e não quebra nada.
