// Funções para filtros
function filterByStatus(status) {
    const cards = document.querySelectorAll('.order-card');
    cards.forEach(card => {
        if (status === 'todos') {
            card.style.display = 'block';
        } else {
            const cardStatus = card.getAttribute('data-status');
            card.style.display = cardStatus === status ? 'block' : 'none';
        }
    });
}

function filterByPeriod(period) {
    const cards = document.querySelectorAll('.order-card');
    const now = new Date();
    
    cards.forEach(card => {
        const cardDate = new Date(card.getAttribute('data-date'));
        let showCard = false;
        
        switch(period) {
            case 'todos':
                showCard = true;
                break;
            case '30-dias':
                showCard = (now - cardDate) <= (30 * 24 * 60 * 60 * 1000);
                break;
            case '3-meses':
                showCard = (now - cardDate) <= (90 * 24 * 60 * 60 * 1000);
                break;
            case '6-meses':
                showCard = (now - cardDate) <= (180 * 24 * 60 * 60 * 1000);
                break;
            case '1-ano':
                showCard = (now - cardDate) <= (365 * 24 * 60 * 60 * 1000);
                break;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

function sortOrders(sortType) {
    const orderSection = document.querySelector('.order-section');
    const cards = Array.from(document.querySelectorAll('.order-card'));
    const dates = Array.from(document.querySelectorAll('.order-date'));
    
    // Criar array com cards e suas datas
    const cardData = [];
    for (let i = 0; i < cards.length; i++) {
        cardData.push({
            card: cards[i],
            date: dates[i],
            dateValue: new Date(cards[i].getAttribute('data-date')),
            status: cards[i].getAttribute('data-status')
        });
    }
    
    // Ordenar
    switch(sortType) {
        case 'recent':
            cardData.sort((a, b) => b.dateValue - a.dateValue);
            break;
        case 'oldest':
            cardData.sort((a, b) => a.dateValue - b.dateValue);
            break;
        case 'status':
            cardData.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }
    
    // Reordenar no DOM
    cardData.forEach(item => {
        orderSection.appendChild(item.date);
        orderSection.appendChild(item.card);
    });
}

function applyFilters() {
    // Aplicar todos os filtros ativos
    console.log('Filtros aplicados');
}

function clearFilters() {
    // Limpar todos os filtros
    const cards = document.querySelectorAll('.order-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
}

// Funções dinâmicas da página minhas compras
function toggleOrderDetails(button) {
    const orderCard = button.closest('.order-card');
    const orderDetails = orderCard.querySelector('.order-details');
    
    if (orderDetails.style.display === 'none' || orderDetails.style.display === '') {
        orderDetails.style.display = 'block';
        button.textContent = 'Ocultar Detalhes';
    } else {
        orderDetails.style.display = 'none';
        button.textContent = 'Ver Detalhes';
    }
}

function toggleTracking(button) {
    const orderCard = button.closest('.order-card');
    const trackingDetails = orderCard.querySelector('.tracking-details');
    
    if (trackingDetails.style.display === 'none' || trackingDetails.style.display === '') {
        trackingDetails.style.display = 'block';
        button.textContent = 'Ocultar Rastreamento';
    } else {
        trackingDetails.style.display = 'none';
        button.textContent = 'Rastrear Pedido';
    }
}