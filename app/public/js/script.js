//               barra da pesquisa             //
document.querySelector('.search-icon').addEventListener('click', function() {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        console.log('Buscando por:', searchTerm);
      
    } else {
        alert('Por favor, insira um termo para buscar.');
    }
  });