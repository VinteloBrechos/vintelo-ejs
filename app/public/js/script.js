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