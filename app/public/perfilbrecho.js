// Funcionalidades dos filtros laterais

// Filtrar por categoria
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Filtro por categoria
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos os botões
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Filtro por tamanho
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
});

function filterByCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'todos' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Ordenar produtos
function sortProducts(type) {
    const productsSection = document.querySelector('.products-section');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
        
        switch(type) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'recent':
            case 'popular':
            default:
                return 0;
        }
    });
    
    // Reordenar no DOM
    products.forEach(product => {
        productsSection.appendChild(product);
    });
}

// Atualizar range de preço
function updatePriceRange() {
    const minRange = document.getElementById('min');
    const maxRange = document.getElementById('max');
    const minValue = document.getElementById('min-value');
    const maxValue = document.getElementById('max-value');
    
    minValue.value = minRange.value;
    maxValue.value = maxRange.value;
}

// Filtrar por preço
function filterByPrice() {
    const minPrice = parseFloat(document.getElementById('min-value').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-value').value) || 999;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const price = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
        
        if (price >= minPrice && price <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Aplicar todos os filtros
function applyFilters() {
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'todos';
    const activeSizes = Array.from(document.querySelectorAll('.size-btn.active')).map(btn => btn.dataset.size);
    const minPrice = parseFloat(document.getElementById('min-value').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-value').value) || 999;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardPrice = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
        
        let showCard = true;
        
        // Filtro por categoria
        if (activeCategory !== 'todos' && cardCategory !== activeCategory) {
            showCard = false;
        }
        
        // Filtro por preço
        if (cardPrice < minPrice || cardPrice > maxPrice) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Limpar filtros
function clearFilters() {
    // Limpar categorias
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.category-btn[data-category="todos"]').classList.add('active');
    
    // Limpar tamanhos
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    
    // Limpar preços
    document.getElementById('min').value = 0;
    document.getElementById('max').value = 500;
    document.getElementById('min-value').value = 0;
    document.getElementById('max-value').value = 500;
    
    // Limpar condições
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Mostrar todos os produtos
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'block';
    });
}

// Carregar mais produtos
function loadMoreProducts() {
    alert('Funcionalidade de carregar mais produtos em desenvolvimento');
}