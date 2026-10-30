# K&E Vloeren – inventaris huidige site (kevloeren.nl)

Stand: 29-10-2026. Bron: live site + `kevloeren_export` (70 producten). Techniek nu: WordPress, WooCommerce, Elementor, YITH-filters, MetForm.

## 1. Sitemap

| Pagina | URL | Opmerking |
|---|---|---|
| Home | `/` | Showroomkorting, aanbiedingen, FAQ |
| Over ons | `/over-ons/` | Missie, USP's, werkwijze |
| Vloeren (assortiment) | `/vloeren/` | Productgrid + filters |
| Product (x70) | `/product/<slug>/` | Zie §4 |
| Contact | `/contact/` | Formulier, kaart, gegevens |
| Showroom | `/showroom/` | Adres + fotogalerij |
| Winkelwagen / Afrekenen / Mijn account | `/winkelwagen/` `/afrekenen/` `/mijn-account/` | WooCommerce-standaard |
| Winkel | `/winkel/` | Waarschijnlijk dubbel met /vloeren/ |
| Oude pagina's | `/vloeren-oud/`, `/vloeren-oud/pvc-klik/`, `/vloeren-oud/pvc-plak/` | Nog indexeerbaar. Redirect naar nieuw, of laten vervallen |
| Categorie | `/product-categorie/pvc/`, `/pvc-klik/` | |
| Merk | `/merk/enviro/`, `/treefloor/`, `/ambiant/` | |
| Tag | `/product-tag/aanbieding/` (+ evt. overige tags) | |
| Algemene Voorwaarden | PDF in `/wp-content/uploads/2026/02/` | Alleen als PDF |

Niet gevonden in de sitemap: privacyverklaring, cookiebeleid, retour-/verzend-/garantiepagina, blog, 404-ontwerp.

## 2. Globale elementen (op elke pagina)

- **Bovenbalk:** "Plan zelf je afspraak in bij één van onze showroom's en ontvang 10% extra korting op het gehele assortiment."
- **Menu:** Home · Over ons · Vloeren · Contact · Showroom. Zoek-icoon op productpagina. Winkelwagen-flow is aanwezig.
- **Footer:**
  - Logo (`ke-logo.png`)
  - Tekst: "Bij K&E Vloeren geloven wij in persoonlijk contact en een klantgerichte aanpak. U kunt langskomen bij onze showroom in Soest, daar hebben wij een breed assortiment aan vloeren."
  - Social: Facebook (`facebook.com/profile.php?id=100090220471246`), TikTok (`@ke.vloeren`)
  - Telefoon: SOEST – 035 785 1272
  - E-mail: kevloeren@gmail.com
  - Locatie: Van Weedestraat 27, 3761 CB Soest
  - Openingstijden: Di–Za 10:00–18:00, Zo–Ma gesloten
  - Link: Algemene Voorwaarden (PDF)
  - Copyright: "© 2025 K&E Vloeren | door Dé MKB Marketeer"
- **Zwevende WhatsApp-knop:** "Stuur ons een WhatsApp!" (het nummer is nog niet uitgelezen)
- Favicon en logo staan in `/wp-content/uploads/2025/05/`.

## 3. Copy per pagina

### Home
1. **Hero/banner** "Exclusieve Showroomkorting": "Profiteer nu van exclusieve kortingen op geselecteerde visgraat vloeren – Wij hebben al visgraat voor €19,95 per m2 – alleen in onze showroom in Soest – zo lang de voorraad strekt." CTA: *Ontdek onze Showroom* → `/showroom/`. (Hero-afbeelding of -video niet in de tekst terug te vinden: nog visueel checken.)
2. **"Tijdelijke Aanbieding"**: slider met 3 producten (Spigato Estino Beige, Dark Oak, Warm Oak), van €49,95 naar €43,95, met *Toevoegen aan winkelwagen*.
3. **"Veelgestelde Vragen"**: accordeon met 12 vragen (zie §6).
4. Footer.

### Over ons
- Titel "Over Ons"
- **Missie** + kop "12 Jaar ervaring": "Onze missie is om klanttevredenheid, duurzaamheid en persoonlijk contact te combineren om een unieke ervaring te bieden bij het kiezen van de juiste vloer voor jouw huis of bedrijf."
- **Kwalitatief hoogwaardige vloeren**: duurzaamheid, milieuvriendelijke materialen, samenwerking met fabrikanten met strikte milieunormen.
- **Tellers:** Klanten 3.429 · Specialisten 12 · Projecten 896 (aangeleverd door de klant).
- **Waarom voor ons kiezen** (3 USP's met icoon):
  - Vakmanschap: "Onze vloeren worden gelegd door ervaren vakmensen. U ziet het verschil in elke afwerking en detail."
  - Innovatieve Designs: "Wij volgen de nieuwste trends en bieden unieke vloerstijlen voor elk interieur."
  - Alleen de beste kwaliteit: "Wij werken enkel met topmerken en duurzame materialen voor jarenlang woonplezier."
- **Hoe we te werk gaan**: intro "Het veranderen van de vloer in je woning kan een opmerkelijke transformatie teweegbrengen…" + 4 stappen:
  1. Contact Ons: vrijblijvende offerte of meer informatie
  2. Adviesgesprek: wensen bespreken, beste oplossing adviseren
  3. Inspectie Locatie: opmeten en situatie bekijken
  4. Uitvoering: vakmensen plaatsen de vloer
- Afbeeldingen op deze pagina zijn niet uitgelezen: visueel checken.

### Vloeren (assortiment)
- Titel "assortiment – Vloeren"
- **Filters:** Vloer (PVC, PVC – klik) · Toepassing (Klik, Plak) · Patroon (Plank, Visgraat) · Kleur (Beige, Brown, Dark Grey, Dark Oak, Eiken, Eiken naturel, Licht Eiken, Licht naturel, Naturel, Warm Oak) · Merk (alleen Enviro zichtbaar, terwijl Treefloor en Ambiant ook bestaan)
- Grid: foto 1 + hover-foto 2, naam, prijs (oud/nieuw bij aanbieding), badge "Aanbieding!", knop *Toevoegen aan winkelwagen*. Geen paginering zichtbaar: alle 70 producten op één pagina.

### Showroom
- Titel "onze showroom" · "Vestiging Soest": Van Weedestraat 27, 3761 CB Soest · 035 785 1272 · kevloeren@gmail.com · Di–Za 10:00–18:00 · Zo–Ma gesloten
- Galerij van 6 foto's (WhatsApp-beelden van 22-03-2024, `.webp`). Dubbel in de DOM (carousel). Kwaliteit en actualiteit controleren, liever nieuwe foto's laten maken.

### Contact
- Titel "contact met ons"
- Blokken: telefoon (035 785 1272, tel-link) · e-mail (tekst "We streven ernaar om uw vragen zo snel mogelijk te beantwoorden…", knop *Stuur e-mail*) · **Kom langs** ("…voor vrijblijvend advies in een breed assortiment aan vloeren", link *Google Maps Soest* `g.co/kgs/QaCdmpY`) · adres/tijden (herhaling) · ingebedde kaart (waarschijnlijk)
- **Formulier** "Vragen? Stel ze gerust…": Naam* · E-mailadres* · Telefoonnummer · Onderwerp* · Bericht* · knop VERZENDEN. (MetForm)
- Productpagina's linken naar `/contact/#formulier`, dus dat anker moet in het nieuwe ontwerp bestaan.

## 4. Productpagina (template)

Elementen: galerij (2-3 foto's + thumbs, zoom) · titel · categorie, tag, merk · prijs (oud/nieuw) · CTA *Offerte Aanvragen* → `/contact/#formulier` · 4 vaste USP's: "Alles op voorraad", "Direct mee te nemen", "Uitstekende legservice", "Gegarandeerd de laagste prijs!" · tabel "Extra informatie" · beschrijving (zie §5).

Specs per product: Kleur, Toepassing, Patroon, Lengte, Breedte, Hoogte, m²/doos, Plaatsingswijze, Vloerverwarming, Garantie, Merk.

Let op: op de lijst staat *Toevoegen aan winkelwagen*, op het product *Offerte Aanvragen*. Bepaal of het een webshop of een offerte-site wordt.

## 5. Productdata (map `kevloeren_export`)

- **70 producten**, 113 foto's (`fotos/`), `producten.json` + `.csv`. Alles op voorraad.
- **Merken:** Enviro 52 · TreeFloor 9 · Ambiant 6 · geen merk 3 (de SH-01/03/04 PVC Visgraat Klik 6MM)
- **Categorieën:** PVC 70 · PVC-klik 5 (inconsistent: de klikvloeren zitten er niet allemaal in; Toepassing-spec is betrouwbaarder)
- **Patroon:** Visgraat 39 · Plank 31. **Toepassing:** Klik 44 · Plak 26
- **Aanbieding:** 18 producten
- **Prijsniveaus (€/m²):** 19,95 (3, SH-serie, was 29,95) · 24,95 (26, Enviro plak) · 28,95 (12) · 29,95 (14) · 37,95 (5, Treefloor plank, was 44,95) · 43,95 (10, was 49,95)
- **Beschrijving:** 64 hebben tekst, maar die is bijna allemaal gedeeld: 40 producten hebben dezelfde openingszin ("Deze PVC visgraat klikvloer heeft een geïntegreerde ondervloer…"). 6 Spigato-producten (Ambiant) hebben geen beschrijving.
- **Specs ontbreken** bij 4 producten (o.a. Lengte/Breedte/m²-doos bij 66 van 70 aanwezig).

## 6. FAQ-copy (home, 12 vragen)

1. Verschil laminaat en hardhout
2. Zelf installeren of laten doen
3. Schoonmaken en onderhouden
4. Geschikt voor huisdieren
5. Vloerverwarming
6. Levensduur
7. Retourneren
8. Garanties
9. Levering aan huis en kosten
10. Vloer laten leggen en kosten
11. Egaliseren vooraf
12. Plinten

## 7. Problemen en gaten om op te lossen in het nieuwe ontwerp

**Inhoud die niet klopt**
- FAQ "Moet ik mijn vloer egaliseren?" bevat het **garantie-antwoord** (kopieerfout). Echt antwoord schrijven.
- FAQ gaat over **laminaat en hardhout**, maar de site verkoopt **alleen PVC**. Herschrijven naar PVC.
- "showroom's" (meervoud) terwijl er één vestiging is, tenzij er plannen zijn voor meer.
- Copyright "© 2025"; "12 jaar ervaring" is onderbouwd noch gedateerd.
- Treefloor-namen met variaties/typfouten: "Kammerbruhl" en "Kammebruhl", "Buchenacker" en "Buchacker". Merk "TreeFloor" vs "Treefloor".
- Merkfilter toont alleen Enviro. Categorie "PVC – klik" is niet volledig gevuld.
- Banner "10% extra korting" (bij afspraak) naast "laagste prijs gegarandeerd" en de aanbiedingsprijzen: voorwaarden uitleggen.

**Ontbreekt, nodig voor een nieuw ontwerp**
- Echte cijfers voor de tellers (klanten/specialisten/projecten).
- Werk-/sfeerfoto's (opgeleverde projecten), reviews of Google-score.
- Recente showroomfoto's.
- Privacy, cookies, retour, verzending en garantie als losse pagina's (nu alleen PDF met voorwaarden).
- Eenheid bij prijzen: de shop toont alleen "€", alleen de bannertekst noemt "per m2". Waarschijnlijk zijn alle prijzen per m²; laten bevestigen en dan duidelijk tonen.
- Berekenaar (m² naar aantal dozen) en sample-aanvraag, als je ze wilt.
- WhatsApp-nummer, KvK- en btw-nummer, openingstijden op feestdagen.
- Kaart en routebeschrijving.

## 8. Beslissingen vooraf

**Besloten (29-10-2026): offerte- en showroomsite, geen webshop.**
- Vervalt: winkelwagen, afrekenen, mijn account, "Toevoegen aan winkelwagen". Redirect `/winkelwagen/`, `/afrekenen/`, `/mijn-account/`, `/winkel/` naar `/vloeren/` of `/contact/`.
- Product-CTA overal: "Offerte aanvragen" (of "Plan een afspraak"), met productnaam vooraf ingevuld in het formulier.
- Nieuw nodig: afspraak plannen (de 10%-actie hangt daaraan), sample-aanvraag, m²-berekenaar en duidelijke prijzen "vanaf, per m²".
- Productcatalogus blijft, als lookbook met filters (patroon, toepassing, kleur, merk).

Nog open:
1. ~~Webshop of offerte-site?~~ Zie hierboven.
2. **Doel van het nieuwe ontwerp:** showroombezoek en offertes, of online verkoop?
3. **Oude URL's** (`/vloeren-oud/`, `/winkel/`) en product-URL's behouden of redirecten, voor SEO.
4. **Blijft de site op WordPress/WooCommerce** of komt er een nieuwe stack? De productdata is al vrij van WordPress (JSON/CSV).

## 9. Feedback stagiair (feedback_website.docx) en hoe het in het nieuwe ontwerp landt

| # | Feedback | Verwerking in nieuw ontwerp |
|---|---|---|
| 1 | FAQ te lang | Eigen FAQ-pagina met accordeon, gegroepeerd; op home maximaal 6 vragen |
| 2 | Cijfers werkwijze (01-04) te donker | Op donker vlak in zand/crème, groot en met voldoende contrast (WCAG AA) |
| 3 | Productfoto's inconsistent (pakshot vs sfeerbeeld) | Vaste regel: kaart toont sfeerbeeld, hover toont plank. 51 van 70 producten (alle Enviro) hebben maar 1 foto: sfeerbeelden opvragen bij leverancier of uniforme pakshot-stijl gebruiken |
| 4 | Knop Showroom slecht zichtbaar | Primaire knop: zand op donker, hoog contrast |
| 5 | Telefoonnummer niet klikbaar-als-knop | Drie gelijke knoppen: *Bel ons* (tel:), *Stuur e-mail*, *Route (Google Maps)*. Dit klopt al technisch (tel-link bestaat), maar het ziet er niet uit als knop |
| 6 | Reviews + "Waarom K&E" combineren | Eén sectie op home: USP's links, reviews rechts. Echte reviews nodig (Google) |
| 7 | Instagram-link ontbreekt | Toevoegen in footer en contact. **URL nodig** |
| 8 | Vloeren per categorie (PVC, laminaat, hout, parket groothandel) | Zie vraag hieronder |
| 9 | Home: goedkopere vloeren als aanbieding | Home toont eerst de visgraat-aanbieding vanaf €19,95 per m² (SH-serie) en Enviro-plak €24,95, niet de €43,95-vloeren |
| 10 | Home: knop Offerte aanvragen | Zit in menu (knop), hero en sectie showroom/afspraak |

**Tegenstrijdig met eerdere info:** feedback 8 noemt een menu met "PVC vloer, laminaat vloer, houten vloer, parket groothandel". Het live menu (Home, Over ons, Vloeren, Contact, Showroom) heeft die onderverdeling niet, en de webshop heeft alleen PVC. Mogelijk een ander menu, een oudere/nieuwere versie of een wens. Dit raakt het besluit "online alleen PVC".

**Besloten (feedback 8):** online alleen PVC. Laminaat, hout en parket groothandel komen niet als categorie in menu of op de vloerenpagina. De vloerenpagina krijgt wel een eigen indeling binnen PVC (Visgraat/Plank, Klik/Plak, Aanbiedingen) en een blok "Meer assortiment in de showroom".
