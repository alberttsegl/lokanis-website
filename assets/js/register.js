document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');

  // ==========================================================================
  // 1. SHOW / HIDE PASSWORD INTERACTION
  // ==========================================================================
  togglePasswordBtn.addEventListener('click', () => {
    // Cek tipe input saat ini
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Ganti ikon mata berdasarkan tipe input
    const icon = togglePasswordBtn.querySelector('i');
    if (type === 'text') {
      icon.classList.remove('fa-regular', 'fa-eye');
      icon.classList.add('fa-solid', 'fa-eye-slash');
    } else {
      icon.classList.remove('fa-solid', 'fa-eye-slash');
      icon.classList.add('fa-regular', 'fa-eye');
    }
  });


  // ==========================================================================
  // 2. LIVE FORM VALIDATION ENGINE
  // ==========================================================================
  
  // Fungsi umum validasi kelompok input
  const validateInputGroup = (inputElement, condition) => {
    const inputGroup = inputElement.closest('.input-group');
    if (condition) {
      inputGroup.classList.remove('invalid');
      return true;
    } else {
      inputGroup.classList.add('invalid');
      return false;
    }
  };

  // Validasi pola email secara regex standar
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validasi real-time ketika user mengetik (menghilangkan merah eror langsung jika benar)
  document.getElementById('fullName').addEventListener('input', function() {
    validateInputGroup(this, this.value.trim() !== "");
  });

  passwordInput.addEventListener('input', function() {
    validateInputGroup(this, this.value.length >= 8);
  });

  document.getElementById('email').addEventListener('input', function() {
    validateInputGroup(this, isValidEmail(this.value.trim()));
  });


  // ==========================================================================
  // 3. FORM SUBMIT HANDLER
  // ==========================================================================
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Menahan form reload halaman

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const agreeTerms = document.getElementById('agreeTerms');

    // Jalankan seluruh check validasi
    const isNameValid = validateInputGroup(fullName, fullName.value.trim() !== "");
    const isEmailValid = validateInputGroup(email, isValidEmail(email.value.trim()));
    const isPasswordValid = validateInputGroup(passwordInput, passwordInput.value.length >= 8);

    // Pastikan persetujuan kotak ceklis sudah dicentang
    if (!agreeTerms.checked) {
      alert('Anda harus menyetujui Syarat dan Ketentuan Lokanis terlebih dahulu.');
      return;
    }

    // Jika seluruh form sudah lolos kualifikasi
    if (isNameValid && isEmailValid && isPasswordValid) {
      // Siapkan simulasi loading berkelas di tombol
      const submitBtn = registerForm.querySelector('.btn-submit-register');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses...';

      setTimeout(() => {
        alert('Registrasi Berhasil! Selamat bergabung di Lokanis.');
        registerForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        // Di sini kamu bisa arahkan user ke login page: window.location.href = "login.html";
      }, 1500);
    }
  });
});