// Menu hambúrguer functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuCheckbox = document.getElementById('menu-hamburguer');
    const menuLabel = document.querySelector('label[for="menu-hamburguer"]');
    
    if (menuLabel) {
        menuLabel.addEventListener('click', function() {
            // O checkbox já alterna automaticamente, apenas garantimos que funcione
            setTimeout(() => {
                if (menuCheckbox.checked) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }, 10);
        });
    }
    
    // Fechar menu ao clicar em links
    const menuLinks = document.querySelectorAll('.menu-hamburguer-elements a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuCheckbox.checked = false;
            document.body.style.overflow = 'auto';
        });
    });
});