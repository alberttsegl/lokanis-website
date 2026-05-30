document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('detailModal');
  const closeModalCross = document.getElementById('closeModalCross');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  // Target manipulasi DOM modal
  const modalNama = document.getElementById('modalNama');
  const modalHotel = document.getElementById('modalHotel');
  const modalKamar = document.getElementById('modalKamar');

  const viewButtons = document.querySelectorAll('.btn-view');

  // Distribusi data baris tabel ke modal pop-up
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nama = this.getAttribute('data-nama');
      const hotel = this.getAttribute('data-hotel');
      const kamar = this.getAttribute('data-kamar');

      modalNama.textContent = `: ${nama}`;
      modalHotel.textContent = `: ${hotel}`;
      modalKamar.textContent = `: ${kamar}`;

      modalOverlay.classList.add('active');
    });
  });

  // Fungsi tutup modal
  const closeModal = () => {
    modalOverlay.classList.remove('active');
  };

  closeModalCross.addEventListener('click', closeModal);
  closeModalBtn.addEventListener('click', closeModal);

  // Tutup jika area luar (overlay hitam) diklik
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});