// Basic filtering and search in homepage
document.addEventListener('DOMContentLoaded', ()=>{
  const filterJenis = document.getElementById('filterJenis');
  const filterCC = document.getElementById('filterCC');
  const filterHarga = document.getElementById('filterHarga');
  const searchBox = document.getElementById('searchBox');
  const cards = document.querySelectorAll('.motor-card');

  function applyFilter(){
    const jenis = filterJenis.value;
    const cc = filterCC.value;
    const harga = filterHarga.value;
    const q = (searchBox.value||'').toLowerCase().trim();

    cards.forEach(card=>{
      const jenisCard = card.dataset.jenis;
      const ccCard = card.dataset.cc;
      const hargaCard = parseInt(card.dataset.harga);
      const title = card.querySelector('h3').textContent.toLowerCase();

      let show=true;
      if(jenis && jenis!==jenisCard) show=false;
      if(cc && cc!==ccCard) show=false;
      if(harga){
        if(harga==='low' && hargaCard>100000) show=false;
        if(harga==='mid' && (hargaCard<100000 || hargaCard>150000)) show=false;
        if(harga==='high' && hargaCard<150000) show=false;
      }
      if(q && !title.includes(q)) show=false;
      card.style.display = show ? 'flex' : 'none';
    });
  }

  [filterJenis,filterCC,filterHarga,searchBox].forEach(el=>{
    if(el) el.addEventListener('input', applyFilter);
  });
});