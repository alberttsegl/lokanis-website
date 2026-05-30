document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');

  // ==========================================================================
  // 1. INTERAKSI SHOW / HIDE PASSWORD
  // ==========================================================================
  togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
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
  // 2. REAL-TIME VALIDATION LOGIC
  // ==========================================================================
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

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Bersihkan status error jika user mengetik ulang koreksinya
  document.getElementById('email').addEventListener('input', function() {
    validateInputGroup(this, isValidEmail(this.value.trim()));
  });

  passwordInput.addEventListener('input', function() {
    validateInputGroup(this, this.value.trim() !== "");
  });


  // ==========================================================================
  // 3. SUBMIT FORM CONTROLLER (SIMULASI AUTH)
  // ==========================================================================
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email');

    // Cek kelayakan input data
    const isEmailValid = validateInputGroup(email, isValidEmail(email.value.trim()));
    const isPasswordValid = validateInputGroup(passwordInput, passwordInput.value.trim() !== "");

    if (isEmailValid && isPasswordValid) {
      const submitBtn = loginForm.querySelector('.btn-submit-login');
      const originalText = submitBtn.innerHTML;
      
      // Berikan efek loading micro-interaction premium
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Autentikasi...';

      setTimeout(() => {
        alert('Berhasil Masuk! Mengarahkan Anda kembali ke Beranda Lokanis.');
        loginForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Alihkan halaman ke beranda utama setelah sukses
        window.location.href = "index.html";
      }, 1200);
    }
  });
});