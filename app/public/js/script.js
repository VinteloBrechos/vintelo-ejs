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
