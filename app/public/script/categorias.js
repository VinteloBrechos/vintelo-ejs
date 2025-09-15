// Categorias - Funcionalidades Interativas
class CategoriasManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.activeFilters = {
            categories: ['todos'],
            priceRange: { min: 0, max: 1000 },
            conditions: []
        };
        
        this.init();
    }
    
    init() {
        this.collectProducts();
        this.setupEventListeners();
        this.setupCategoryFilters();
    }
    
    // Coleta todos os produtos da página
    collectProducts() {
        const productElements = document.querySelectorAll('.product');
        this.products = Array.from(productElements).map((element, index) => {
            const name = element.querySelector('.legenda').textContent.trim();
            const priceText = element.querySelectorAll('.legenda')[1].textContent.trim();
            const price = parseFloat(priceText.replace('R$', '').replace(',', '.'));
            
            return {
                id: index,
                element: element,
                name: name,
                price: price,
                category: this.getCategoryFromName(name),
                condition: this.getRandomCondition()
            };
        });
        
        this.filteredProducts = [...this.products];
    }
    
    // Determina categoria baseada no nome do produto
    getCategoryFromName(name) {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('blusa') || nameLower.includes('cropped') || nameLower.includes('regata')) {
            return 'blusas';
        } else if (nameLower.includes('saia')) {
            return 'saias';
        } else if (nameLower.includes('vestido')) {
            return 'vestidos';
        } else if (nameLower.includes('óculos') || nameLower.includes('bolsa') || nameLower.includes('anel') || nameLower.includes('relógio') || nameLower.includes('pulseira')) {
            return 'acessorios';
        }
        return 'outros';
    }
    
    // Gera condição aleatória para demonstração
    getRandomCondition() {
        const conditions = ['novo', 'seminovo', 'usado'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    }
    
    // Configura event listeners
    setupEventListeners() {
        // Filtros de categoria
        const categoryCheckboxes = document.querySelectorAll('[id^="cat-"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateCategoryFilters());
        });
        
        // Filtros de preço
        const priceInputs = document.querySelectorAll('#min-price, #max-price');
        priceInputs.forEach(input => {
            input.addEventListener('input', () => this.updatePriceFilters());
        });
        
        // Filtros de condição
        const conditionCheckboxes = document.querySelectorAll('[id^="cond-"]');
        conditionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateConditionFilters());
        });
        
        // Hover effects nos produtos
        this.products.forEach(product => {
            this.addProductHoverEffects(product.element);
        });
    }
    
    // Configura filtros de categoria
    setupCategoryFilters() {
        const todosCheckbox = document.getElementById('cat-todos');
        const otherCheckboxes = document.querySelectorAll('[id^="cat-"]:not(#cat-todos)');
        
        // Quando "Todos" é marcado, desmarca outros
        todosCheckbox.addEventListener('change', () => {
            if (todosCheckbox.checked) {
                otherCheckboxes.forEach(cb => cb.checked = false);
            }
        });
        
        // Quando outro é marcado, desmarca "Todos"
        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    todosCheckbox.checked = false;
                }
            });
        });
    }
    
    // Atualiza filtros de categoria
    updateCategoryFilters() {
        const checkedCategories = [];
        const categoryCheckboxes = document.querySelectorAll('[id^="cat-"]:checked');
        
        categoryCheckboxes.forEach(checkbox => {
            const category = checkbox.id.replace('cat-', '');
            checkedCategories.push(category);
        });
        
        this.activeFilters.categories = checkedCategories.length > 0 ? checkedCategories : ['todos'];
        this.applyFilters();
    }
    
    // Atualiza filtros de preço
    updatePriceFilters() {
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || 1000;
        
        this.activeFilters.priceRange = { min: minPrice, max: maxPrice };
        this.applyFilters();
    }
    
    // Atualiza filtros de condição
    updateConditionFilters() {
        const checkedConditions = [];
        const conditionCheckboxes = document.querySelectorAll('[id^="cond-"]:checked');
        
        conditionCheckboxes.forEach(checkbox => {
            const condition = checkbox.id.replace('cond-', '');
            checkedConditions.push(condition);
        });
        
        this.activeFilters.conditions = checkedConditions;
        this.applyFilters();
    }
    
    // Aplica todos os filtros
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Filtro de categoria
            const categoryMatch = this.activeFilters.categories.includes('todos') || 
                                this.activeFilters.categories.includes(product.category);
            
            // Filtro de preço
            const priceMatch = product.price >= this.activeFilters.priceRange.min && 
                             product.price <= this.activeFilters.priceRange.max;
            
            // Filtro de condição
            const conditionMatch = this.activeFilters.conditions.length === 0 || 
                                 this.activeFilters.conditions.includes(product.condition);
            
            return categoryMatch && priceMatch && conditionMatch;
        });
        
        this.updateProductDisplay();
        this.showFilterNotification();
    }
    
    // Atualiza exibição dos produtos
    updateProductDisplay() {
        // Esconde todos os produtos
        this.products.forEach(product => {
            product.element.style.display = 'none';
        });
        
        // Mostra produtos filtrados
        this.filteredProducts.forEach(product => {
            product.element.style.display = 'block';
        });
        
        // Atualiza contadores se necessário
        this.updateResultsCount();
    }
    
    // Atualiza contador de resultados
    updateResultsCount() {
        const count = this.filteredProducts.length;
        const total = this.products.length;
        
        // Adiciona contador se não existir
        let counter = document.querySelector('.results-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'results-counter';
            counter.style.cssText = `
                text-align: center;
                margin: 20px 0;
                font-size: 14px;
                color: #666;
                font-weight: 500;
            `;
            
            const firstTitle = document.querySelector('.titulo');
            if (firstTitle) {
                firstTitle.parentNode.insertBefore(counter, firstTitle);
            }
        }
        
        counter.textContent = `Mostrando ${count} de ${total} produtos`;
    }
    
    // Adiciona efeitos de hover aos produtos
    addProductHoverEffects(productElement) {
        let hoverTimeout;
        
        productElement.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            productElement.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        productElement.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                productElement.style.transform = 'translateY(0) scale(1)';
            }, 100);
        });
        
        // Adiciona efeito de clique
        productElement.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                this.showProductDetails(productElement);
            }
        });
    }
    
    // Mostra detalhes do produto
    showProductDetails(productElement) {
        const name = productElement.querySelector('.legenda').textContent;
        const price = productElement.querySelectorAll('.legenda')[1].textContent;
        
        this.showNotification(`${name} - ${price}`, 'info');
    }
    
    // Mostra notificação de filtros aplicados
    showFilterNotification() {
        const activeCount = this.getActiveFiltersCount();
        if (activeCount > 0) {
            this.showNotification(`${activeCount} filtro(s) aplicado(s) - ${this.filteredProducts.length} produtos encontrados`, 'success');
        }
    }
    
    // Conta filtros ativos
    getActiveFiltersCount() {
        let count = 0;
        
        if (!this.activeFilters.categories.includes('todos')) {
            count += this.activeFilters.categories.length;
        }
        
        if (this.activeFilters.priceRange.min > 0 || this.activeFilters.priceRange.max < 1000) {
            count += 1;
        }
        
        count += this.activeFilters.conditions.length;
        
        return count;
    }
    
    // Sistema de notificações
    showNotification(message, type = 'info') {
        // Remove notificação anterior
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '9999',
            maxWidth: '300px',
            backgroundColor: colors[type] || colors.info,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Limpa todos os filtros
    clearAllFilters() {
        // Reset checkboxes
        document.querySelectorAll('[id^="cat-"]:not(#cat-todos)').forEach(cb => cb.checked = false);
        document.getElementById('cat-todos').checked = true;
        document.querySelectorAll('[id^="cond-"]').forEach(cb => cb.checked = false);
        
        // Reset price inputs
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        
        // Reset filters
        this.activeFilters = {
            categories: ['todos'],
            priceRange: { min: 0, max: 1000 },
            conditions: []
        };
        
        this.applyFilters();
        this.showNotification('Filtros limpos', 'info');
    }
}

// Funções globais para compatibilidade
function applyFilters() {
    if (window.categoriasManager) {
        window.categoriasManager.applyFilters();
    }
}

function clearFilters() {
    if (window.categoriasManager) {
        window.categoriasManager.clearAllFilters();
    }
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.categoriasManager = new CategoriasManager();
    
    // Adiciona botão limpar filtros se estiver no desktop
    if (window.innerWidth >= 768) {
        const sidebar = document.querySelector('.filters-sidebar');
        if (sidebar) {
            const clearButton = document.createElement('button');
            clearButton.textContent = 'Limpar Filtros';
            clearButton.className = 'apply-filters';
            clearButton.style.background = '#f8f9fa';
            clearButton.style.color = '#666';
            clearButton.style.border = '1px solid #ddd';
            clearButton.style.marginTop = '10px';
            clearButton.onclick = clearFilters;
            
            clearButton.addEventListener('mouseenter', () => {
                clearButton.style.background = '#e9ecef';
                clearButton.style.color = '#333';
            });
            
            clearButton.addEventListener('mouseleave', () => {
                clearButton.style.background = '#f8f9fa';
                clearButton.style.color = '#666';
            });
            
            sidebar.appendChild(clearButton);
        }
    }
});