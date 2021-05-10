const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "¿Qué son las criptomonedas?",
    choice1: "Es un medio físico de intercambio que utiliza criptografía fuerte para asegurar las transacciones, controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido.",
    choice2: "Es un medio digital de intercambio de euros que utiliza criptografía fuerte para asegurar las transacciones, controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido.",
    choice3: "Es un medio digital de intercambio que utiliza criptografía fuerte para asegurar las transacciones,controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido",
    choice4: "Es un medio digital de intercambio que utiliza criptografía fuerte para hackear las transacciones,controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido",
    answer: "Es un medio digital de intercambio que utiliza criptografía fuerte para asegurar las transacciones,controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido",
  },
  {
    question:  "¿Cuál es la criptomoneda más importante?",
    choice1: "Bitcoin",
    choice2: "Etherum",
    choice3: "DogeCoin",
    choice4: "Cardano",
    answer: "Bitcoin",
  },
  {
    question: "¿Qué beneficios aportan las criptomonedas?",
    choice1: "Reduce el coste de transacción ya que no hay intermediario, reducción de tiempo de transacción y eliminación de usar agentes financieros.",
    choice2: "Mucho dinero ya que no paran de subir en el mercado",
    choice3: "Utilizar monedas digitales en vez de euros",
    choice4: "Aumenta el coste de transacción ya que hay intermediario, ampliación del tiempo de transacción y agregación de usar agentes financieros.",
    answer: "Reduce el coste de transacción ya que no hay intermediario, reducción de tiempo de transacción y eliminación de usar agentes financieros.",
  },
  {
    question: "¿Qué tecnología hay detrás de las criptomonedas?",
    choice1: "SHA-256.",
    choice2: "Blockchain",
    choice3: "Python",
    choice4: "Algoritmo de números primos",
    answer: "Blockchain",
  },
  {
    question: "¿En qué algoritmo se basa principalmente?",
    choice1:"Algoritmo de tripleta pitagórica y matrices.",
    choice2:"Algoritmo de Fibonacci mediante recursividad.",
    choice3:"Algoritmo de SHA-256 y scrypt.",
    choice4:"Algoritmo de números primos y que sean múltiplos de 2^256.",
    answer:"Algoritmo de SHA-256 y scrypt.",
  },
  {
    question: "¿Qué es el minado de criptomonedas?",
    choice1:"La misión de la minería es básicamente minear bloques de Etherum y recibir Etherum a cambio mediante tarjetas gráficas.",
    choice2:" La misión de la minería es básicamente permitir a las personas crear bitcoins falsos y así manipular el mercado fácilmente. Así, los mineros revisan las transacciones y juntan las últimas transacciones creadas en un grupo llamado bloque. Tras resolver esto reciben criptomonedas como recompensa.",
    choice3:"Coger un pico y minar bitcoins.",
    choice4:" La misión de la minería es básicamente certificar que nadie usa las monedas dos veces y que nadie pueda introducir en el mercado bitcoins falsos. Así, los mineros revisan las transacciones y juntan las últimas transacciones creadas en un grupo llamado bloque. Tras resolver esto reciben criptomonedas como recompensa",
    answer:" La misión de la minería es básicamente certificar que nadie usa las monedas dos veces y que nadie pueda introducir en el mercado bitcoins falsos. Así, los mineros revisan las transacciones y juntan las últimas transacciones creadas en un grupo llamado bloque. Tras resolver esto reciben criptomonedas como recompensa",
  },
  {
    question: "¿Cuándo apareció la primera criptomoneda?",
    choice1: "2009",
    choice2: "2010",
    choice3: "2011",
    choice4: "2008",
    answer: "2009",
  },
  {
    question: "¿Quién creo el Bitcoin?",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin.",
    choice3: "Elon Musk",
    choice4: "Billy Markus",
    answer: "Satoshi Nakamoto",
  },
  {
    question: "¿Quién creo el Etherum",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin.",
    choice3: "Elon Musk.",
    choice4: "Billy Markus",
    answer: "Vitalik Buterin.",
  },
  {
    question: "¿Quién creo el DogeCoin?",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin",
    choice3: "Elon Musk.",
    choice4: "Billy Markus",
    answer: "Billy Markus",
  },
];

const SCORE_POINTS = 10
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/html+quizs/end2.html')
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()