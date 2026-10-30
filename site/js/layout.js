(function(){
  if(!document.querySelector('link[rel~="icon"]')){const l=document.createElement('link');l.rel='icon';l.type='image/png';l.href=(document.baseURI.replace(/[^/]*$/,'')+'img/favicon.png');document.head.appendChild(l)}
  const top = `
<a class="skip" href="#hoofdinhoud">Ga naar de inhoud</a>
<a class="balk" href="showroom.html#afspraak">Plan een afspraak in onze showroom en ontvang <b>10% extra korting</b> op het gehele assortiment <span aria-hidden="true">→</span></a>
<header>
  <div class="wrap nav">
    <a class="logo" href="index.html" aria-label="K&E Vloeren, naar de homepage"><img src="img/logo.png" alt="K&E Vloeren – de vloeren specialist"></a>
    <ul id="menu">
      <li><a href="vloeren.html" data-nav="vloeren">Vloeren</a></li>
      <li><a href="vloeren.html?aanbieding=1" data-nav="aanbiedingen">Aanbiedingen</a></li>
      <li><a href="over-ons.html" data-nav="over-ons">Over ons</a></li>
      <li><a href="showroom.html" data-nav="showroom">Showroom</a></li>
      <li><a href="contact.html" data-nav="contact">Contact</a></li>
    </ul>
    <div class="nav-rechts">
      <a class="btn btn-zand nav-cta" href="tel:+31357851272" aria-label="Bel ons op 035 785 1272"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg><span class="cta-nr">035 785 1272</span><span class="cta-kort">Bel nu</span></a>
      <button class="burger" aria-label="Menu openen" aria-expanded="false" aria-controls="menu">☰</button>
    </div>
  </div>
</header>`;
  const bottom = `
<footer id="contact">
  <div class="wrap">
    <div class="foot">
      <div>
        <img src="img/logo.png" alt="K&E Vloeren" loading="lazy">
        <p style="opacity:.85;max-width:34ch">Bij K&E Vloeren geloven wij in persoonlijk contact en een klantgerichte aanpak. Kom langs in onze showroom in Soest.</p>
        <div class="social"><a href="https://www.facebook.com/profile.php?id=100090220471246" target="_blank" rel="noopener">Facebook</a><a href="https://www.tiktok.com/@ke.vloeren" target="_blank" rel="noopener">TikTok</a><a href="#" aria-label="Instagram (link volgt)">Instagram</a></div>
      </div>
      <div><h3 class="foot-kop">Navigatie</h3><ul><li><a href="vloeren.html">Vloeren</a></li><li><a href="vloeren.html?aanbieding=1">Aanbiedingen</a></li><li><a href="over-ons.html">Over ons</a></li><li><a href="faq.html">Veelgestelde vragen</a></li><li><a href="showroom.html" data-nav="showroom">Showroom</a></li></ul></div>
      <div><h3 class="foot-kop">Contact</h3><ul><li><a href="tel:+31357851272">035 785 1272</a></li><li><a href="mailto:kevloeren@gmail.com">kevloeren@gmail.com</a></li><li>Van Weedestraat 27<br>3761 CB Soest</li></ul></div>
      <div><h3 class="foot-kop">Openingstijden</h3><ul><li>Di – Za: 10:00 – 18:00</li><li>Zo – Ma: gesloten</li><li><a href="https://kevloeren.nl/wp-content/uploads/2026/02/Algemene-Voorwaarden.pdf">Algemene voorwaarden</a></li></ul></div>
    </div>
    <div class="onder"><span>© 2026 K&E Vloeren</span><span><a href="privacy.html">Privacy</a> · <a href="cookies.html">Cookies</a> · Alle prijzen per m²</span></div>
  </div>
</footer>
<a class="wa" href="https://wa.me/31357851272" aria-label="Stuur ons een WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.3.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z"/></svg></a>`;
  document.getElementById('site-top').outerHTML = top;
  const mn = document.querySelector('main'); if(mn && !mn.id) mn.id = 'hoofdinhoud'; if(mn) mn.tabIndex = -1;
  document.getElementById('site-bottom').outerHTML = bottom;
  document.querySelectorAll('video[data-autoloop]').forEach(v=>{
    v.muted=true;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){v.controls=true;return}
    new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const p=v.play();if(p&&p.catch)p.catch(()=>{v.controls=true})}else v.pause()}),{threshold:.25}).observe(v);
  });
  const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
  burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',e=>{if(e.target.tagName==='A')menu.classList.remove('open')});
  const q=new URLSearchParams(location.search), p=location.pathname;
  const act = p.endsWith('vloeren.html') ? (q.get('aanbieding') ? 'aanbiedingen' : 'vloeren') : p.endsWith('product.html') ? 'vloeren' : p.endsWith('showroom.html') ? 'showroom' : p.endsWith('contact.html') ? 'contact' : p.endsWith('over-ons.html') ? 'over-ons' : null;
  if(act){const a=menu.querySelector('[data-nav="'+act+'"]');if(a)a.setAttribute('aria-current','page')}
})();
(function(){ const s = document.createElement('script'); s.src = 'js/motion.js'; document.body.appendChild(s); })();
