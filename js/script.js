document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  const langBtn = document.getElementById('langToggle');
  let current = 'ar';
  langBtn.addEventListener('click', () => {
    current = current === 'ar' ? 'en' : 'ar';
    langBtn.textContent = current === 'ar' ? 'English' : 'العربية';
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar]').forEach(el=>{
      el.textContent = current === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
    // Update download buttons
    document.querySelectorAll('[download]').forEach(btn=>{
      const en = btn.getAttribute('data-en'); const ar = btn.getAttribute('data-ar');
      if(en && ar) btn.textContent = document.documentElement.lang === 'ar' ? ar : en;
    });
  });

  document.querySelectorAll('.open-pdf').forEach(b=>{
    b.addEventListener('click', (e)=>{
      e.stopPropagation();
      const file = b.getAttribute('data-file');
      openPdfModal(file);
    });
  });
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      if(e.target.closest('a') || e.target.closest('button')) return;
      const file = card.getAttribute('data-pdf');
      if(file) openPdfModal(file);
    });
  });

  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfView');
  document.querySelector('.modal-close').addEventListener('click', closePdfModal);
  modal.addEventListener('click', function(e){ if(e.target===modal) closePdfModal(); });

  function openPdfModal(path){
    iframe.src = path;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closePdfModal(){
    iframe.src = '';
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // initial content in Arabic
  document.querySelectorAll('[data-ar]').forEach(el=> el.textContent = el.getAttribute('data-ar'));
});