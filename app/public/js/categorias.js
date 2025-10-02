document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrosseis
    initCarousels();
    
    // Event listeners para botões
    setupProductButtons();
});

function initCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(carousel => {
        // Adicionar funcionalidade de scroll suave
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

function setupProductButtons() {
    // Botões de favorito
    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorite(this);
        });
    });
    
    // Botões de carrinho
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this);
        });
    });
}

function toggleFavorite(button) {
    const img = button.querySelector('img');
    const currentSrc = img.src;
    
    if (currentSrc.includes('coraçao de fav2.png')) {
        img.src = '/imagens/coraçao de fav.png';
        button.style.background = '#ff6b6b';
    } else {
        img.src = '/imagens/coraçao de fav2.png';
        button.style.background = 'rgba(255,255,255,0.9)';
    }
}

function addToCart(button) {
    // Animação de feedback
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Aqui você pode adicionar a lógica para adicionar ao carrinho
    console.log('Produto adicionado ao carrinho');
}