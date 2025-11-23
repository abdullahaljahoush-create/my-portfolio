
function setLang(lang){
  document.querySelectorAll('[data-ar]').forEach(el=>{
    el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });
  document.documentElement.lang = lang;
}

function downloadCV(){
  window.open('assets/CV.pdf', '_blank');
}
