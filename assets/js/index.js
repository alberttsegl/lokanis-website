document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navbarHeader = document.querySelector('.navbar-header');

  // ==========================================================================
  // 1. NAVIGATION LOGIC (MOBILE & STICKY)
  // ==========================================================================
  
  // Toggle Hamburger Menu Mobile
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Tutup menu otomatis jika salah satu navigasi ditekan
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Mengubah transparansi & padding saat melewati batas atas halaman
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbarHeader.classList.add('scrolled');
    } else {
      navbarHeader.classList.remove('scrolled');
    }
  });


  // ==========================================================================
  // 2. KREASI BARU: SCROLL ANIMATION FOR CARDS (INTERACTION PREMIUM)
  // ==========================================================================
  const cards = document.querySelectorAll('.card-item');
  
  // Konfigurasi Intersection Observer untuk mendeteksi kapan card masuk ke layar
  const observerOptions = {
    root: null, // Menggunakan viewport browser
    threshold: 0.15, // Animasi jalan pas 15% bagian kartu udah kelihatan
    rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum benar-benar mentok bawah
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Kasih delay staggered (bergantian) cuma di desktop biar rapi
        if (window.innerWidth > 992) {
          // Kolom 1, 2, 3 muncul bergantian (0ms, 150ms, 300ms)
          const delay = (index % 3) * 150; 
          setTimeout(() => {
            entry.target.classList.add('show');
          }, delay);
        } else {
          // Di mobile langsung muncul aja tanpa delay biar ga lola pas di-scroll cepat
          entry.target.classList.add('show');
        }
        
        // Hentikan pantauan setelah kartu sukses muncul
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Daftarkan semua kartu ke dalam engine observer
  cards.forEach(card => {
    cardObserver.observe(card);
  });
});