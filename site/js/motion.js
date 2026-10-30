// Subtiele beweging: onthullen bij scrollen, parallax, mini-interacties.
// Alleen transform/opacity, en uit bij "minder beweging".
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('header');

  /* ---------- parallax (rustig) ---------- */
  const px = [];   // parallax uit: de foto is klein en scherp gehouden
  function parallax(){
    if(reduce) return;
    px.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if(r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;   // -1..1
      img.style.setProperty('--py', (p * -6).toFixed(2) + '%');
    });
  }

  /* ---------- header: krimpt, schaduw, voortgangsbalk ---------- */
  function onScroll(){
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if(header){
      header.classList.toggle('scrolled', y > 40);
      header.style.setProperty('--p', max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
    }
  }
  let tick = false;
  addEventListener('scroll', () => { if(!tick){ tick = true; requestAnimationFrame(() => { onScroll(); parallax(); tick = false; }); } }, {passive:true});
  onScroll();

  if(reduce){
    document.querySelectorAll('.rv').forEach(e => e.classList.add('in'));
    return;
  }
  px.forEach(i => i.classList.add('parallax'));
  parallax();

  /* ---------- onthullen bij scrollen ---------- */
  const SEL = 'main h2, .sec-kop > p, .kaart, .stap, .usp-item, .teller, .merk-kaart, .assort-kaart, .contact-kaart, .waarde, .review, .faq-groep, .info-blok, .reken, .detail > div, .contact-onder, .form, .galerij-sr button, .ervaring, .filters, .merken small, .kruimel, .pagina-kop h1, .pagina-kop p';
  const ZOOM = '.missie > img, .sr-hero > video, .sr-media video, .galerij .groot';
  const io = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }), {threshold: .12, rootMargin: '0px 0px -6% 0px'});

  function tag(root){
    const scope = root.querySelectorAll ? root : document;
    const found = [...scope.querySelectorAll(SEL)].filter(el => !el.closest('.hero, .carousel, .lightbox') && !el.classList.contains('rv'));
    // trapsgewijs per ouder
    const teller = new Map();
    found.forEach(el => {
      const p = el.parentElement, n = teller.get(p) || 0; teller.set(p, n + 1);
      el.style.setProperty('--d', Math.min(n * 80, 400) + 'ms');
      el.classList.add('rv'); io.observe(el);
    });
    scope.querySelectorAll(ZOOM).forEach(el => { if(!el.classList.contains('rv-zoom')){ el.classList.add('rv-zoom'); io.observe(el); } });
  }
  tag(document);

  // dynamisch gerenderde inhoud (catalogus, productpagina)
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if(n.nodeType === 1) tag(n.matches && n.matches(SEL) ? n.parentElement : n); })))
    .observe(document.querySelector('main') || document.body, {childList:true, subtree:true});

})();
