function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
   
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
      if (cpf.length!== 11) return false; // CPF deve ter 11 dígitos
   
   
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
   
  // Exemplo de uso:
  const email1 = 'usuario@email.com';
  const email2 = 'email-invalido.com';
   
  console.log(validarEmail(email1)); // true
  console.log(validarEmail(email2)); // false
   
   
  module.exports = { validarCNPJ, validarCPF, validarEmail };