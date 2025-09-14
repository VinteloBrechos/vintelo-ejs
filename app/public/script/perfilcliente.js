// Variáveis globais
let currentSection = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

// Inicializar perfil
function initializeProfile() {
    // Carregar dados do perfil
    loadProfileData();
    
    // Adicionar listeners para formulários
    addFormListeners();
    
    // Configurar toggles de notificação
    setupNotificationToggles();
}

// Carregar dados do perfil
function loadProfileData() {
    // Simular carregamento de dados do servidor
    const profileData = {
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '(11) 99999-9999',
        memberSince: 'Janeiro 2024',
        stats: {
            orders: 12,
            favorites: 5,
            reviews: 3
        }
    };
    
    // Atualizar interface com os dados
    updateProfileDisplay(profileData);
}

// Atualizar exibição do perfil
function updateProfileDisplay(data) {
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-email').textContent = data.email;
    
    // Atualizar estatísticas
    const stats = document.querySelectorAll('.stat-number');
    stats[0].textContent = data.stats.orders;
    stats[1].textContent = data.stats.favorites;
    stats[2].textContent = data.stats.reviews;
}

// Adicionar listeners para formulários
function addFormListeners() {
    // Validação em tempo real
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Formatação de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
    }
}

// Mostrar seção específica
function showSection(sectionId) {
    // Esconder menu principal
    document.querySelector('.content-wrapper').style.display = 'none';
    
    // Mostrar seção solicitada
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        currentSection = sectionId;
        
        // Scroll para o topo
        window.scrollTo(0, 0);
        
        // Carregar dados específicos da seção
        loadSectionData(sectionId);
    }
}

// Esconder todas as seções e voltar ao menu
function hideAllSections() {
    // Esconder todas as seções de conteúdo
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar menu principal
    document.querySelector('.content-wrapper').style.display = 'flex';
    currentSection = null;
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// Carregar dados específicos da seção
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'orders':
            loadOrdersData();
            break;
        case 'favorites':
            loadFavoritesData();
            break;
        case 'addresses':
            loadAddressesData();
            break;
        case 'payment':
            loadPaymentData();
            break;
    }
}

// Carregar dados de pedidos
function loadOrdersData() {
    // Simular carregamento de pedidos
    showNotification('Pedidos carregados com sucesso!', 'success');
}

// Carregar dados de favoritos
function loadFavoritesData() {
    // Simular carregamento de favoritos
    showNotification('Favoritos carregados!', 'info');
}

// Carregar dados de endereços
function loadAddressesData() {
    // Simular carregamento de endereços
    console.log('Carregando endereços...');
}

// Carregar dados de pagamento
function loadPaymentData() {
    // Simular carregamento de métodos de pagamento
    console.log('Carregando métodos de pagamento...');
}

// Editar foto do perfil
function editProfilePhoto() {
    const input = document.getElementById('profile-photo-input');
    input.click();
}

// Manipular upload da foto do perfil
function handleProfilePhotoUpload(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
        showNotification('Por favor, selecione apenas arquivos de imagem.', 'error');
        return;
    }
    
    // Validar tamanho (2MB max)
    if (file.size > 2 * 1024 * 1024) {
        showNotification('A imagem deve ter no máximo 2MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('profile-img');
        img.src = e.target.result;
        
        showNotification('Foto do perfil atualizada!', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Atualizar informações pessoais
function updatePersonalInfo(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validar dados
    if (!validatePersonalInfo(data)) {
        return;
    }
    
    // Simular envio para servidor
    setTimeout(() => {
        // Atualizar nome no cabeçalho do perfil
        document.getElementById('profile-name').textContent = `${data.firstName} ${data.lastName}`;
        document.getElementById('profile-email').textContent = data.email;
        
        showNotification('Informações atualizadas com sucesso!', 'success');
    }, 1000);
}

// Validar informações pessoais
function validatePersonalInfo(data) {
    if (!data.firstName || !data.lastName) {
        showNotification('Nome e sobrenome são obrigatórios.', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('E-mail inválido.', 'error');
        return false;
    }
    
    return true;
}

// Validar campo individual
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remover erro anterior
    clearFieldError(event);
    
    // Validações específicas
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'E-mail inválido');
        return false;
    }
    
    return true;
}

// Limpar erro do campo
function clearFieldError(event) {
    const field = event.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Mostrar erro do campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorElement);
}

// Validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Formatar telefone
function formatPhone(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        if (value.length < 14) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }
    
    event.target.value = value;
}

// Configurar toggles de notificação
function setupNotificationToggles() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const notificationName = this.closest('.notification-item').querySelector('h3').textContent;
            const status = this.checked ? 'ativadas' : 'desativadas';
            
            showNotification(`Notificações de "${notificationName}" ${status}.`, 'info');
        });
    });
}

// Visualizar pedido
function viewOrder(orderId) {
    showNotification(`Carregando detalhes do pedido #${orderId}...`, 'info');
    
    // Simular carregamento de detalhes
    setTimeout(() => {
        showNotification(`Detalhes do pedido #${orderId} carregados!`, 'success');
    }, 1500);
}

// Remover favorito
function removeFavorite(itemId) {
    if (confirm('Deseja remover este item dos favoritos?')) {
        const favoriteItem = event.target.closest('.favorite-item');
        favoriteItem.style.opacity = '0.5';
        
        setTimeout(() => {
            favoriteItem.remove();
            showNotification('Item removido dos favoritos.', 'success');
            
            // Atualizar contador
            const statNumber = document.querySelectorAll('.stat-number')[1];
            const currentCount = parseInt(statNumber.textContent);
            statNumber.textContent = currentCount - 1;
        }, 300);
    }
}

// Editar endereço
function editAddress(addressId) {
    showNotification(`Editando endereço #${addressId}...`, 'info');
    // Implementar modal de edição
}

// Excluir endereço
function deleteAddress(addressId) {
    if (confirm('Deseja excluir este endereço?')) {
        const addressItem = event.target.closest('.address-item');
        addressItem.style.opacity = '0.5';
        
        setTimeout(() => {
            addressItem.remove();
            showNotification('Endereço excluído com sucesso.', 'success');
        }, 300);
    }
}

// Adicionar novo endereço
function addNewAddress() {
    showNotification('Abrindo formulário de novo endereço...', 'info');
    // Implementar modal de novo endereço
}

// Editar método de pagamento
function editPayment(paymentId) {
    showNotification(`Editando método de pagamento #${paymentId}...`, 'info');
    // Implementar modal de edição
}

// Excluir método de pagamento
function deletePayment(paymentId) {
    if (confirm('Deseja remover este método de pagamento?')) {
        const paymentItem = event.target.closest('.payment-item');
        paymentItem.style.opacity = '0.5';
        
        setTimeout(() => {
            paymentItem.remove();
            showNotification('Método de pagamento removido.', 'success');
        }, 300);
    }
}

// Adicionar novo método de pagamento
function addNewPayment() {
    showNotification('Abrindo formulário de novo cartão...', 'info');
    // Implementar modal de novo cartão
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação anterior
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Cores por tipo
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Adicionar estilos de erro ao CSS dinamicamente
const errorStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
    
    .field-error {
        display: block;
        margin-top: 5px;
    }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    // ESC para voltar ao menu principal
    if (event.key === 'Escape' && currentSection) {
        hideAllSections();
    }
});