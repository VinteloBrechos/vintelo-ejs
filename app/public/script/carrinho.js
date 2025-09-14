// Estado do carrinho
let cart = {
    items: [
        { id: 1, name: 'Vestido Branco Longo', price: 60.00, quantity: 1 },
        { id: 2, name: 'Vestido Med Roxo', price: 45.00, quantity: 1 }
    ],
    discount: 0,
    shipping: 0
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    initCardFormatting();
});

// Atualizar quantidade
function updateQuantity(itemId, change) {
    const item = cart.items.find(item => item.id === itemId);
    if (item) {
        const newQty = item.quantity + change;
        if (newQty > 0 && newQty <= 10) {
            item.quantity = newQty;
            updateItemDisplay(itemId);
            updateSummary();
            showMessage('Quantidade atualizada!');
        }
    }
}

// Remover item
function removeItem(itemId) {
    if (confirm('Remover este item do carrinho?')) {
        cart.items = cart.items.filter(item => item.id !== itemId);
        
        const itemElement = document.querySelector(`[data-id="${itemId}"]`);
        if (itemElement) {
            itemElement.remove();
        }
        
        updateDisplay();
        showMessage('Item removido!');
    }
}

// Atualizar display do item
function updateItemDisplay(itemId) {
    const item = cart.items.find(item => item.id === itemId);
    const itemElement = document.querySelector(`[data-id="${itemId}"]`);
    
    if (item && itemElement) {
        const qtyDisplay = itemElement.querySelector('.qty-display');
        const priceElement = itemElement.querySelector('.price');
        
        if (qtyDisplay) qtyDisplay.textContent = item.quantity;
        if (priceElement) {
            const totalPrice = (item.price * item.quantity).toFixed(2).replace('.', ',');
            priceElement.textContent = `R$ ${totalPrice}`;
        }
    }
}

// Atualizar display geral
function updateDisplay() {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const itemsCount = cart.items.length;
    
    // Atualizar contadores
    const cartCountElement = document.getElementById('cart-items-count');
    const itemsCountElement = document.getElementById('items-count');
    
    if (cartCountElement) cartCountElement.textContent = totalItems;
    if (itemsCountElement) itemsCountElement.textContent = itemsCount;
    
    // Mostrar/esconder carrinho vazio
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (itemsCount === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        cartItems.forEach(item => item.style.display = 'none');
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        cartItems.forEach(item => item.style.display = 'flex');
    }
    
    updateSummary();
}

// Atualizar resumo
function updateSummary() {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - cart.discount + cart.shipping;
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2).replace('.', ',');
    if (totalElement) totalElement.textContent = total.toFixed(2).replace('.', ',');
}

// Aplicar cupom
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const code = couponInput.value.trim().toUpperCase();
    
    if (!code) {
        showMessage('Digite um código de cupom!', 'error');
        return;
    }
    
    const coupons = {
        'VINTELO10': 10,
        'PRIMEIRA15': 15
    };
    
    if (coupons[code]) {
        const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.discount = (subtotal * coupons[code]) / 100;
        
        updateSummary();
        showMessage(`Cupom aplicado! ${coupons[code]}% de desconto`);
        couponInput.disabled = true;
    } else {
        showMessage('Cupom inválido!', 'error');
    }
}

// Obter localização atual
function getCurrentLocation() {
    const statusIcon = document.getElementById('location-status');
    const currentAddressDiv = document.getElementById('current-address');
    const addressText = document.getElementById('address-text');
    
    // Marcar como selecionado
    document.querySelectorAll('.address-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector('.current-location').classList.add('selected');
    
    if (navigator.geolocation) {
        statusIcon.textContent = '⏳';
        showMessage('Detectando localização...');
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Simular conversão de coordenadas para endereço
                setTimeout(() => {
                    statusIcon.textContent = '✓';
                    addressText.textContent = 'Rua Augusta, 1234 - Consolação, São Paulo - SP';
                    currentAddressDiv.style.display = 'block';
                    showMessage('Localização detectada com sucesso! 📍');
                }, 1500);
            },
            function(error) {
                statusIcon.textContent = '⚠️';
                showMessage('Não foi possível detectar a localização', 'error');
                console.log('Erro de geolocalização:', error);
            }
        );
    } else {
        statusIcon.textContent = '⚠️';
        showMessage('Geolocalização não suportada', 'error');
    }
}

// Adicionar endereço manual
function addManualAddress() {
    document.querySelectorAll('.address-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector('.manual-address').classList.add('selected');
    
    const currentAddressDiv = document.getElementById('current-address');
    const addressText = document.getElementById('address-text');
    
    // Simular adição de endereço manual
    addressText.textContent = 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP';
    currentAddressDiv.style.display = 'block';
    showMessage('Endereço adicionado manualmente!');
}

// Alterar endereço
function changeAddress() {
    const currentAddressDiv = document.getElementById('current-address');
    currentAddressDiv.style.display = 'none';
    
    document.querySelectorAll('.address-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    showMessage('Selecione um novo endereço');
}

// Selecionar pagamento
function selectPayment(method) {
    // Remover seleção anterior
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ocultar todos os detalhes
    document.querySelectorAll('.payment-details').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Selecionar botão atual
    event.target.closest('.payment-btn').classList.add('selected');
    
    // Mostrar detalhes correspondentes
    const detailsId = method + '-details';
    const detailsElement = document.getElementById(detailsId);
    if (detailsElement) {
        detailsElement.style.display = 'block';
    }
    
    // Mensagens personalizadas
    const messages = {
        'pix': 'PIX selecionado! Pagamento instantâneo 📱',
        'card': 'Cartão selecionado! Preencha os dados 💳',
        'boleto': 'Boleto selecionado! Prazo de 3 dias 🏦'
    };
    
    showMessage(messages[method] || 'Método de pagamento selecionado!');
}

// Formatar número do cartão
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

// Formatar data de expiração
function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Validar CVV
function formatCVV(input) {
    input.value = input.value.replace(/\D/g, '');
}

// Inicializar formatação de cartão
function initCardFormatting() {
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCVV = document.getElementById('card-cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', () => formatCardNumber(cardNumber));
    }
    
    if (cardExpiry) {
        cardExpiry.addEventListener('input', () => formatExpiry(cardExpiry));
    }
    
    if (cardCVV) {
        cardCVV.addEventListener('input', () => formatCVV(cardCVV));
    }
}

// Adicionar sugestão
function addSuggestion() {
    showMessage('Produto adicionado ao carrinho!');
}



// Finalizar compra
function proceedToCheckout() {
    if (cart.items.length === 0) {
        showMessage('Seu carrinho está vazio!', 'error');
        return;
    }
    
    showMessage('Redirecionando para finalização...');
    setTimeout(() => {
        window.location.href = '/finalizandocompra1';
    }, 1500);
}

// Mostrar mensagem
function showMessage(message, type = 'success') {
    // Remover mensagem existente
    const existing = document.querySelector('.message');
    if (existing) existing.remove();
    
    // Criar nova mensagem
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        if (messageEl.parentElement) {
            messageEl.remove();
        }
    }, 3000);
}

// Adicionar CSS de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);