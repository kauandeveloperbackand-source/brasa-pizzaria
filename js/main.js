/* =========================================================
   BRASA · comportamento do site (JavaScript puro, sem bibliotecas)
   Os textos, preços e contatos ficam em js/config.js.
   ========================================================= */
(function () {
  'use strict';

  var C = window.BRASA;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var brl = function (n) { return 'R$ ' + n.toLocaleString('pt-BR'); };

  /* ---------- WhatsApp ---------- */
  function linkZap(msg) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(msg);
  }
  function ligaZap(el, msg) {
    el.href = linkZap(msg);
    el.target = '_blank';
    el.rel = 'noopener';
  }
  $$('[data-zap]').forEach(function (a) { ligaZap(a, a.getAttribute('data-zap')); });

  /* ---------- rodapé ---------- */
  $('#rodapeEndereco').textContent = C.endereco;
  $('#rodapeHorario').textContent = C.horario;
  $('#rodapeInsta').href = C.instagram;
  $('#rodapeMapa').href = C.mapa;
  $('#ano').textContent = new Date().getFullYear();

  /* =========================================================
     1. ENTRADA
     ========================================================= */
  // posições dos ingredientes recortados da foto original
  // (x, y e w em relação à largura da pizza; 0,0 = centro)
  var POS = [
    [-0.1266, -0.5574, 0.0844], [0.1981, -0.5271, 0.1234], [-0.381, -0.4957, 0.1342],
    [-0.2684, -0.4892, 0.0693], [0.3885, -0.4556, 0.0584], [-0.5011, -0.3788, 0.1104],
    [0.3323, -0.3485, 0.1104], [0.4751, -0.3323, 0.132], [-0.5952, -0.1721, 0.0693],
    [0.5032, -0.0974, 0.1104], [-0.5206, 0.2045, 0.1234], [0.5076, 0.2619, 0.0758],
    [-0.4913, 0.3745, 0.0736], [0.4329, 0.4145, 0.0606], [-0.1439, 0.4589, 0.0887],
    [-0.3593, 0.5011, 0.1385], [0.1515, 0.5032, 0.0996], [-0.0682, 0.54, 0.1017]
  ];
  var caixaIng = $('#ingredientes');
  var ings = POS.map(function (p, i) {
    var d = document.createElement('div');
    d.className = 'ing';
    d.style.width = (p[2] * 130) + '%';
    d.style.left = '50%';
    d.style.top = '50%';
    var n = (i + 1 < 10 ? '0' : '') + (i + 1);
    d.innerHTML = '<img src="img/ing/ing-' + n + '.png" alt="">';
    caixaIng.appendChild(d);
    return {
      el: d, x: p[0] * (window.innerWidth < 860 ? 0.98 : 1.18), y: p[1] * (window.innerWidth < 860 ? 0.98 : 1.18),
      prof: 0.6 + Math.random() * 0.9,          // profundidade (parallax)
      fase: Math.random() * Math.PI * 2,
      vel: 0.5 + Math.random() * 0.7,
      giro: (Math.random() - 0.5) * 60,
      atraso: i * 0.035
    };
  });

  var pizzaGira = $('#pizzaGira');
  var hero = $('#inicio');
  var mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  var inicioExplosao = null;
  var heroVisivel = true;

  if (temMouse) {
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX / window.innerWidth * 2 - 1;
      mouse.y = e.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });
  }

  function easeBack(t) { var c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }

  function animaHero(agora) {
    if (heroVisivel) {
      mouse.sx += (mouse.x - mouse.sx) * 0.06;
      mouse.sy += (mouse.y - mouse.sy) * 0.06;
      var W = caixaIng.offsetWidth;
      var rolou = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.9)));
      var abre = 1 + rolou * 0.9;
      var t = agora / 1000;

      pizzaGira.style.transform =
        'translate3d(' + (-mouse.sx * 14) + 'px,' + (-mouse.sy * 10 + rolou * 60) + 'px,0) ' +
        'rotate(' + (rolou * 50) + 'deg) scale(' + (1 - rolou * 0.18) + ')';

      for (var i = 0; i < ings.length; i++) {
        var g = ings[i];
        var k = 0;
        if (inicioExplosao !== null) {
          var e = Math.min(1, Math.max(0, (agora - inicioExplosao) / 1000 - g.atraso) / 1.1);
          k = e > 0 ? easeBack(e) : 0;
          g.el.style.opacity = Math.min(1, e * 4);
        }
        var bx = g.x * W * k * abre;
        var by = g.y * W * k * abre;
        var fx = Math.sin(t * g.vel + g.fase) * 6 * k;
        var fy = Math.cos(t * g.vel * 0.8 + g.fase) * 9 * k;
        var px = -mouse.sx * 26 * g.prof;
        var py = -mouse.sy * 18 * g.prof;
        var r = g.giro * k + Math.sin(t * 0.4 + g.fase) * 12 + rolou * g.giro * 2;
        g.el.style.transform = 'translate(-50%,-50%) translate3d(' + (bx + fx + px).toFixed(1) + 'px,' +
          (by + fy + py - rolou * 120 * g.prof).toFixed(1) + 'px,0) rotate(' + r.toFixed(1) + 'deg) scale(' + (0.4 + 0.6 * Math.min(1, k)) + ')';
      }
    }
    requestAnimationFrame(animaHero);
  }

  new IntersectionObserver(function (es) { heroVisivel = es[0].isIntersecting; }).observe(hero);

  /* ---------- relógio e forno do HUD ---------- */
  var relogio = $('#relogio'), forno = $('#forno');
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tique() {
    var d = new Date();
    relogio.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    forno.textContent = Math.round(485 + Math.sin(d.getTime() / 2400) * 3 + (Math.random() - 0.5) * 2);
  }
  tique(); setInterval(tique, 1000);

  /* ---------- brasas (partículas de fogo) ---------- */
  function Brasas(canvas, qtd) {
    var ctx = canvas.getContext('2d'), ps = [], w = 0, h = 0, visivel = false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function tam() {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function nova(p, inicio) {
      p.x = Math.random() * w;
      p.y = inicio ? Math.random() * h : h + 10;
      p.r = 0.6 + Math.random() * 1.8;
      p.vy = 0.3 + Math.random() * 0.9;
      p.vx = (Math.random() - 0.5) * 0.3;
      p.vida = 0; p.max = 200 + Math.random() * 300;
      p.fase = Math.random() * 6.28;
      return p;
    }
    tam();
    for (var i = 0; i < qtd; i++) ps.push(nova({}, true));
    window.addEventListener('resize', tam);
    new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }).observe(canvas);
    (function loop() {
      if (visivel) {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < ps.length; i++) {
          var p = ps[i];
          p.vida++; p.y -= p.vy; p.x += p.vx + Math.sin(p.vida / 30 + p.fase) * 0.35;
          var a = Math.sin(Math.min(1, p.vida / p.max) * Math.PI);
          if (p.vida > p.max || p.y < -10) nova(p, false);
          var gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          gr.addColorStop(0, 'rgba(255,190,110,' + (0.9 * a) + ')');
          gr.addColorStop(0.4, 'rgba(255,100,40,' + (0.45 * a) + ')');
          gr.addColorStop(1, 'rgba(255,60,20,0)');
          ctx.fillStyle = gr;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(loop);
    })();
  }
  if (!reduz) {
    var poucas = window.innerWidth < 700;
    Brasas($('#brasas'), poucas ? 40 : 80);
  }

  /* ---------- sequência de entrada ---------- */
  function comeca() {
    if (!document.body.classList.contains('carregando')) return;
    document.body.classList.remove('carregando');
    requestAnimationFrame(function () {
      document.body.classList.add('pronto');
      if (reduz) { inicioExplosao = -1e9; } else {
        setTimeout(function () { inicioExplosao = performance.now(); }, 1500);
      }
    });
  }
  var pizzaImg = $('.pizza-img');
  var espera = new Promise(function (ok) {
    if (pizzaImg.complete) ok(); else { pizzaImg.onload = ok; pizzaImg.onerror = ok; }
  });
  var fontes = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([
    Promise.all([espera, fontes, new Promise(function (ok) { setTimeout(ok, 1100); })]),
    new Promise(function (ok) { setTimeout(ok, 3000); })
  ]).then(comeca);
  requestAnimationFrame(animaHero);

  /* =========================================================
     CABEÇALHO
     ========================================================= */
  var topo = $('#topo'), ultimoY = 0, zapFlut = $('.zap-flutuante');
  var menu = $('#menu'), ham = $('#hamburguer');
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    topo.classList.toggle('solido', y > 40);
    var abertoMenu = menu.classList.contains('aberto');
    topo.classList.toggle('escondido', !abertoMenu && y > hero.offsetHeight && y > ultimoY + 4);
    if (y < ultimoY - 4) topo.classList.remove('escondido');
    zapFlut.classList.toggle('visivel', y > hero.offsetHeight * 0.7);
    ultimoY = y;
  }, { passive: true });
  topo.addEventListener('focusin', function () { topo.classList.remove('escondido'); });

  ham.addEventListener('click', function () {
    var abre = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abre);
    ham.setAttribute('aria-expanded', abre);
    ham.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('aberto'); ham.setAttribute('aria-expanded', 'false');
    });
  });

  // link ativo conforme a seção
  var links = $$('a', menu);
  var obsSecao = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['cardapio'].forEach(function (id) { obsSecao.observe(document.getElementById(id)); });

  /* ingredientes flutuando em volta (final) */
  function flutuantes(caixa, lista) {
    var els = lista.map(function (f) {
      var d = document.createElement('div');
      d.className = 'flut';
      d.style.left = f[1] + '%'; d.style.top = f[2] + '%'; d.style.width = f[3] + 'px';
      if (f[4]) d.style.filter = 'blur(' + f[4] + 'px)';
      d.innerHTML = '<img src="img/ing/ing-' + f[0] + '.png" alt="">';
      caixa.appendChild(d);
      return { el: d, fase: Math.random() * 6.28, prof: f[3] / 80 };
    });
    var visivel = false;
    new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }).observe(caixa);
    if (reduz) return;
    (function loop(t) {
      if (visivel) {
        var r = caixa.getBoundingClientRect();
        var meio = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        els.forEach(function (g) {
          var y = Math.sin(t / 1400 + g.fase) * 10 + meio * -80 * g.prof;
          var x = -mouse.sx * 16 * g.prof;
          g.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + (Math.sin(t / 2000 + g.fase) * 20).toFixed(1) + 'deg)';
        });
      }
      requestAnimationFrame(loop);
    })(0);
  }
  // [arquivo, left %, top %, largura px, desfoque]
  flutuantes($('#finalFlutuantes'), [
    ['06', 8, 20, 140, 4], ['16', 82, 60, 170, 5], ['08', 14, 70, 110, 3], ['03', 78, 14, 120, 4]
  ]);

  /* =========================================================
     3. CARDÁPIO
     ========================================================= */
  var abas = $('#abas'), grade = $('#cardapioGrade');
  var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  function imgDe(nome) {
    for (var i = 0; i < C.sabores.length; i++) if (norm(C.sabores[i].nome) === norm(nome)) return C.sabores[i].img;
    return 'img/pizza-inteira.png';
  }
  // link da página da pizza (p/<nome>.html): o WhatsApp mostra a foto dela na conversa
  function slug(nome) { return norm(nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function linkPizza(nome) {
    if (!C.site || C.site.indexOf('SEU-DOMINIO') >= 0) return '';
    return '\n' + C.site.replace(/\/$/, '') + '/p/' + slug(nome) + '.html';
  }
  var cats = Object.keys(C.cardapio);
  var botoesAba = cats.map(function (cat, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = cat;
    b.addEventListener('click', function () { mostra(i); });
    abas.appendChild(b);
    return b;
  });
  function mostra(i) {
    botoesAba.forEach(function (b, j) { b.setAttribute('aria-selected', i === j ? 'true' : 'false'); });
    grade.innerHTML = '';
    C.cardapio[cats[i]].forEach(function (p, k) {
      var art = document.createElement('article');
      art.className = 'cartao revela';
      art.style.transitionDelay = (k * 0.06) + 's';
      art.innerHTML =
        '<div class="cartao-img"><img src="' + (p.img || imgDe(p.nome)) + '" alt="Pizza de ' + p.nome + '" loading="lazy"></div>' +
        '<div class="cartao-corpo"><h3></h3><p></p>' +
        '<div class="cartao-pe"><span class="cartao-preco"></span><a class="btn btn-brasa" href="#">Pedir</a></div></div>';
      $('h3', art).textContent = p.nome;
      $('p', art).textContent = p.desc;
      $('.cartao-preco', art).innerHTML = p.preco + '<span class="mono">' + (p.tag || '').toUpperCase() + '</span>';
      ligaZap($('a', art), 'Olá! Quero uma pizza de ' + p.nome + ' (' + p.preco + ').' + linkPizza(p.nome));
      grade.appendChild(art);
      observaRevela(art);
    });
  }

  /* =========================================================
     REVELAR AO ROLAR
     ========================================================= */
  var obsRevela = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); obsRevela.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function observaRevela(el) { if (reduz) el.classList.add('visto'); else obsRevela.observe(el); }
  $$('.revela').forEach(observaRevela);
  mostra(0);
})();
