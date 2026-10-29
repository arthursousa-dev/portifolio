(function(){
  // respeita a preferência de sistema por menos animação
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- cursor customizado (só em dispositivos com mouse/hover) ----
  var cursor = document.getElementById('cursor');
  var temHover = window.matchMedia('(hover:hover)').matches;
  if (temHover) {
    window.addEventListener('mousemove', function(e){
      cursor.classList.add('ativo');
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }, { passive:true });
    // aumenta o cursor ao passar sobre links, botões e cards de projeto
    document.querySelectorAll('a, button, .bloco-visual').forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursor.classList.add('grow'); });
      el.addEventListener('mouseleave', function(){ cursor.classList.remove('grow'); });
    });
  }

  // ---- barra de progresso de leitura no topo da página ----
  var barra = document.getElementById('progresso');
  window.addEventListener('scroll', function(){
    var altura = document.documentElement.scrollHeight - window.innerHeight;
    var pct = altura > 0 ? (window.scrollY / altura) * 100 : 0;
    barra.style.width = pct + '%';
  });

  // ---- animação de entrada do título (linha por linha) ----
  if (!reduz) {
    var linhas = document.querySelectorAll('#tituloAnimado .linha span');
    linhas.forEach(function(span, i){
      span.animate(
        [{ transform:'translateY(110%)', opacity:0 }, { transform:'translateY(0)', opacity:1 }],
        { duration:700, delay:120 * i, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards' }
      );
    });
  } else {
    document.querySelectorAll('#tituloAnimado .linha span').forEach(function(s){
      s.style.transform='translateY(0)'; s.style.opacity='1';
    });
  }

  // duplica os itens para o loop contínuo do marquee
  var itens = ['PHP','Python','MySQL','Git','SQL','POO','Segurança da Informação','JavaScript'];
  var track = document.getElementById('faixaTrack');
  var html = '';
  for (var v=0; v<2; v++){
    itens.forEach(function(it){ html += '<span class="on">'+it+'</span><span>//</span>'; });
  }
  track.innerHTML = html;

  // ---- efeito de inclinação 3D nos cards de projeto ao mover o mouse ----
  if (temHover && !reduz) {
    document.querySelectorAll('.bloco-visual').forEach(function(bloco){
      bloco.addEventListener('mousemove', function(e){
        var r = bloco.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        bloco.style.transform = 'perspective(800px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg)';
      });
      bloco.addEventListener('mouseleave', function(){
        bloco.style.transform = '';
      });
    });
  }

  // ---- contador animado dos números da seção "Como eu trabalho" ----
  // usa IntersectionObserver pra só rodar a animação quando o elemento entra na tela
  var contadores = document.querySelectorAll('.numero-item .valor');
  var obs = new IntersectionObserver(function(entradas){
    entradas.forEach(function(entrada){
      if (entrada.isIntersecting) {
        var el = entrada.target;
        var alvo = parseInt(el.dataset.alvo, 10);
        if (reduz) { el.textContent = alvo; obs.unobserve(el); return; }
        var inicio = null;
        var duracao = 900;
        function passo(ts){
          if (!inicio) inicio = ts;
          var progresso = Math.min((ts - inicio) / duracao, 1);
          el.textContent = Math.floor(progresso * alvo);
          if (progresso < 1) requestAnimationFrame(passo);
          else el.textContent = alvo;
        }
        requestAnimationFrame(passo);
        obs.unobserve(el);
      }
    });
  }, { threshold:0.4 });
  contadores.forEach(function(c){ obs.observe(c); });
})();
