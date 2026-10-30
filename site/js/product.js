(async function(){
  const DATA = await (await fetch('data/decors.json')).json();
  const D = DATA.decors;
  const root = document.getElementById('product');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const img = f => 'img/producten/' + f.split('/').pop().replace(/\.(png|jpe?g)$/i, '.webp');
  const num = s => parseFloat(String(s).replace(',', '.'));
  const fmt = n => n.toLocaleString('nl-NL', {minimumFractionDigits:2, maximumFractionDigits:2});
  const $ = id => document.getElementById(id);

  /* ---------- welk decor en welke variant? ---------- */
  const q = new URLSearchParams(location.search);
  let id = q.get('p'), patroon = q.get('patroon'), toepassing = q.get('toepassing');
  const oud = DATA.oudeSlugs[id];                       // oude productlink (één product)
  if(oud){ id = oud.id; patroon = oud.patroon; toepassing = oud.toepassing; }
  const d = D.find(x => x.id === id);

  if(!d){
    document.title = 'Vloer niet gevonden – K&E Vloeren';
    root.innerHTML = '<div class="wrap niet-gevonden"><h1>Vloer niet <span class="zand">gevonden</span></h1><p style="margin:16px 0 28px">Deze vloer bestaat niet (meer). Bekijk ons hele assortiment.</p><a class="btn btn-zand" href="vloeren.html">Alle vloeren</a></div>';
    return;
  }
  const vind = (p, t) => d.varianten.find(v => v.patroon === p && v.toepassing === t);
  let v = vind(patroon, toepassing)
       || d.varianten.find(x => x.patroon === patroon)
       || d.varianten.find(x => x.toepassing === toepassing)
       || vind('Visgraat', 'Klik')
       || d.varianten[0];

  /* ---------- vaste opbouw ---------- */
  const specVolgorde = ['Merk','Kleur','Patroon','Toepassing','Plaatsingswijze','Lengte','Breedte','Hoogte','Slijtlaag','m²/doos','Ftalaat','Vloerverwarming','Garantie'];
  const waarde = (k, w) => k === 'Vloerverwarming' ? w.replace('vloerverwarmng','vloerverwarming') : k === 'm²/doos' ? w.replace(/^([\d]+)\.(\d+)/, '$1,$2') : w;
  const meerdere = (lijst) => lijst.length > 1;
  const USP = '<li>Alles op voorraad</li><li>Direct mee te nemen</li><li>Uitstekende legservice</li><li>Gegarandeerd de laagste prijs</li>';

  root.innerHTML = `
  <div class="pagina-kop" style="padding:36px 0 32px">
    <div class="wrap"><div class="kruimel" style="margin:0"><a href="index.html">Home</a><span>/</span><a href="vloeren.html">Vloeren</a><span>/</span>${esc(d.titel)}</div></div>
  </div>
  <section class="creme compact">
    <div class="wrap">
      <div class="prod">
        <div class="prod-links">
          <div class="galerij" id="galerij"></div>
          <ul class="usp-lijst usp-links">${USP}</ul>
        </div>
        <div class="prod-info">
          <div class="offerte-kaart" id="offerte" role="region" aria-labelledby="oq-titel">
            <div class="oq-hoofd2">
              <div class="oq-titel">
                <div class="oq-merkrij"><span class="kaart-merk">${esc(d.merkLabel)}</span><span id="oq-badge"></span></div>
                <h1 id="oq-titel">${esc(d.model)}</h1>
              </div>
              <div class="oq-prijs" id="p-prijs"></div>
            </div>
            <div class="oq-keuzes" id="keuzes"></div>
            <div class="oq-sectie">
              <div class="oq-kop"><h2 id="oq-kop">Hoeveel heb ik nodig?</h2><span class="oq-stap" id="oq-stap" aria-hidden="true">Stap 1 van 2</span></div>
              <div class="oq-stappen">
                <div class="oq-paneel actief" id="oq-1">
                  <div class="oq-rij">
                    <div class="oq-in">
                      <label for="m2">Oppervlakte in m²</label>
                      <input type="number" id="m2" min="1" step="0.5" placeholder="bijv. 25" inputmode="decimal">
                      <label class="check"><input type="checkbox" id="verlies" checked> 10% snijverlies meerekenen</label>
                    </div>
                    <div class="uitslag" id="oq-uitslag" aria-live="polite">
                      <div><b id="r-dozen">–</b><span>dozen</span></div>
                      <div><b id="r-prijs">–</b><span>indicatieve prijs</span></div>
                    </div>
                  </div>
                  <p class="oq-noot" id="oq-noot"></p>
                  <button type="button" class="btn btn-zand oq-hoofd" id="oq-naar2">Offerte aanvragen</button>
                  <p class="oq-links"><a href="showroom.html#afspraak">Plan afspraak</a><span aria-hidden="true">·</span><a href="tel:+31357851272">Bel 035 785 1272</a></p>
                </div>
                <form class="oq-paneel form" id="oq-2" inert>
                  <p class="oq-samenvatting" id="oq-sam"></p>
                  <div class="rij">
                    <div><label for="naam">Naam *</label><input id="naam" required autocomplete="name"></div>
                    <div><label for="email">E-mailadres *</label><input id="email" type="email" required autocomplete="email"></div>
                  </div>
                  <div class="rij">
                    <div><label for="tel">Telefoon</label><input id="tel" type="tel" autocomplete="tel"></div>
                    <div><label for="leggen">Laten leggen door K&amp;E?</label>
                      <select id="leggen"><option>Nog niet zeker</option><option>Ja, graag</option><option>Nee, ik leg zelf</option></select></div>
                  </div>
                  <details class="oq-bezoek">
                    <summary>Liever eerst langskomen?</summary>
                    <div class="rij">
                      <div><label for="dag">Voorkeursdag (di – za)</label><input id="dag" type="date"></div>
                      <div><label for="dagdeel">Dagdeel</label><select id="dagdeel"><option value="">Geen voorkeur</option><option>Ochtend (10:00 – 12:00)</option><option>Middag (12:00 – 15:00)</option><option>Late middag (15:00 – 18:00)</option></select></div>
                    </div>
                  </details>
                  <p class="oq-noot">Uw gegevens gebruiken wij alleen voor deze aanvraag. <a href="privacy.html">Privacyverklaring</a></p>
                  <div class="oq-acties">
                    <button type="button" class="btn btn-lijn" id="oq-terug">Terug</button>
                    <button type="submit" class="btn btn-zand">Verstuur aanvraag</button>
                  </div>
                </form>
                <div class="oq-paneel oq-klaar" id="oq-3" tabindex="-1" inert>
                  <h3>Bedankt voor uw aanvraag</h3>
                  <p>Uw e-mailprogramma opent met de ingevulde aanvraag. Verstuur die, dan reageren wij zo snel mogelijk. Geen mail gezien? Bel ons op <a href="tel:+31357851272">035 785 1272</a>.</p>
                  <button type="button" class="btn btn-lijn" id="oq-nieuw">Nieuwe berekening</button>
                </div>
              </div>
            </div>
          </div>
          <ul class="usp-lijst usp-info">${USP}</ul>
        </div>
      </div>
      <div class="detail">
        <div><h2>Beschrijving</h2><p id="p-beschr"></p><div class="hl-rij" id="p-hl"></div></div>
        <div><h2>Specificaties</h2><dl class="spec-grid" id="p-spec"></dl></div>
      </div>
    </div>
  </section>

  <section class="creme" id="verwant-sectie"><div class="wrap">
    <div class="bijpassend-kop"><h2>Vergelijkbare <span style="color:var(--zand-donker)">vloeren</span></h2><a class="btn btn-donker" id="v-alles" href="vloeren.html"></a></div>
    <div class="kaarten" id="verwant"></div></div></section>`;

  /* ---------- delen die per variant wisselen ---------- */
  const omschrijving = x => `${x.patroon}, ${x.toepassing.toLowerCase()}`;

  function toonKeuzes(){
    const groep = (naam, lijst, huidig, sleutel) => !meerdere(lijst) ? '' : `
      <div class="keuze" role="group" aria-label="${naam}"><span class="keuze-label">${naam}</span>
        <div class="keuze-rij">${lijst.map(w => `<button type="button" data-k="${sleutel}" data-w="${esc(w)}" aria-pressed="${w === huidig}">${esc(w)}</button>`).join('')}</div></div>`;
    let html = groep('Patroon', d.patronen, v.patroon, 'patroon') + groep('Toepassing', d.toepassingen, v.toepassing, 'toepassing');
    // geen keuze mogelijk: toon een rustige regel met de belangrijkste kenmerken
    if(!html.trim()){
      const sp = v.specs, k = [];
      if(sp.Kleur) k.push(['Kleur', sp.Kleur]);
      if(sp.Lengte && sp.Breedte) k.push(['Formaat', sp.Lengte.replace(' mm', '') + ' × ' + sp.Breedte]);
      if(sp.Hoogte) k.push(['Dikte', sp.Hoogte]);
      if(sp.Garantie) k.push(['Garantie', sp.Garantie.replace(' garantie', '')]);
      html = k.length ? '<dl class="oq-kenm">' + k.map(([t, w]) => '<div><dt>' + t + '</dt><dd>' + esc(w) + '</dd></div>').join('') + '</dl>' : '';
    }
    $('keuzes').innerHTML = html;
  }
  function toonPrijs(){
    $('p-prijs').innerHTML = `<div class="prod-prijs"><b>€ ${v.prijs}</b>${v.aanbieding ? `<s>€ ${v.normale_prijs}</s>` : ''}<small>per m²</small></div>`;
    $('oq-badge').innerHTML = v.aanbieding ? '<span class="badge">Aanbieding</span>' : '';
  }
  function toonGalerij(){
    const f = v.fotos.map(img);
    $('galerij').innerHTML = `<div class="groot"><img id="groot" src="${f[0]}" alt="${esc(d.titel)}, ${esc(omschrijving(v))}" fetchpriority="high"></div>
      ${f.length > 1 ? `<div class="thumbs" role="group" aria-label="Foto's">${f.map((x, i) => `<button type="button" data-i="${i}" aria-label="Foto ${i + 1}" aria-current="${i === 0}"><img src="${x}" alt=""></button>`).join('')}</div>` : ''}`;
  }
  function toonDetails(){
    const s = v.specs;
    // belangrijkste feiten als tegels naast de beschrijving, de rest compact in twee kolommen
    const hl = [];
    if(s.Garantie) hl.push([s.Garantie.replace(/\s*garantie/i, ''), 'Garantie']);
    if(s.Vloerverwarming) hl.push([/combineerbaar/i.test(s.Vloerverwarming) ? 'Geschikt' : s.Vloerverwarming, 'Vloerverwarming']);
    if(s['m²/doos']) hl.push([waarde('m²/doos', s['m²/doos']), 'Per doos']);
    $('p-hl').innerHTML = hl.map(([w, l]) => `<div class="hl"><b>${esc(w)}</b><span>${esc(l)}</span></div>`).join('');
    const rest = [];
    ['Kleur', 'Patroon', 'Toepassing', 'Plaatsingswijze'].forEach(k => { if(s[k]) rest.push([k, s[k]]); });
    if(s.Lengte && s.Breedte) rest.push(['Formaat', `${s.Lengte.replace(' mm', '')} × ${s.Breedte}`]);
    if(s.Hoogte) rest.push(['Dikte', s.Hoogte]);
    ['Slijtlaag', 'Ftalaat'].forEach(k => { if(s[k]) rest.push([k, s[k]]); });
    $('p-spec').innerHTML = rest.map(([k, w]) => `<div><dt>${k}</dt><dd>${esc(w)}</dd></div>`).join('');
    $('p-beschr').textContent = v.beschrijving || v.kort
      || `Deze ${v.patroon.toLowerCase()} PVC vloer in ${(s.Kleur || '').toLowerCase()} is direct uit voorraad leverbaar. Kom langs in de showroom in Soest om de vloer te zien en voelen, of vraag een vrijblijvende offerte aan.`;
  }
  function toonVerwant(){
    const rest = D.filter(x => x.id !== d.id).map(x => ({x, w: x.varianten.find(y => y.patroon === v.patroon && y.toepassing === v.toepassing)}))
      .filter(o => o.w)
      .sort((a, b) => (b.x.merk === d.merk) - (a.x.merk === d.merk) || Math.abs(num(a.w.prijs) - num(v.prijs)) - Math.abs(num(b.w.prijs) - num(v.prijs)))
      .slice(0, 4);
    $('verwant').innerHTML = rest.map(({x, w}) => `<a class="kaart" href="product.html?p=${x.id}&patroon=${encodeURIComponent(w.patroon)}&toepassing=${encodeURIComponent(w.toepassing)}">${w.aanbieding ? '<span class="badge">Aanbieding</span>' : ''}<div class="foto"><img src="${img(w.fotos[0])}" alt="${esc(x.titel)}" loading="lazy"></div><div class="kaart-body"><span class="kaart-merk">${esc(x.merkLabel)}</span><h3>${esc(x.model)}</h3><span class="kaart-meta">${esc(omschrijving(w))}</span><div class="prijs"><b>€ ${w.prijs}</b>${w.aanbieding ? `<s>€ ${w.normale_prijs}</s>` : ''}<small>/m²</small></div></div></a>`).join('');
    $('verwant-sectie').hidden = !rest.length;
    const a = $('v-alles');
    a.href = `vloeren.html?patroon=${encodeURIComponent(v.patroon)}&toepassing=${encodeURIComponent(v.toepassing)}`;
    a.textContent = `Alle ${v.patroon.toLowerCase()} ${v.toepassing.toLowerCase()}`;
  }
  function meta(){
    document.title = `${d.titel} – ${omschrijving(v)} – K&E Vloeren Soest`;
    document.querySelector('meta[name=description]').content = `${d.titel}, ${omschrijving(v).toLowerCase()}, € ${v.prijs} per m². Direct uit voorraad in Soest. Vraag een vrijblijvende offerte aan.`;
    const u = new URLSearchParams({p: d.id, patroon: v.patroon, toepassing: v.toepassing});
    history.replaceState(null, '', '?' + u);
  }

  /* ---------- offerteblok: berekening (stap 1) en aanvraag (stap 2) ---------- */
  const doosM2 = () => v.specs['m²/doos'] ? num(v.specs['m²/doos']) : null;
  function berekening(){
    const doos = doosM2(), m2 = num($('m2').value);
    if(!(m2 > 0)) return {m2: 0, dozen: 0, prijs: 0, doos};
    if(!doos) return {m2, dozen: 0, prijs: 0, doos};
    const dozen = Math.ceil(m2 * ($('verlies').checked ? 1.1 : 1) / doos - 1e-9);
    return {m2, dozen, prijs: dozen * doos * num(v.prijs), doos};
  }
  function samenvatting(b){
    const delen = [`${d.titel}`, omschrijving(v)];
    if(b.m2 > 0) delen.push(`${b.m2.toLocaleString('nl-NL')} m²`);
    if(b.dozen) delen.push(`${b.dozen} dozen`, `± € ${fmt(b.prijs)}`);
    return delen.join(' · ');
  }
  function werkKaartBij(){
    const b = berekening(), doos = b.doos;
    $('oq-uitslag').hidden = !doos;
    $('r-dozen').textContent = b.dozen || '–';
    $('r-prijs').textContent = b.dozen ? '€ ' + fmt(b.prijs) : '–';
    $('oq-noot').textContent = doos
      ? `Eén doos is ${waarde('m²/doos', v.specs['m²/doos'])}. Indicatie, de definitieve prijs staat in uw offerte.`
      : 'Vul de oppervlakte in; de definitieve hoeveelheid en prijs staan in uw offerte.';
    $('oq-sam').textContent = samenvatting(b);
  }

  /* ---------- stappen ---------- */
  let stap = 1;
  const PANELEN = {1: $('oq-1'), 2: $('oq-2'), 3: $('oq-3')};
  const STAPTEKST = {1: 'Stap 1 van 2', 2: 'Stap 2 van 2', 3: 'Klaar'};
  const STAPKOP = {1: 'Hoeveel heb ik nodig?', 2: 'Offerte aanvragen', 3: 'Bedankt'};
  function gaNaar(n, focus = true){
    stap = n;
    Object.entries(PANELEN).forEach(([k, el]) => {
      const aan = +k === n;
      el.classList.toggle('actief', aan);
      el.inert = !aan;
    });
    $('oq-stap').textContent = STAPTEKST[n];
    $('oq-kop').textContent = STAPKOP[n];
    if(!focus) return;
    if(n === 1) $('m2').focus({preventScroll: true});
    if(n === 2) $('naam').focus({preventScroll: true});
    if(n === 3) $('oq-3').focus({preventScroll: true});
  }
  function bouwMail(){
    const b = berekening(), g = i => $(i).value.trim();
    const regels = [
      'Offerteaanvraag via de website', '',
      `Vloer: ${d.titel}, ${omschrijving(v)} (€ ${v.prijs} per m²)`,
      `Oppervlakte: ${b.m2 > 0 ? b.m2.toLocaleString('nl-NL') + ' m²' + ($('verlies').checked ? ' (incl. 10% snijverlies)' : '') : '-'}`,
      b.dozen ? `Berekening: ${b.dozen} dozen, indicatief € ${fmt(b.prijs)}` : 'Berekening: -',
      `Laten leggen: ${g('leggen')}`,
      `Bezoek showroom: ${g('dag') || g('dagdeel') ? [g('dag'), g('dagdeel')].filter(Boolean).join(', ') : '-'}`, '',
      `Naam: ${g('naam')}`, `Telefoon: ${g('tel') || '-'}`, `E-mail: ${g('email')}`,
    ];
    return `mailto:kevloeren@gmail.com?subject=${encodeURIComponent('Offerte aanvragen: ' + d.titel + ' (' + omschrijving(v) + ')')}&body=${encodeURIComponent(regels.join('\n'))}`;
  }

  function toonAlles(){ toonKeuzes(); toonPrijs(); toonGalerij(); toonDetails(); werkKaartBij(); toonVerwant(); meta(); }
  toonAlles();
  gaNaar(1, false);

  /* ---------- vaste actiebalk op tablet en telefoon ---------- */
  const balk = document.createElement('div');
  balk.className = 'actiebalk';
  balk.innerHTML = '<a class="btn btn-zand" href="#offerte">Offerte aanvragen</a><a class="btn btn-lijn" href="tel:+31357851272" aria-label="Bel ons op 035 785 1272">Bel ons</a>';
  document.body.appendChild(balk);
  // zichtbaar zodra de bezoeker iets gescrold heeft en het offerteblok zelf niet in beeld is
  const zetBalk = () => {
    const o = $('offerte').getBoundingClientRect();
    const inBlok = o.top < innerHeight && o.bottom > 0;
    const aan = scrollY > 200 && !inBlok;
    balk.classList.toggle('toon', aan);
    document.body.classList.toggle('balk-aan', aan);
  };
  addEventListener('scroll', zetBalk, {passive: true});
  addEventListener('resize', zetBalk);
  zetBalk();

  /* ---------- interactie ---------- */
  document.addEventListener('click', e => {
    const naarOfferte = e.target.closest('a[href="#offerte"]');
    if(naarOfferte){
      e.preventDefault();
      $('offerte').scrollIntoView({behavior: 'smooth', block: 'center'});
      if(stap === 1) (berekening().m2 > 0 ? gaNaar(2) : $('m2').focus({preventScroll: true}));
    }
  });
  root.addEventListener('click', e => {
    const dia = e.target.closest('.thumbs button');
    if(dia){
      $('groot').src = img(v.fotos[dia.dataset.i]);
      root.querySelectorAll('.thumbs button').forEach(x => x.setAttribute('aria-current', x === dia));
      return;
    }
    const keuze = e.target.closest('.keuze button');
    if(keuze){
      const k = keuze.dataset.k, w = keuze.dataset.w;
      const nieuw = k === 'patroon'
        ? (vind(w, v.toepassing) || d.varianten.find(x => x.patroon === w))
        : (vind(v.patroon, w) || d.varianten.find(x => x.toepassing === w));
      if(nieuw && nieuw !== v){ v = nieuw; toonAlles(); const b = root.querySelector(`.keuze button[data-k="${k}"][aria-pressed="true"]`); if(b) b.focus(); }
    }
  });
  $('m2').addEventListener('input', werkKaartBij);
  $('m2').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); gaNaar(2); } });
  $('verlies').addEventListener('change', werkKaartBij);
  $('oq-naar2').addEventListener('click', () => gaNaar(2));
  $('oq-terug').addEventListener('click', () => gaNaar(1));
  $('oq-nieuw').addEventListener('click', () => { $('m2').value = ''; werkKaartBij(); gaNaar(1); });
  $('oq-2').addEventListener('submit', e => {
    e.preventDefault();
    const url = bouwMail();
    $('oq-2').dataset.laatsteMail = url;      // zichtbaar voor tests
    gaNaar(3);
    location.href = url;                       // vervangen door een formulierdienst zodra die er is
  });
})();
