// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.profile-menu a');
    const formSections = document.querySelectorAll('.form-section');
    
    // Função para mostrar seção
    function showSection(sectionId) {
        // Esconder todas as seções
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remover classe active de todos os links
        menuLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar seção selecionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Adicionar classe active ao link clicado
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Adicionar event listeners aos links do menu
    menuLinks.forEach((link, index) => {
        const sections = ['dados-pessoais', 'endereco', 'seguranca', 'preferencias', 'notificacoes'];
        link.setAttribute('data-section', sections[index]);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Mostrar primeira seção por padrão
    showSection('dados-pessoais');
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
});

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
});

// Buscar endereço por CEP
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    
                    // Selecionar estado
                    const estadoSelect = document.getElementById('estado');
                    if (data.uf) {
                        estadoSelect.value = data.uf;
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
            });
    }
});

// Validação de senha
function validatePasswords() {
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    
    if (novaSenha && confirmarSenha) {
        if (novaSenha !== confirmarSenha) {
            document.getElementById('confirmar-senha').setCustomValidity('As senhas não coincidem');
            return false;
        } else {
            document.getElementById('confirmar-senha').setCustomValidity('');
            return true;
        }
    }
    return true;
}

document.getElementById('nova-senha').addEventListener('input', validatePasswords);
document.getElementById('confirmar-senha').addEventListener('input', validatePasswords);

// Submissão do formulário
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar senhas se estiverem preenchidas
    if (!validatePasswords()) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Simular salvamento
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Salvando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Mostrar mensagem de sucesso
        showNotification('Informações salvas com sucesso!', 'success');
    }, 2000);
});

// Função para resetar formulário
function resetForm() {
    if (confirm('Tem certeza que deseja cancelar as alterações?')) {
        document.getElementById('profileForm').reset();
        showNotification('Alterações canceladas', 'info');
    }
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);