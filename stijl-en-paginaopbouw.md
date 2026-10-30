# K&E Vloeren – stijl en paginaopbouw (volgt Floorey)

Besluit: de Floorey-look volgen, ingevuld met K&E-inhoud. Offerte- en showroomsite, geen webshop (zie `site-inventaris.md` §8).

## 1. Stijlgids

**Kleuren** (gemeten uit de Floorey-preview, afgerond, nog te finetunen in het ontwerp)

| Token | Hex | Gebruik |
|---|---|---|
| `--donker` | `#27221E` | hero, FAQ, footer, donkere secties |
| `--donker-2` | `#3C352D` | kaarten, banden, stappenblokken |
| `--crème` | `#ECE0D4` | lichte secties (met houtnerf-textuur) |
| `--crème-licht` | `#F6EEE7` | kaarten en tellers op crème |
| `--zand` | `#D6C0A3` | accent: koppen op donker, reviewkaart, knoppen |
| `--tekst-licht` | `#EEE2D6` | tekst op donker |
| `--actie` | `#DB2020` | alleen voor "Aanbieding"-labels (rood uit de huidige site) |

**Typografie:** Bebas Neue voor koppen (hoofdletters, kop 1 en 2 zand of crème op donker, donker op crème), Roboto voor tekst (huidige site gebruikt dezelfde twee). Knoppen: kleine hoofdletters, donkere vulling, pijltje.

**Vormen en beeld:** vierkante hoeken (geen afronding), dunne rand of verspringend kader rond de "over ons"-kaart, houtnerf-lijnpatroon op crème achtergronden, foto's van mensen die vloeren leggen en van de showroom. Wisselend donker en crème per sectie.

**Logo:** huidige `ke-logo.png` is grijs met "DE VLOEREN SPECIALIST". Voor op donker is een lichte of zand-versie nodig, en op crème een donkere. Vraag de originele bron (svg).

## 2. Nieuwe sitemap

| Pagina | Doel | Verandering t.o.v. nu |
|---|---|---|
| Home | Vertrouwen opbouwen, naar showroom/offerte leiden | Uitgebreid |
| Vloeren | Catalogus met filters | Geen winkelwagen, nieuwe kaart |
| Productdetail (70x) | Specificaties en offerte | CTA "Offerte aanvragen" |
| Aanbiedingen | Alle 18 aanbiedingsproducten | Nieuw (vervangt de tag-pagina) |
| Over ons | Verhaal en werkwijze | Opgeschoond |
| Showroom | Bezoek en afspraak | Afspraakformulier erbij |
| Contact | Offerte, vragen | Formulier met onderwerpkeuze |
| FAQ | Antwoorden over PVC | Eigen pagina (nu op home) |
| Algemene voorwaarden, privacy, cookies | Juridisch | Privacy en cookies zijn nieuw |
| 404 | Foutpagina | Ontwerp in Floorey-stijl |

Weggelaten: winkelwagen, afrekenen, mijn account, winkel, `/vloeren-oud/…`. Blog en team uit Floorey komen er niet in, tenzij K&E inhoud levert.

## 3. Paginaopbouw

### Home (volgorde van boven naar beneden)
1. **Menu:** logo · Vloeren · Aanbiedingen · Over ons · Showroom · Contact · knop **Offerte aanvragen** · WhatsApp-icoon
2. **Hero (donker, tekst links, foto rechts):** kop bv. "Vloeren die blijven" (nog te schrijven), subtekst over showroom Soest, knoppen *Bekijk vloeren* en *Plan een afspraak*
3. **Aanbiedingsband (zand/rood label):** "Visgraat vanaf €19,95 per m² – alleen in de showroom Soest"
4. **Merkenband (donker-2):** Enviro · Treefloor · Ambiant (logo's opvragen)
5. **Over ons (crème):** missie + kaart "12 jaar ervaring" + 3 tellers (echte cijfers nodig)
6. **Waarom K&E (donker, foto links):** Vakmanschap · Innovatieve designs · Beste kwaliteit, plus "Alles op voorraad", "Direct mee te nemen", "Uitstekende legservice"
7. **Uitgelichte vloeren (crème):** 3 foto's of 4 productkaarten, knop *Alle vloeren*
8. **Hoe we werken (donker):** 4 stappen: Contact · Adviesgesprek · Inspectie locatie · Uitvoering
9. **Reviews (crème):** 2-3 echte klantreviews (opvragen/Google)
10. **FAQ (donker):** 6 belangrijkste vragen, link naar alle FAQ
11. **Showroom + afspraak (crème):** foto, adres, openingstijden, kaart, knop *Plan afspraak (10% extra korting)*
12. **Footer (donker):** logo + tekst, telefoon, e-mail, adres, openingstijden, socials, voorwaarden, privacy

### Vloeren
- Kop "Onze vloeren", zijbalk of balk met filters: Patroon, Toepassing (klik/plak), Kleur, Merk
- Productkaart (donker-2): foto (hover foto 2), naam, merk, "vanaf €X per m²", label *Aanbieding* (rood) met oude prijs doorgestreept, knop *Bekijk*
- Telling "70 vloeren", sortering (prijs, aanbieding)

### Productdetail
- Galerij links, rechts naam, merk, prijs per m², korte beschrijving, vier USP's, knoppen *Offerte aanvragen* en *Plan afspraak*
- Specificatietabel (kleur, patroon, toepassing, afmetingen, m²/doos, vloerverwarming, garantie)
- **m²-berekenaar:** m² → aantal dozen, prijs indicatief
- Beschrijving (per product schrijven of per serie delen)
- "Vergelijkbare vloeren"
- Formulier zet de productnaam vooraf in het bericht

### Showroom
- Hero met showroomfoto, vestigingsblok (adres, tijden, telefoon), fotogalerij, kaart, afspraakformulier (naam, telefoon, voorkeursdag/tijd, vraag), uitleg 10% korting

### Contact
- Drie vlakken: bel · mail · kom langs, formulier (Naam, E-mail, Telefoon, Onderwerp, Bericht; onderwerp als keuzelijst: Offerte / Afspraak / Vraag), kaart. Anker `#formulier` blijft bestaan.

### Over ons
- Missie, 12 jaar ervaring, tellers, waarom K&E, werkwijze (4 stappen), merken, CTA

### FAQ
- Alle vragen, gegroepeerd (Kiezen, Leggen, Onderhoud, Levering/Garantie). Herschreven voor PVC.

## 4. Aangeleverd (29-10-2026)

- **Logo:** `ke-logo.png`, wit met transparante achtergrond. Werkt direct op donker. Voor crème-vlakken is een donkere versie nodig (is zo te maken door het wit om te kleuren).
- **Tellers:** 3.429 klanten · 12 specialisten · 896 projecten
- **Telefoon:** 035 785 1272 (ook voor WhatsApp, nog bevestigen)
- **Prijzen:** zijn per m²
- **Beeld:**
  - `Soest-cropped.jpg`: gevel met bord "K&E Vloeren – De vloeren specialist"
  - `WhatsApp-Image-…-6-2.webp`: showroomwand met visgraat
  - `a756ed86-….jpg`: houtstalen op donkere eikenvloer (stockfoto, geschikt als hero- of sectiebeeld)
  - `VID-20250527-WA0004.mp4`: showroomvideo (WhatsApp)
  - `laminate-sales-manager-….mov`: stockvideo van adviseur met stalen

**Besloten:** in de winkel ook laminaat en parket (gevelbord: "Laminaat · PVC Vloeren · Parket"), online alleen PVC.
- Catalogus en filters: alleen PVC.
- FAQ en teksten: PVC-antwoorden, plus een blok "Ook laminaat en parket? Kom langs in de showroom" met CTA naar afspraak/contact.
- Showroom- en Over ons-pagina noemen het volledige assortiment (PVC, laminaat, parket).
- Menu "Vloeren" blijft PVC; overweeg een duidelijke regel "Meer assortiment in de showroom".

## 5. Nog nodig van de klant

- Reviews, merklogo's (Enviro, Treefloor, Ambiant)
- Meer foto's: vloer-legwerk en opgeleverde projecten
- KvK/btw, privacy- en retourtekst
- Bevestiging van de assortimentsvraag hierboven
- Het .mov-bestand (11 MB) en de mp4 moeten voor het web verkleind worden
