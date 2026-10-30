(function(){
  document.querySelectorAll('.carousel').forEach(c => {
    const slides = [...c.querySelectorAll('.slide')], dots = c.querySelector('.car-dots');
    const pauzeBtn = c.querySelector('.car-pauze');
    let i = 0, timer = null, gepauzeerd = matchMedia('(prefers-reduced-motion: reduce)').matches, handmatig = false;
    slides.forEach((s, n) => {
      const d = document.createElement('button');
      d.type = 'button'; d.setAttribute('role', 'tab'); d.setAttribute('aria-label', 'Foto ' + (n + 1));
      d.addEventListener('click', () => { toon(n); handmatig = true; stop(); });
      dots.appendChild(d);
    });
    const knoppen = [...dots.children];
    function toon(n){
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('actief', k === i); s.setAttribute('aria-hidden', k !== i); });
      knoppen.forEach((d, k) => d.setAttribute('aria-selected', k === i));
      // volgende alvast laden
      const nxt = slides[(i + 1) % slides.length].querySelector('img'); if(nxt) nxt.loading = 'eager';
    }
    function start(){ if(gepauzeerd || timer) return; timer = setInterval(() => toon(i + 1), 5000); }
    function stop(){ clearInterval(timer); timer = null; }
    function zetPauze(p){ gepauzeerd = p; pauzeBtn.textContent = p ? '▶' : '❚❚'; pauzeBtn.setAttribute('aria-label', p ? 'Start diavoorstelling' : 'Pauzeer diavoorstelling'); p ? stop() : start(); }
    c.querySelector('.car-prev').addEventListener('click', () => { toon(i - 1); handmatig = true; stop(); });
    c.querySelector('.car-next').addEventListener('click', () => { toon(i + 1); handmatig = true; stop(); });
    pauzeBtn.addEventListener('click', () => zetPauze(!gepauzeerd));
    c.addEventListener('mouseenter', stop);
    c.addEventListener('mouseleave', () => { if(!handmatig) start(); });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : (!handmatig && start()));
    zetPauze(gepauzeerd); toon(0);
  });
})();
