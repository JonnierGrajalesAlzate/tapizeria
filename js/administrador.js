const showHiddenPassword = (inputPassword, inputIcon) => {
    const input = document.getElementById(inputPassword),
          iconEye = document.getElementById(inputIcon)
  
    iconEye.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
        iconEye.classList.add('ri-eye-line');
        iconEye.classList.remove('ri-eye-off-line');
      } else {
        input.type = 'password';
        iconEye.classList.remove('ri-eye-line');
        iconEye.classList.add('ri-eye-off-line');
      }
    });
  }
  showHiddenPassword('password', 'input-icon');
  document.querySelector('.login__form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === 'admin444@gmail.com' && password === 'TecnoTapiz') {
      window.location.href = 'admin.html'; 
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });
  