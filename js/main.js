// navbar transparent -> solid on scroll + minor interactions
document.addEventListener('DOMContentLoaded', ()=>{
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  function checkScroll(){
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // Pause video on small devices to save CPU
  const vid = document.getElementById('heroVideo');
  if(vid && (window.innerWidth < 600)) vid.pause();
});