// Sistema de favoritos
document.addEventListener('DOMContentLoaded', function() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    function updateFavoriteButton(button, isFavorited) {
        const img = button.querySelector('img');
        if (isFavorited) {
            img.src = 'imagens/coraçao de fav.png';
            button.classList.add('favorited');
        } else {
            img.src = 'imagens/coraçao de fav2.png';
            button.classList.remove('favorited');
        }
    }
    
    function toggleFavorite(productId, button) {
        const index = favorites.indexOf(productId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            updateFavoriteButton(button, false);
        } else {
            favorites.push(productId);
            updateFavoriteButton(button, true);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    const favoriteButtons = document.querySelectorAll('.favorite');
    favoriteButtons.forEach((button, index) => {
        const productId = `product-${index}`;
        const isFavorited = favorites.includes(productId);
        
        updateFavoriteButton(button, isFavorited);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorite(productId, button);
        });
    });
});