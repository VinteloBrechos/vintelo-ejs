// Variáveis globais
let selectedPhotos = [];
let selectedSize = '';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Inicializar formulário
function initializeForm() {
    // Sincronizar campos mobile/desktop
    syncFormFields();
    
    // Adicionar listeners para validação em tempo real
    addValidationListeners();
}

// Sincronizar campos entre mobile e desktop
function syncFormFields() {
    const priceInput = document.getElementById('item-price');
    const priceMobileInput = document.getElementById('item-price-mobile');
    const colorInput = document.getElementById('item-color');
    const colorMobileInput = document.getElementById('item-color-mobile');
    
    if (priceInput && priceMobileInput) {
        priceInput.addEventListener('input', () => {
            priceMobileInput.value = priceInput.value;
        });
        priceMobileInput.addEventListener('input', () => {
            priceInput.value = priceMobileInput.value;
        });
    }
    
    if (colorInput && colorMobileInput) {
        colorInput.addEventListener('input', () => {
            colorMobileInput.value = colorInput.value;
        });
        colorMobileInput.addEventListener('input', () => {
            colorInput.value = colorMobileInput.value;
        });
    }
}

// Adicionar listeners de validação
function addValidationListeners() {
    const form = document.querySelector('.item-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
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
        showFieldError(field, 'Email inválido');
        return false;
    }
    
    if (field.name === 'price' && value && !isValidPrice(value)) {
        showFieldError(field, 'Preço inválido');
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
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorElement);
}

// Validações auxiliares
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPrice(price) {
    const priceRegex = /^R\$\s?\d+([.,]\d{2})?$/;
    return priceRegex.test(price);
}

// Formatação de preço
function formatPrice(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length === 0) {
        input.value = '';
        return;
    }
    
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    input.value = 'R$ ' + value;
    
    // Sincronizar com o outro campo
    const otherInput = input.id.includes('mobile') ? 
        document.getElementById('item-price') : 
        document.getElementById('item-price-mobile');
    
    if (otherInput) {
        otherInput.value = input.value;
    }
}

// Seleção de foto principal
function selectMainPhoto() {
    const input = document.getElementById('main-photo-input');
    input.click();
}

// Seleção de foto thumbnail
function selectPhoto(index) {
    const input = document.getElementById(`thumb-input-${index}`);
    input.click();
}

// Manipular upload de foto
function handlePhotoUpload(input, targetId) {
    const file = input.files[0];
    if (!file) return;
    
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
        showNotification('Por favor, selecione apenas arquivos de imagem.', 'error');
        return;
    }
    
    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('A imagem deve ter no máximo 5MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById(targetId);
        img.src = e.target.result;
        img.style.display = 'block';
        
        // Adicionar à lista de fotos selecionadas
        selectedPhotos[targetId] = file;
        
        showNotification('Foto adicionada com sucesso!', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Seleção de tamanho
function selectSize(button) {
    // Remover seleção anterior
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    button.classList.add('selected');
    selectedSize = button.dataset.size;
    
    // Atualizar campo hidden
    const hiddenInput = document.getElementById('selected-size');
    if (hiddenInput) {
        hiddenInput.value = selectedSize;
    }
}

// Submissão do formulário
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validar formulário
    if (!validateForm(form)) {
        showNotification('Por favor, corrija os erros no formulário.', 'error');
        return;
    }
    
    // Validar tamanho selecionado
    if (!selectedSize) {
        showNotification('Por favor, selecione um tamanho.', 'error');
        return;
    }
    
    // Adicionar fotos ao FormData
    Object.keys(selectedPhotos).forEach(key => {
        if (selectedPhotos[key]) {
            formData.append('photos[]', selectedPhotos[key]);
        }
    });
    
    // Mostrar loading
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simular envio (substituir por requisição real)
    setTimeout(() => {
        // Resetar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Mostrar sucesso
        showNotification('Peça enviada para curadoria com sucesso!', 'success');
        
        // Resetar formulário
        resetForm(form);
    }, 2000);
}

// Validar formulário completo
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const event = { target: input };
        if (!validateField(event)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Resetar formulário
function resetForm(form) {
    form.reset();
    selectedPhotos = [];
    selectedSize = '';
    
    // Resetar imagens
    document.querySelectorAll('[id^="thumb-"]').forEach(img => {
        if (img.id !== 'thumb-0') {
            img.style.display = 'none';
            img.src = '';
        }
    });
    
    // Resetar foto principal
    const mainPhoto = document.getElementById('main-photo');
    mainPhoto.src = 'imagens/add peça.png';
    
    // Remover seleções de tamanho
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Limpar erros
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
    
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
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
    .form-group select.error,
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