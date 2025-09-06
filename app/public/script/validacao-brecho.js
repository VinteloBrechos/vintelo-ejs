// Validação do formulário de criar brechó
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('senha');
    const cpfField = document.getElementById('cpf');
    const phoneField = document.getElementById('phone');

    // Máscara para CPF
    cpfField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para telefone
    phoneField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Validação de senhas iguais
    function validatePasswords() {
        if (passwordField.value !== confirmPasswordField.value) {
            confirmPasswordField.setCustomValidity('As senhas não coincidem');
        } else {
            confirmPasswordField.setCustomValidity('');
        }
    }

    passwordField.addEventListener('input', validatePasswords);
    confirmPasswordField.addEventListener('input', validatePasswords);

    // Validação do formulário
    form.addEventListener('submit', function(e) {
        validatePasswords();
        
        if (!form.checkValidity()) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});