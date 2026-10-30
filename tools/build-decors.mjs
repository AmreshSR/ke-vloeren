// Zet site/data/producten.json (140 producten) om naar site/data/decors.json
// (één record per decor, met varianten voor patroon x toepassing).
// Gebruik: node tools/build-decors.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site', 'data');
const producten = JSON.parse(readFileSync(join(root, 'producten.json'), 'utf8'));

/* ---------- instellingen (hier aanpassen) ---------- */
const KLEURFAMILIE = {
  Licht:  ['Beige', 'Natural', 'Light Oak', 'Light Brown', 'Licht Eiken', 'Licht naturel', 'Naturel', 'Eiken naturel'],
  Eiken:  ['Natural Oak', 'Warm Oak', 'Warm Brown', 'Eiken'],
  Bruin:  ['Brown'],
  Donker: ['Dark Oak', 'Smoky'],
  Grijs:  ['Grey', 'Light Grey', 'Dark Grey', 'Anthracite'],
};
// Gelijktrekken van spelling bij Treefloor (decornamen)
const TREEFLOOR_SPELLING = { kammebruhl: 'Kammerbruhl', kammerbruhl: 'Kammerbruhl', buchenacker: 'Buchacker', buchacker: 'Buchacker', deisenfang: 'Deisenfang', baienbach: 'Baienbach', schanzberg: 'Schanzberg' };
const PATROON_VOLGORDE = ['Visgraat', 'Plank', 'Tegel'];
const TOEPASSING_VOLGORDE = ['Klik', 'Plak'];
/* --------------------------------------------------- */

const num = s => parseFloat(String(s).replace(',', '.'));
const cap = s => s.toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase());
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const familie = k => Object.entries(KLEURFAMILIE).find(([, l]) => l.includes(k))?.[0] ?? null;

function decorVan(p) {
  const n = p.naam;
  if (p.merk === 'Ambiant') {
    const m = n.match(/(Estino|Avanto|Vivero|Ceramo)\s+(?:Visgraat\s+)?(.+?)\s+(?:Click|Dryback)/i);
    if (!m) throw new Error('Ambiant-naam niet te lezen: ' + n);
    return { merk: 'Ambiant', decor: `${cap(m[1])} ${cap(m[2].replace(/\s*(plank|tegel)$/i, ''))}` };
  }
  if (p.merk === 'TreeFloor') {
    const m = n.match(/KLIK\s+(\w+)/i);
    if (!m) throw new Error('Treefloor-naam niet te lezen: ' + n);
    const d = TREEFLOOR_SPELLING[m[1].toLowerCase()];
    if (!d) throw new Error('Onbekende Treefloor-spelling: ' + m[1]);
    return { merk: 'Treefloor', decor: d };
  }
  if (p.merk === 'Enviro') {
    const m = n.match(/C\d{3}/);
    if (!m) throw new Error('Enviro-code niet gevonden: ' + n);
    return { merk: 'Enviro', decor: m[0] };
  }
  const m = n.match(/SH-\d+/);
  if (!m) throw new Error('Onbekend product: ' + n);
  return { merk: '', decor: m[0] };
}

const groepen = new Map();
for (const p of producten) {
  const { merk, decor } = decorVan(p);
  const titel = merk ? `${merk} ${decor}` : decor;
  const id = slugify(titel);
  if (!groepen.has(id)) groepen.set(id, { id, merk, decor, titel, producten: [] });
  groepen.get(id).producten.push(p);
}

const waarschuwingen = [];
const oudeSlugs = {};
const decors = [];

for (const g of groepen.values()) {
  const gezien = new Set();
  const varianten = g.producten.map(p => {
    const sleutel = `${p.specs.Patroon}/${p.specs.Toepassing}`;
    if (gezien.has(sleutel)) throw new Error(`Botsing: ${g.titel} heeft twee keer ${sleutel}`);
    gezien.add(sleutel);
    oudeSlugs[p.slug] = { id: g.id, patroon: p.specs.Patroon, toepassing: p.specs.Toepassing };
    return {
      slug: p.slug,
      patroon: p.specs.Patroon,
      toepassing: p.specs.Toepassing,
      prijs: p.prijs,
      normale_prijs: p.normale_prijs,
      aanbieding: !!p.aanbieding,
      specs: p.specs,
      fotos: p.fotos_lokaal,
      beschrijving: p.beschrijving || '',
      kort: p.korte_beschrijving || '',
    };
  }).sort((a, b) =>
    PATROON_VOLGORDE.indexOf(a.patroon) - PATROON_VOLGORDE.indexOf(b.patroon) ||
    TOEPASSING_VOLGORDE.indexOf(a.toepassing) - TOEPASSING_VOLGORDE.indexOf(b.toepassing));

  // kleur van het decor: uit de variant met de meeste foto's
  const bron = [...varianten].sort((a, b) => b.fotos.length - a.fotos.length)[0];
  const kleur = bron.specs.Kleur || '';
  const fam = familie(kleur);
  if (!fam) waarschuwingen.push(`Kleur zonder familie: "${kleur}" bij ${g.titel}`);
  const andere = new Set(varianten.map(v => familie(v.specs.Kleur || '')).filter(Boolean));
  if (andere.size > 1) waarschuwingen.push(`Kleurverschil binnen ${g.titel}: ${[...new Set(varianten.map(v => v.specs.Kleur))].join(' / ')} (gekozen: ${kleur})`);

  const goedkoopste = [...varianten].sort((a, b) => num(a.prijs) - num(b.prijs))[0];
  decors.push({
    id: g.id,
    merk: g.merk,
    merkLabel: g.merk || 'Showroom',   // klein label boven de titel
    model: g.decor,                    // de titel zelf, zonder merk (bijv. 'Estino Brown')
    titel: g.titel,                    // volledige naam, voor paginatitel, alt en formulier
    kleur,
    kleurFamilie: fam || 'Overig',
    patronen: PATROON_VOLGORDE.filter(x => varianten.some(v => v.patroon === x)),
    toepassingen: TOEPASSING_VOLGORDE.filter(x => varianten.some(v => v.toepassing === x)),
    vanaf: num(goedkoopste.prijs),
    vanafOud: num(goedkoopste.normale_prijs),
    aanbieding: goedkoopste.aanbieding,
    varianten,
  });
}

// controles
const totaal = decors.reduce((s, d) => s + d.varianten.length, 0);
if (totaal !== producten.length) throw new Error(`Verwacht ${producten.length} varianten, kreeg ${totaal}`);
if (new Set(decors.map(d => d.id)).size !== decors.length) throw new Error('Dubbele decor-id');

writeFileSync(join(root, 'decors.json'), JSON.stringify({ decors, oudeSlugs }));

console.log(`${producten.length} producten -> ${decors.length} decors (${totaal} varianten, geen botsingen)`);
const perMerk = {};
decors.forEach(d => { perMerk[d.merk || 'SH'] = (perMerk[d.merk || 'SH'] || 0) + 1; });
console.log('per merk:', perMerk);
console.log('kleurfamilies:', decors.reduce((o, d) => (o[d.kleurFamilie] = (o[d.kleurFamilie] || 0) + 1, o), {}));
console.log(waarschuwingen.length ? 'Waarschuwingen:\n  ' + waarschuwingen.join('\n  ') : 'Geen waarschuwingen');
