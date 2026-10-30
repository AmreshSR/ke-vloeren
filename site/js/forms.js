// Voorlopig: formulieren openen de mailapp met een ingevulde e-mail aan K&E.
// Vervang door een echte formulierdienst of backend bij livegang.
(function(){
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const lines = [];
      form.querySelectorAll('input, select, textarea').forEach(el => {
        if(!el.value.trim() || el.type === 'submit') return;
        const label = form.querySelector(`label[for="${el.id}"]`)?.textContent.replace(/\s*\*$/, '') || el.name || el.id;
        lines.push(`${label}: ${el.value.trim()}`);
      });
      const subject = form.dataset.subject || 'Bericht via de website';
      const onderwerp = form.querySelector('#onderwerp');
      location.href = `mailto:kevloeren@gmail.com?subject=${encodeURIComponent(onderwerp ? onderwerp.value + ' – website' : subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      const m = form.querySelector('.melding');
      if(m){ m.textContent = 'Uw e-mailprogramma wordt geopend. Geen mail gezien? Bel ons op 035 785 1272.'; m.classList.add('zichtbaar'); }
    });
  });

  // open/gesloten + vandaag markeren (Europe/Amsterdam)
  const nu = new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Amsterdam'}));
  const dag = nu.getDay(), uur = nu.getHours() + nu.getMinutes() / 60;
  const rij = document.querySelector(`.uren tr[data-dag="${dag}"]`);
  if(rij) rij.classList.add('vandaag');

  // lightbox
  const lb = document.getElementById('lightbox');
  if(lb){
    const li = lb.querySelector('img');
    document.querySelectorAll('.galerij-sr button').forEach(b => b.addEventListener('click', () => { li.src = b.dataset.groot; li.alt = b.querySelector('img').alt; lb.classList.add('open'); lb.querySelector('button').focus(); }));
    lb.addEventListener('click', e => { if(e.target === lb || e.target.tagName === 'BUTTON') lb.classList.remove('open'); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') lb.classList.remove('open'); });
  }
})();
