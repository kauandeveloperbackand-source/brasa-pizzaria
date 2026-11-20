/* =========================================================
   CONFIGURAÇÃO DA PIZZARIA
   Tudo o que muda de um cliente para outro fica aqui:
   contato, sabores, cardápio e preços.
   Procure por "TROCAR" para achar o que ainda é exemplo.
   ========================================================= */
window.BRASA = {
  nome: 'Brasa',
  cidade: 'Goiânia, GO',

  // WhatsApp só com números: 55 + DDD + número
  whatsapp: '5511983202739',

  /* Endereço do site publicado, sem barra no fim. TROCAR depois de publicar.
     Com ele preenchido, o pedido pelo WhatsApp leva o link da pizza,
     e o WhatsApp mostra a foto dela na conversa. */
  site: 'https://kauandeveloperbackand-source.github.io/brasa-pizzaria',

  endereco: 'Rua [ENDEREÇO], Setor Bueno · Goiânia, GO', // TROCAR
  mapa: 'https://www.google.com/maps/search/?api=1&query=Setor+Bueno+Goi%C3%A2nia', // TROCAR
  instagram: 'https://www.instagram.com/', // TROCAR
  horario: 'Ter. a dom., das 18h às 23h30',

  /* Carrossel "Eu me rendo à…"
     img: a fatia de cada sabor (PNG com fundo transparente, em img/fatias/). */
  sabores: [
    { nome: 'Calabresa', desc: 'Calabresa artesanal fatiada fina, cebola roxa, azeitona preta e orégano.', preco: 'R$ 58', img: 'img/fatias/calabresa.png' },
    { nome: 'Margherita', desc: 'Tomate fresco, mussarela de búfala, manjericão e azeite extravirgem.', preco: 'R$ 54', img: 'img/fatias/margherita.png' },
    { nome: 'Portuguesa', desc: 'Presunto, ovos, cebola roxa, azeitona preta, ervilha e pimentão.', preco: 'R$ 62', img: 'img/fatias/portuguesa.png' },
    { nome: 'Frango com Catupiry', desc: 'Frango desfiado temperado, Catupiry original e salsinha.', preco: 'R$ 60', img: 'img/fatias/frango-catupiry.png' },
    { nome: 'Quatro Queijos', desc: 'Mussarela, gorgonzola, parmesão e provolone, gratinados no forno a lenha.', preco: 'R$ 66', img: 'img/fatias/quatro-queijos.png' },
    { nome: 'Pepperoni', desc: 'Pepperoni curado, pimentões, azeitona preta e orégano.', preco: 'R$ 64', img: 'img/fatias/pepperoni.png' }
  ],

  /* Cardápio: uma lista por aba */
  cardapio: {
    'Tradicionais': [
      { nome: 'Margherita', desc: 'Tomate San Marzano, fior di latte, manjericão.', preco: 'R$ 54', tag: 'Clássica' },
      { nome: 'Calabresa', desc: 'Calabresa artesanal, cebola roxa, azeitona preta.', preco: 'R$ 58', tag: 'Mais pedida' },
      { nome: 'Portuguesa', desc: 'Presunto, ovos, cebola, azeitona e ervilha.', preco: 'R$ 62', tag: 'Tradicional' },
      { nome: 'Frango com Catupiry', desc: 'Frango desfiado temperado e Catupiry original.', preco: 'R$ 60', tag: 'Tradicional' },
      { nome: 'Quatro Queijos', desc: 'Mussarela, gorgonzola, parmesão e provolone.', preco: 'R$ 66', tag: 'Queijos' },
      { nome: 'Pepperoni', desc: 'Pepperoni curado e mussarela gratinada.', preco: 'R$ 64', tag: 'Picante' }
    ],
    'Doces': [
      { nome: 'Morango com Nutella', desc: 'Nutella, morangos frescos e açúcar de confeiteiro.', preco: 'R$ 54', tag: 'Mais pedida', img: 'img/fatias/doce-morango-nutella.png' },
      { nome: 'Oreo', desc: 'Creme de leite Ninho, Oreo triturado e fio de Nutella.', preco: 'R$ 56', tag: 'Doce', img: 'img/fatias/doce-oreo.png' },
      { nome: 'Marshmallow com Chocolate', desc: 'Chocolate ao leite, marshmallow maçaricado e farofa de biscoito.', preco: 'R$ 52', tag: 'Doce', img: 'img/fatias/doce-smores.png' },
      { nome: 'Banana Caramelizada', desc: 'Banana, canela, doce de leite e nozes-pecã.', preco: 'R$ 50', tag: 'Doce', img: 'img/fatias/doce-banana.png' },
      { nome: 'Frutas com Chocolate Branco', desc: 'Chocolate branco, marshmallow, kiwi, morango, mexerica e mirtilo.', preco: 'R$ 58', tag: 'Doce', img: 'img/fatias/doce-frutas.png' }
    ]
  }
};
