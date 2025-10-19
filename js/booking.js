document.addEventListener('DOMContentLoaded', ()=>{
  const dataSewa = JSON.parse(localStorage.getItem('dataSewa')) || null;
  const namaInput = document.getElementById('nama');
  const identitasInput = document.getElementById('identitas');
  const whatsappInput = document.getElementById('whatsapp');
  const emailInput = document.getElementById('email');
  const motorInput = document.getElementById('motor');
  const durasiInput = document.getElementById('durasi');
  const hargaInput = document.getElementById('harga');
  const dpInput = document.getElementById('dp');
  const formBooking = document.getElementById('formBooking');
  const pesanSukses = document.getElementById('pesanSukses');
  const detailBox = document.getElementById('detailMotorBox');

  function fmt(n){return 'Rp'+Number(n).toLocaleString();}

  if(dataSewa){
    motorInput.value = dataSewa.nama || '';
    durasiInput.value = dataSewa.durasiJam || 24;
    hargaInput.value = fmt(dataSewa.totalHarga||0);
    dpInput.value = fmt(Math.round((dataSewa.totalHarga||0)/2));
    if(detailBox){
      detailBox.innerHTML = `<img class="img-preview" src="${dataSewa.img}" alt="m"><div class="info"><h4>${dataSewa.nama}</h4><p>${dataSewa.deskripsi}</p><small>Tanggal: ${dataSewa.tanggalAmbil||'-'}</small></div>`;
    }
  }

  durasiInput.addEventListener('input', ()=>{
    const jam = parseInt(durasiInput.value)||1;
    let total=0;
    if(dataSewa && dataSewa.hargaPerHari) total = Math.round((dataSewa.hargaPerHari/24)*jam);
    else total = jam*5000;
    hargaInput.value = fmt(total);
    dpInput.value = fmt(Math.round(total/2));
  });

  formBooking.addEventListener('submit', e=>{
    e.preventDefault();
    if(!namaInput.value.trim()||!identitasInput.value.trim()||!whatsappInput.value.trim()||!emailInput.value.trim()){
      alert('Mohon isi semua kolom!');
      return;
    }
    // save booking record (local only)
    const rec = {nama:namaInput.value,identitas:identitasInput.value,whatsapp:whatsappInput.value,email:emailInput.value,motor:motorInput.value,durasi:parseInt(durasiInput.value),harga:hargaInput.value,dp:dpInput.value};
    const hist = JSON.parse(localStorage.getItem('riwayatBooking')||'[]');
    hist.push(rec);
    localStorage.setItem('riwayatBooking',JSON.stringify(hist));

    formBooking.style.display='none';
    pesanSukses.style.display='block';
    localStorage.removeItem('dataSewa');
  });
});