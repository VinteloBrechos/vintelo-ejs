// Funcionalidades da página de categorias
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle filtros mobile
    window.toggleFiltros = function() {
        const content = document.getElementById('filtros-content');
        const icon = document.getElementById('filtros-icon');
        
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            icon.textContent = '▼';
        } else {
            content.classList.add('active');
            icon.textContent = '▲';
        }
    };

    // Limpar filtros
    window.limparFiltros = function() {
        const form = document.getElementById('filtros-form');
        form.reset();
        aplicarFiltros();
    };

    window.limparFiltrosDesktop = function() {
        const form = document.getElementById('filtros-form-desktop');
        form.reset();
        aplicarFiltrosDesktop();
    };

    // Aplicar filtros
    function aplicarFiltros() {
        document.getElementById('filtros-form').submit();
    }

    function aplicarFiltrosDesktop() {
        document.getElementById('filtros-form-desktop').submit();
    }

    // Ordenação de produtos
    window.ordenarProdutos = function(criterio) {
        const url = new URL(window.location);
        url.searchParams.set('ordenacao', criterio);
        window.location.href = url.toString();
    };

    // Toggle favorito
    window.toggleFavorito = function(produtoId) {
        const btn = event.target.closest('.btn-favorito');
        
        // Simular requisição AJAX
        fetch('/favoritar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ produtoId: produtoId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                btn.classList.toggle('favorited');
                btn.innerHTML = btn.classList.contains('favorited') ? 
                    '♥ Favoritado' : '♡ Favoritar';
            }
        })
        .catch(error => {
            console.error('Erro ao favoritar:', error);
        });
    };

    // Adicionar à sacola
    window.adicionarSacola = function(produtoId) {
        const btn = event.target.closest('.btn-sacola');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Adicionando...';
        btn.disabled = true;
        
        // Simular requisição AJAX
        fetch('/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ produtoId: produtoId, quantidade: 1 })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                btn.innerHTML = '✓ Adicionado';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Erro ao adicionar');
            }
        })
        .catch(error => {
            console.error('Erro ao adicionar à sacola:', error);
            btn.innerHTML = 'Erro';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
    };

    // Event listeners para formulários
    const formMobile = document.getElementById('filtros-form');
    const formDesktop = document.getElementById('filtros-form-desktop');
    
    if (formMobile) {
        formMobile.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            // Processar checkboxes múltiplos
            for (let [key, value] of formData.entries()) {
                if (params.has(key)) {
                    params.set(key, params.get(key) + ',' + value);
                } else {
                    params.set(key, value);
                }
            }
            
            window.location.href = '/categorias?' + params.toString();
        });
    }
    
    if (formDesktop) {
        formDesktop.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            // Processar checkboxes múltiplos
            for (let [key, value] of formData.entries()) {
                if (params.has(key)) {
                    params.set(key, params.get(key) + ',' + value);
                } else {
                    params.set(key, value);
                }
            }
            
            window.location.href = '/categorias?' + params.toString();
        });
    }

    // Busca em tempo real
    const searchInput = document.querySelector('.search-form input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.trim();
                if (searchTerm.length > 2) {
                    filtrarPorBusca(searchTerm);
                }
            }, 500);
        });
    }

    function filtrarPorBusca(termo) {
        const url = new URL(window.location);
        url.searchParams.set('busca', termo);
        window.location.href = url.toString();
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('.produto-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Animações de hover nos cards
    const productCards = document.querySelectorAll('.produto-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});