let selectedRating = 0;

// Funcionalidade de avaliação por estrelas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStars();
        });
    });
});

function updateStars() {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Toggle do formulário de avaliação
function toggleReviewForm() {
    const form = document.getElementById('reviewForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Submissão de nova avaliação
function submitReview(event) {
    event.preventDefault();
    
    const reviewText = document.getElementById('reviewText').value;
    
    if (selectedRating === 0) {
        alert('Por favor, selecione uma nota!');
        return;
    }
    
    if (reviewText.trim() === '') {
        alert('Por favor, escreva um comentário!');
        return;
    }
    
    // Criar nova avaliação
    const newReview = createReviewElement('Você', 'Agora', selectedRating, reviewText);
    
    // Adicionar no topo da lista
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    
    // Limpar formulário
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    updateStars();
    toggleReviewForm();
    
    alert('Avaliação publicada com sucesso!');
}

function createReviewElement(name, date, rating, text) {
    const reviewItem = document.createElement('section');
    reviewItem.className = 'review-item';
    
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    reviewItem.innerHTML = `
        <img src="imagens/imagem sem cadastro.avif" alt="${name}" class="profile-pic">
        <section class="review-content">
            <section class="review-header">
                <h3>${name}</h3>
                <span class="review-date">${date}</span>
            </section>
            <p class="rating">${rating}.0 <span class="stars">${stars}</span></p>
            <p class="review-text">${text}</p>
        </section>
    `;
    
    return reviewItem;
}