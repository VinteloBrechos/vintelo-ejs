const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmar-senha');
const cpfInput = document.getElementById('cpf');
const passwordRequirementsBox = document.getElementById('password-requirements-box');
 
function isCPF(value) {
  return value.length === 11;
}
 
function formatCPF(input) {
  let value = input.value.replace(/\D+/g, '');
  if (isCPF(value)) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }
  input.value = value;
}
 
cpfInput.addEventListener('input', function() {
  formatCPF(this);
});
 
cpfInput.addEventListener('keypress', function(e) {
  const char = String.fromCharCode(e.which);
  const currentLength = this.value.replace(/\D/g, '').length;
 
  if (!/\d/.test(char) || currentLength >= 11) {
    e.preventDefault();
  }
});
 
senhaInput.addEventListener('input', function() {
  const senha = this.value;
  const length = document.getElementById('length');
  const lowercase = document.getElementById('lowercase');
  const uppercase = document.getElementById('uppercase');
  const number = document.getElementById('number');
  const symbol = document.getElementById('symbol');
 
  length.classList.toggle('valid', senha.length >= 8 && senha.length <= 10);
  length.classList.toggle('invalid', senha.length < 8 || senha.length > 10);
 
  lowercase.classList.toggle('valid', /[a-z]/.test(senha));
  lowercase.classList.toggle('invalid', !/[a-z]/.test(senha));
 
  uppercase.classList.toggle('valid', /[A-Z]/.test(senha));
  uppercase.classList.toggle('invalid', !/[A-Z]/.test(senha));
 
  number.classList.toggle('valid', /\d/.test(senha));
  number.classList.toggle('invalid', !/\d/.test(senha));
 
  symbol.classList.toggle('valid', /[@$!%*?&]/.test(senha));
  symbol.classList.toggle('invalid', !/[@$!%*?&]/.test(senha));
});
 
function showPasswordCriteria() {
  passwordRequirementsBox.style.display = 'block';
}
 
function hidePasswordCriteria() {
  if (!senhaInput.value) {
    passwordRequirementsBox.style.display = 'none';
  }
}
 
senhaInput.addEventListener('focus', showPasswordCriteria);
senhaInput.addEventListener('blur', hidePasswordCriteria);
 
confirmarSenhaInput.addEventListener('input', function() {
  confirmarSenhaInput.setCustomValidity(senhaInput.value !== this.value ? "As senhas não coincidem." : "");
});
 
document.getElementById('registration-form').addEventListener('submit', function(event) {
  const senha = senhaInput.value;
  const confirmarSenha = confirmarSenhaInput.value;
  const cpf = cpfInput.value.replace(/\D/g, '');
  let isValid = true;
 
  if (senha !== confirmarSenha) {
    confirmarSenhaInput.setCustomValidity("As senhas não coincidem.");
    isValid = false;
  } else {
    confirmarSenhaInput.setCustomValidity("");
  }
 
  if (senha.length < 8 || senha.length > 10) {
    senhaInput.setCustomValidity("A senha deve ter entre 8 e 10 caracteres.");
    isValid = false;
  } else {
    senhaInput.setCustomValidity("");
  }
 
  if (!isCPF(cpf)) {
    cpfInput.setCustomValidity("CPF inválido.");
    isValid = false;
  } else {
    cpfInput.setCustomValidity("");
  }
 
  if (!isValid) {
    event.preventDefault();
  }
});
 