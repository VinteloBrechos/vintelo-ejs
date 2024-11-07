//               barra da pesquisa             //
document.querySelector('.search-icon').addEventListener('click', function() {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        console.log('Buscando por:', searchTerm);
      
    } else {
        alert('Por favor, insira um termo para buscar.');
    }
  });




  // Imagens na seçao de produtos
var modal = document.getElementById("modal");
var img = document.getElementById("imagem-clique");
var modalImg = document.getElementById("imagem-modal");
var captionText = document.getElementById("legenda");
var fechar = document.getElementsByClassName("fechar")[0];

// Quando o usuário clica na imagem, ela é ampliada no modal
img.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt; // Exibe o alt como legenda
}

// Quando o usuário clica no "x", o modal fecha
fechar.onclick = function() {
  modal.style.display = "none";
}


//       formas de pagamento 
function selectPayment(element) {
  // Remove a classe 'selected' de todos os itens de pagamento
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => option.classList.remove('selected'));
  
  // Adiciona a classe 'selected' ao item clicado
  element.classList.add('selected');
}




//                                  vaçidação de cadastro          
const form = document.getElementById("form");
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
 
 
 
form.addEventListener("submit", (event) => {
  event.preventDefault();
 
  checkForm();
})
 
email.addEventListener("blur", () => {
  checkInputEmail();
})
 
 
username.addEventListener("blur", () => {
  checkInputUsername();
})
 
 
function checkInputUsername(){
  const usernameValue = username.value;
 
  if(usernameValue === ""){
    errorInput(username, "Preencha um username!")
  }else{
    const formItem = username.parentElement;
    formItem.className = "form-content"
  }
 
}
 
function checkInputEmail(){
  const emailValue = email.value;
 
  if(emailValue === ""){
    errorInput(email, "O email é obrigatório.")
  }else{
    const formItem = email.parentElement;
    formItem.className = "form-content"
  }
 
 
}
 
 
function checkInputPassword(){
  const passwordValue = password.value;
 
  if(passwordValue === ""){
    errorInput(password, "A senha é obrigatória.")
  }else if(passwordValue.length < 8){
    errorInput(password, "A senha precisa ter no mínimo 8 caracteres.")
  }else{
    const formItem = password.parentElement;
    formItem.className = "form-content"
  }
 
 
}
 
 
 
 
function checkForm(){
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
 
 
  const formItems = form.querySelectorAll(".form-content")
 
  const isValid = [...formItems].every( (item) => {
    return item.className === "form-content"
  });
 
  if(isValid){
    alert("CADASTRADO COM SUCESSO!")
  }
 
}
 
 
function errorInput(input, message){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a")
 
  textMessage.innerText = message;
 
  formItem.className = "form-content error"
 
}

//                   validaçaõ do formulario e do botão
function validarLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username) {
      alert("Por favor, insira seu email ou nome de usuário.");
      return false;
  }

  if (!password || password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return false;
  }

  alert("Login realizado com sucesso!");
 
  window.location.href = "/carrinho";
  return true;
}


function validarLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
 
    if (!username) {
        alert("Por favor, insira seu email ou nome de usuário.");
        return false;
    }
 
    if (!password || password.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return false;
    }
 
    alert("Login realizado com sucesso!");
   
    window.location.href = "/carrinho";
    return true;
}
 
 
function validarLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username) {
      alert("Por favor, insira seu email ou nome de usuário.");
      return false;
  }

  if (!password || password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return false;
  }

  alert("Login realizado com sucesso!");
 
  window.location.href = "/carrinho";
  return true;
}


function validarCadastro() {
  const username = document.getElementById('new-username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('new-password').value;
  const phone = document.getElementById('phone').value;
  const cpf = document.getElementById('cpf').value;
  const address = document.getElementById('address').value;  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return false;
  }

 
  if (password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return false;
  }

 
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
      alert("Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.");
      return false;
  }

 
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
      alert("Por favor, insira um CPF válido com 11 dígitos, sem pontos ou traços.");
      return false;
  }

  if (!address) {
      alert("Por favor, insira um endereço.");
      return false;
  }

  alert("Cadastro realizado com sucesso!");6

  function thanks() {
      preventDeafult()
  }
 
 
  return true;
}
 

constform = document.getElementById('loginForm');
  form.addEventListener ('click',
      function(event) {
          event.preventDefault();
          if(validarCadastro()){
              alert('Cadastro Realizado')
              window.location.href = "/finalizandopagamento.ejs";                  
              }
      }

  )