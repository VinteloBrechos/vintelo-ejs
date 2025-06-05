function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14)
    return false;

  // Elimina CNPJs inválidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

    
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return false;

  return true;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D+/g, ''); // remove caracteres não numéricos
  if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos


  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) return false; // CPF deve ter apenas dígitos
  if (cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;

  let sum = 0;
  let weight = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 9; i++) {
    sum += cpf.charAt(i) * weight[i];
  }

  let verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;

  if (cpf.charAt(9) !== verifyingDigit.toString()) return false;

  sum = 0;
  weight = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 10; i++) {
    sum += cpf.charAt(i) * weight[i];
  }

  verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;

  if (cpf.charAt(10) !== verifyingDigit.toString()) return false;

  return true;
}

function validarEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validarCadastro() {
  let username = document.getElementById('nome').value.trim();
  let email = document.getElementById('email').value.trim();
  let senha = document.getElementById('senha').value.trim();

  let senhaInput = document.getElementById('senha');
  let confirmarSenha = document.getElementById('password').value.trim();
  let confirmarSenhaInput = document.getElementById('password');
  let cpf = document.getElementById('cpf').value;
  let cpfInput = document.getElementById('cpf');
  let isValid = true;

  // Validação do nome de usuário
  if (username.length < 3) {
    alert("O nome de usuário deve ter pelo menos 3 caracteres.");
    return false;
  }

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido.");
    return false;
  }

  // validarCPF(cpf)
  console.log(`${senha} - ${confirmarSenha}`)
  if (senha != confirmarSenha) {
    confirmarSenhaInput.setCustomValidity("As senhas não coincidem.");
    isValid = false;
    return false;
  }
  else {
    confirmarSenhaInput.setCustomValidity("");
  }
  confirmarSenhaInput.reportValidity();

  if (senha.length < 8 || senha.length > 10) {
    senhaInput.setCustomValidity("A senha deve conter entre 8 a 10 digitos");
    return false;
  }
  else {
    senhaInput.setCustomValidity("");
  }
  senhaInput.reportValidity();

  if (!validarCPF(cpf)) {
    cpfInput.setCustomValidity("CPF inválido");
    isValid = false
    return false;
  }
  else {
    cpfInput.setCustomValidity("");
  }
  cpfInput.reportValidity();



  alert("Cadastro realizado com sucesso!");
  return true;
}

// Adiciona o evento de validação ao enviar o formulário
document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();
  let username = document.getElementById('nome').value.trim();
  let email = document.getElementById('email').value.trim();
  let senha = document.getElementById('senha').value.trim();

  let senhaInput = document.getElementById('senha');
  let confirmarSenha = document.getElementById('password').value.trim();
  let confirmarSenhaInput = document.getElementById('password');
  let cpf = document.getElementById('cpf').value;
  let cpfInput = document.getElementById('cpf');
  let isValid = true;
  if (validarCadastro()) {
    window.location.href = "/perfilvender";
  }
  return false;
});


//       formas de pagamento 
function selectPayment(element) {
  // Remove a classe 'selected' de todos os itens de pagamento
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => option.classList.remove('selected'));

  // Adiciona a classe 'selected' ao item clicado
  element.classList.add('selected');
}

