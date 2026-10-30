(async function(){
  const D = (await (await fetch('data/decors.json')).json()).decors;
  const num = s => parseFloat(String(s).replace(',', '.'));
  const euro = n => '€ ' + n.toLocaleString('nl-NL', {minimumFractionDigits:2, maximumFractionDigits:2});
  const merkNaam = d => d.merk || 'SH-serie';
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const img = f => 'img/producten/' + f.split('/').pop().replace(/\.(png|jpe?g)$/i, '.webp');

  // Filters: patroon en toepassing gelden per variant, kleur en merk per decor
  const FACETS = [
    {key:'patroon',    label:'Patroon',    var:true,  get:v => v.patroon, all:() => [...new Set(D.flatMap(d => d.patronen))]},
    {key:'toepassing', label:'Toepassing', var:true,  get:v => v.toepassing, all:() => [...new Set(D.flatMap(d => d.toepassingen))]},
    {key:'kleur',      label:'Kleur',      var:false, get:d => d.kleurFamilie, all:() => [...new Set(D.map(d => d.kleurFamilie))]},
    {key:'merk',       label:'Merk',       var:false, get:merkNaam, all:() => [...new Set(D.map(merkNaam))]},
  ];
  const q = new URLSearchParams(location.search);
  const state = {aanbieding: q.get('aanbieding') === '1', sort: q.get('sort') || 'aanbieding'};
  FACETS.forEach(f => state[f.key] = new Set(q.getAll(f.key)));

  // varianten van een decor die aan alle filters voldoen (behalve 'skip')
  function passend(d, skip){
    const kleurMerkOk = FACETS.every(f => f.var || f.key === skip || !state[f.key].size || state[f.key].has(f.get(d)));
    if(!kleurMerkOk) return [];
    return d.varianten.filter(v =>
      (skip === '_aanb' || !state.aanbieding || v.aanbieding) &&
      FACETS.every(f => !f.var || f.key === skip || !state[f.key].size || state[f.key].has(f.get(v))));
  }
  const laagste = vs => vs.slice().sort((a, b) => num(a.prijs) - num(b.prijs))[0];

  function sync(){
    const u = new URLSearchParams();
    if(state.aanbieding) u.set('aanbieding','1');
    FACETS.forEach(f => state[f.key].forEach(v => u.append(f.key, v)));
    if(state.sort !== 'aanbieding') u.set('sort', state.sort);
    history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
  }

  function renderFilters(){
    const open = $('filters').classList.contains('open');
    let h = '<h2>Filters</h2><div style="margin-bottom:8px"><button class="reset" id="reset">Wis alle filters</button></div>';
    const na = D.filter(d => passend(d, '_aanb').some(v => v.aanbieding)).length;
    h += `<div class="fgroep"><label class="fopt"><input type="checkbox" id="f-aanb" ${state.aanbieding?'checked':''}> Alleen aanbiedingen <span class="n">${na}</span></label></div>`;
    FACETS.forEach(f => {
      const vals = f.all().sort((a, b) => a.localeCompare(b, 'nl'));
      h += `<div class="fgroep"><h3>${f.label}</h3>`;
      vals.forEach(v => {
        const n = D.filter(d => passend(d, f.key).some(x => f.var ? f.get(x) === v : f.get(d) === v)).length;
        h += `<label class="fopt ${n?'':'uit'}"><input type="checkbox" data-f="${f.key}" value="${esc(v)}" ${state[f.key].has(v)?'checked':''}> ${esc(v)} <span class="n">${n}</span></label>`;
      });
      h += '</div>';
    });
    $('filters').innerHTML = h;
    $('filters').classList.toggle('open', open);
  }

  function sorted(items){
    const pr = i => num(i.best.prijs);
    const s = {
      'aanbieding': (a, b) => (b.best.aanbieding - a.best.aanbieding) || pr(a) - pr(b),
      'prijs-op': (a, b) => pr(a) - pr(b),
      'prijs-af': (a, b) => pr(b) - pr(a),
      'naam': (a, b) => a.d.titel.localeCompare(b.d.titel, 'nl'),
    }[state.sort];
    return items.slice().sort(s);
  }

  function card({d, vs, best}){
    const f = best.fotos;
    const verschil = new Set(vs.map(v => v.prijs)).size > 1;
    const href = `product.html?p=${d.id}&patroon=${encodeURIComponent(best.patroon)}&toepassing=${encodeURIComponent(best.toepassing)}`;
    return `<a class="kaart" href="${href}">
      ${best.aanbieding ? '<span class="badge">Aanbieding</span>' : ''}
      <div class="foto"><img src="${img(f[0])}" alt="${esc(d.titel)}" loading="lazy">${f[1] ? `<img class="hover" src="${img(f[1])}" alt="" loading="lazy">` : ''}</div>
      <div class="kaart-body">
        <span class="kaart-merk">${esc(d.merkLabel)}</span>
        <h3>${esc(d.model)}</h3>
        <span class="kaart-meta">${esc(d.patronen.join(' · '))}</span>
        <div class="prijs">${verschil ? '<span class="vanaf">vanaf</span>' : ''}<b>${euro(num(best.prijs))}</b>${best.aanbieding ? `<s>${euro(num(best.normale_prijs))}</s>` : ''}<small>/m²</small></div>
      </div></a>`;
  }

  function render(){
    const items = sorted(D.map(d => { const vs = passend(d); return vs.length ? {d, vs, best: laagste(vs)} : null; }).filter(Boolean));
    $('teller').textContent = `${items.length} van ${D.length} vloeren`;
    $('grid').innerHTML = items.length ? items.map(card).join('')
      : '<div class="leeg" style="grid-column:1/-1"><h3>Geen vloeren gevonden</h3><p style="margin:8px 0 16px">Probeer een filter uit te zetten.</p><button class="btn btn-donker" id="reset2">Wis filters</button></div>';
    const chips = [];
    if(state.aanbieding) chips.push(['aanbieding','','Aanbiedingen']);
    FACETS.forEach(f => state[f.key].forEach(v => chips.push([f.key, v, v])));
    $('chips').innerHTML = chips.map(c => `<button class="chip" data-k="${c[0]}" data-v="${esc(c[1])}" aria-label="Filter ${esc(c[2])} verwijderen">${esc(c[2])}</button>`).join('');
    $('sort').value = state.sort;
    renderFilters(); sync();
  }
  function clearAll(){ state.aanbieding = false; FACETS.forEach(f => state[f.key].clear()); render(); }

  document.addEventListener('change', e => {
    const t = e.target;
    if(t.id === 'f-aanb'){ state.aanbieding = t.checked; render(); }
    else if(t.dataset.f){ t.checked ? state[t.dataset.f].add(t.value) : state[t.dataset.f].delete(t.value); render(); }
    else if(t.id === 'sort'){ state.sort = t.value; render(); }
  });
  document.addEventListener('click', e => {
    const t = e.target;
    if(t.id === 'reset' || t.id === 'reset2') clearAll();
    if(t.classList.contains('chip')){ t.dataset.k === 'aanbieding' ? state.aanbieding = false : state[t.dataset.k].delete(t.dataset.v); render(); }
    if(t.id === 'ftoggle'){ const o = $('filters').classList.toggle('open'); t.setAttribute('aria-expanded', o); }
  });
  if(state.aanbieding && !FACETS.some(f => state[f.key].size)) $('titel').innerHTML = 'Onze <span class="zand">aanbiedingen</span>';
  render();
})();
