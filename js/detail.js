document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(window.location.search);
  const motor = params.get('motor');
  const durasiSelect = document.getElementById('durasi');
  const tanggalInput = document.getElementById('tanggal');
  const totalHargaEl = document.getElementById('totalHarga');
  const totalAside = document.getElementById('totalHargaAside');
  const pricePerDayEl = document.getElementById('pricePerDay');
  const detailImage = document.getElementById('detailImage');
  const motorName = document.getElementById('motorName');
  const specList = document.getElementById('specList');
  const motorShort = document.getElementById('motorShort');
  const longDesc = document.getElementById('longDesc');
  const crumb = document.getElementById('crumbMotor');
  const btnBooking = document.getElementById('btnBooking');

  // Data motor
  const dataMotor = {
    nmax: {
      nama: 'Yamaha NMAX 125',
      jenis: 'Matic',
      cc: '125',
      hargaPerHari: 120000,
      deskripsi: 'Motor matic premium dengan posisi duduk nyaman dan bagasi luas.',
      deskripsiPanjang: 'Yamaha NMAX 125 dirancang untuk perjalanan jauh yang nyaman. Dilengkapi dengan mesin Blue Core 125cc, posisi duduk ergonomis, serta bagasi besar yang bisa menampung helm full face. Cocok untuk perjalanan wisata atau penggunaan harian dengan tampilan modern.',
      img: 'img/motor1.jpg',
      kondisi: 'Baik'
    },
    cb150r: {
      nama: 'Honda CB150R',
      jenis: 'Manual',
      cc: '150',
      hargaPerHari: 130000,
      deskripsi: 'Motor manual dengan tenaga besar dan tampilan sporty.',
      deskripsiPanjang: 'Honda CB150R memiliki performa tangguh dengan mesin 150cc DOHC yang responsif. Cocok untuk kamu yang suka gaya berkendara agresif dan berjiwa sporty. Suspensi depan upside down memberi kestabilan lebih di berbagai medan jalan.',
      img: 'img/motor2.jpg',
      kondisi: 'Baik'
    },
    beat: {
      nama: 'Honda Beat 110',
      jenis: 'Matic',
      cc: '110',
      hargaPerHari: 90000,
      deskripsi: 'Motor ringan dan irit, cocok untuk keliling kota Jogja.',
      deskripsiPanjang: 'Honda Beat 110 terkenal sebagai motor matic paling irit di kelasnya. Bobotnya ringan, mudah dikendalikan, dan efisien dalam konsumsi bahan bakar. Ideal untuk mobilitas sehari-hari di jalanan perkotaan yang padat.',
      img: 'img/motor3.jpg',
      kondisi: 'Baik'
    }
  };

  // Ambil data berdasarkan parameter
  const info = dataMotor[motor] || dataMotor['nmax'];

  // Isi elemen halaman
  detailImage.src = info.img;
  motorName.textContent = info.nama;
  motorShort.textContent = info.deskripsi;
  longDesc.textContent = info.deskripsiPanjang;
  crumb.textContent = info.nama;
  pricePerDayEl.textContent = 'Rp' + info.hargaPerHari.toLocaleString() + ' / hari';
  specList.innerHTML = `
    <li><strong>Jenis:</strong> ${info.jenis}</li>
    <li><strong>CC:</strong> ${info.cc} cc</li>
    <li><strong>Kondisi:</strong> ${info.kondisi}</li>
  `;

  // Hitung total harga
  function hitungTotal(jam) {
    const total = Math.round((info.hargaPerHari / 24) * jam);
    return Math.round(total / 1000) * 1000;
  }

  function updateHarga() {
    const jam = parseInt(durasiSelect.value) || 24;
    const total = hitungTotal(jam);
    totalHargaEl.textContent = 'Rp' + total.toLocaleString();
    if (totalAside) totalAside.textContent = 'Rp' + total.toLocaleString();
    return total;
  }

  durasiSelect.addEventListener('change', updateHarga);
  updateHarga();

  // Simpan ke localStorage saat booking
  btnBooking.addEventListener('click', ()=>{
    const jam = parseInt(durasiSelect.value) || 24;
    const total = hitungTotal(jam);
    const payload = {
      keyMotor: motor || 'nmax',
      nama: info.nama,
      hargaPerHari: info.hargaPerHari,
      durasiJam: jam,
      totalHarga: total,
      tanggalAmbil: tanggalInput.value || '',
      deskripsi: info.deskripsi,
      img: info.img
    };
    localStorage.setItem('dataSewa', JSON.stringify(payload));
  });
});
