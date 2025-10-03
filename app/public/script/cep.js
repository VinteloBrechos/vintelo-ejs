// Funcionalidade de busca automática de CEP

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    
    if (cepInput) {
        // Máscara para CEP
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });

        // Buscar CEP quando sair do campo
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            
            if (cep.length === 8) {
                buscarCEP(cep);
            }
        });
    }
});

function buscarCEP(cep) {
    // Limpar campos
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    
    // Mostrar loading
    document.getElementById('endereco').placeholder = 'Buscando...';
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                document.getElementById('endereco').placeholder = 'Rua, Avenida...';
                return;
            }
            
            // Preencher campos
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('uf').value = data.uf || '';
            
            // Restaurar placeholder
            document.getElementById('endereco').placeholder = 'Rua, Avenida...';
            
            // Focar no próximo campo vazio
            if (!data.logradouro) {
                document.getElementById('endereco').focus();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Tente novamente.');
            document.getElementById('endereco').placeholder = 'Rua, Avenida...';
        });
}

// Função para validar CEP
function validarCEP(cep) {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
}