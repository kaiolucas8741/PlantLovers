// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {                                                         // Seleciona todos os links de navegação
    anchor.addEventListener('click', function (e) {                                                                    // Adiciona evento de clique
        e.preventDefault();                                                                                           // Previne o comportamento padrão
        const target = document.querySelector(this.getAttribute('href'));                                              // Obtém o elemento alvo
        if (target) {                                                                                                 // Se o elemento existir
            target.scrollIntoView({                                                                                   // Rola até o elemento
                behavior: 'smooth',                                                                                   // Com comportamento suave
                block: 'start'                                                                                        // Alinha ao topo
            });
        }
    });
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');                                                     // Obtém o formulário de newsletter
const formMessage = document.getElementById('form-message');                                                           // Obtém o elemento de mensagem

if (newsletterForm) {                                                                                                 // Se o formulário existir
    newsletterForm.addEventListener('submit', function(e) {                                                            // Adiciona evento de envio
        e.preventDefault();                                                                                           // Previne o comportamento padrão
        const email = this.querySelector('input[type="email"]').value;                                                // Obtém o email digitado
        
        // Simular envio de email com os e-books
        const ebooks = [                                                                                              // Lista de e-books disponíveis
            "Brasil Tropical - Plantas para todas as estações",                                                       // E-book 1
            "20 Palmeiras para Paisagismo",                                                                           // E-book 2
            "Urban Jungles - Plantas para pequenos espaços",                                                          // E-book 3
            "Cactos e Suculentas",                                                                                    // E-book 4
            "Como Cultivar sua Própria Horta",                                                                        // E-book 5
            "Plantio de Temperos"                                                                                     // E-book 6
        ];
        
        // Aqui você implementaria a lógica real de envio de email
        // Por exemplo, usando um serviço como SendGrid, Mailchimp, etc.
        console.log(`Enviando e-books para: ${email}`);                                                               // Log do email
        console.log('E-books enviados:', ebooks);                                                                     // Log dos e-books
        
        // Mensagem de sucesso
        alert('Obrigado por se cadastrar! Os e-books serão enviados para seu email em breve.');                       // Exibe mensagem de sucesso
        this.reset();                                                                                                 // Reseta o formulário
    });
}

function showMessage(message, type) {                                                                                 // Função para mostrar mensagens
    formMessage.textContent = message;                                                                                // Define o texto da mensagem
    formMessage.className = type;                                                                                     // Define a classe da mensagem
}

// Intersection Observer for Animation
const observerOptions = {                                                                                             // Opções do observer
    threshold: 0.1                                                                                                    // Threshold de 10%
};

const observer = new IntersectionObserver((entries) => {                                                              // Cria o observer
    entries.forEach(entry => {                                                                                        // Itera sobre as entradas
        if (entry.isIntersecting) {                                                                                   // Se o elemento estiver visível
            entry.target.classList.add('animate');                                                                    // Adiciona a classe de animação
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {                                                          // Seleciona todos os cards
    observer.observe(card);                                                                                           // Observa cada card
}); 