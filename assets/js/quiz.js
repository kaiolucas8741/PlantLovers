document.addEventListener('DOMContentLoaded', function() {                         // Executa quando o DOM estiver carregado
    const quizForm = document.getElementById('plant-quiz');                       // Obtém o formulário do quiz
    const questions = document.querySelectorAll('.quiz-question');                // Seleciona todas as perguntas
    const prevButton = document.getElementById('prev-question');                  // Botão de pergunta anterior
    const nextButton = document.getElementById('next-question');                  // Botão de próxima pergunta
    const submitButton = document.getElementById('submit-quiz');                  // Botão de enviar quiz
    const progressBar = document.getElementById('quiz-progress');                 // Barra de progresso
    const progressText = document.getElementById('progress-text');                // Texto do progresso
    const quizResults = document.getElementById('quiz-results');                  // Div de resultados
    const restartButton = document.getElementById('restart-quiz');                // Botão de reiniciar

    let currentQuestion = 1;                                                      // Controla pergunta atual
    const totalQuestions = questions.length;                                      // Total de perguntas
    const answers = {};                                                          // Armazena respostas

    function updateProgress() {                                                   // Atualiza barra de progresso
        const progress = (currentQuestion / totalQuestions) * 100;                // Calcula porcentagem
        progressBar.style.width = `${progress}%`;                                 // Define largura da barra
        progressText.textContent = `Pergunta ${currentQuestion} de ${totalQuestions}`; // Atualiza texto
    }

    function showQuestion(questionNumber) {                                       // Exibe pergunta específica
        questions.forEach(question => {
            question.classList.remove('active');                                  // Remove classe ativa
        });
        questions[questionNumber - 1].classList.add('active');                    // Ativa pergunta atual
        
        prevButton.disabled = questionNumber === 1;                               // Desabilita botão anterior
        nextButton.style.display = questionNumber === totalQuestions ? 'none' : 'block'; // Controla botão próximo
        submitButton.style.display = questionNumber === totalQuestions ? 'block' : 'none'; // Controla botão enviar
    }

    function saveAnswer() {                                                       // Salva resposta selecionada
        const currentQuestionElement = questions[currentQuestion - 1];            // Obtém pergunta atual
        const selectedOption = currentQuestionElement.querySelector('input[type="radio"]:checked'); // Opção marcada
        if (selectedOption) {
            answers[`question${currentQuestion}`] = selectedOption.value;         // Salva valor da resposta
        }
    }

    nextButton.addEventListener('click', () => {                                  // Evento próxima pergunta
        saveAnswer();                                                            // Salva resposta atual
        if (currentQuestion < totalQuestions) {                                  // Se não for última pergunta
            currentQuestion++;                                                    // Avança pergunta
            showQuestion(currentQuestion);                                        // Mostra próxima pergunta
            updateProgress();                                                     // Atualiza progresso
        }
    });

    prevButton.addEventListener('click', () => {                                  // Evento pergunta anterior
        if (currentQuestion > 1) {                                               // Se não for primeira pergunta
            currentQuestion--;                                                    // Volta pergunta
            showQuestion(currentQuestion);                                        // Mostra pergunta anterior
            updateProgress();                                                     // Atualiza progresso
        }
    });

    quizForm.addEventListener('submit', (e) => {                                 // Evento envio do quiz
        e.preventDefault();                                                       // Previne envio padrão
        saveAnswer();                                                            // Salva última resposta
        showResults();                                                           // Mostra resultados
    });

    function showResults() {                                                     // Exibe resultados do quiz
        quizForm.style.display = 'none';                                         // Esconde formulário
        quizResults.style.display = 'block';                                     // Mostra resultados

        const recommendedPlants = getRecommendedPlants(answers);                 // Obtém plantas recomendadas
        
        const resultsContainer = document.querySelector('.results-container');    // Container de resultados
        resultsContainer.innerHTML = recommendedPlants.map(plant => `            // Gera HTML dos resultados
            <div class="result-card">
                <img src="${plant.image}" alt="${plant.name}">
                <h3>${plant.name}</h3>
                <p>${plant.description}</p>
            </div>
        `).join('');
    }

    restartButton.addEventListener('click', () => {                              // Evento reiniciar quiz
        currentQuestion = 1;                                                      // Volta para primeira pergunta
        Object.keys(answers).forEach(key => delete answers[key]);                // Limpa respostas
        quizForm.reset();                                                        // Reseta formulário
        quizForm.style.display = 'block';                                        // Mostra formulário
        quizResults.style.display = 'none';                                      // Esconde resultados
        showQuestion(currentQuestion);                                           // Mostra primeira pergunta
        updateProgress();                                                        // Atualiza progresso
    });

    showQuestion(currentQuestion);                                               // Inicia com primeira pergunta
    updateProgress();                                                            // Inicia barra de progresso
});

function getRecommendedPlants(answers) {                                         // Determina plantas recomendadas
    const plants = {                                                             // Catálogo de plantas
        luzAlta: [
            {
                name: "Suculenta",                                               // Planta para luz alta
                description: "Perfeita para espaços com muita luz natural",
                image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
        ],
        luzModerada: [
            {
                name: "Zamioculca",                                              // Planta para luz moderada
                description: "Ideal para ambientes com luz moderada",
                image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
        ],
        luzBaixa: [
            {
                name: "Lírio da Paz",                                            // Planta para luz baixa
                description: "Adapta-se bem a ambientes com pouca luz",
                image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
        ]
    };

    switch(answers.question1) {                                                  // Recomenda baseado na luz
        case 'high':
            return plants.luzAlta;                                               // Retorna plantas de luz alta
        case 'medium':
            return plants.luzModerada;                                           // Retorna plantas de luz moderada
        case 'low':
            return plants.luzBaixa;                                              // Retorna plantas de luz baixa
        default:
            return plants.luzModerada;                                           // Padrão: luz moderada
    }
} 