/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
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
    choice1: "Es un medio físico de intercambio que utiliza criptografía fuerte para asegurar las transacciones y asi timar al resto de personas",
    choice2: "Es un medio digital de intercambio de euros.",
    choice3: "Es un medio digital de intercambio que utiliza criptografía fuerte para asegurar las transacciones,controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido",
    choice4: "Es un medio digital de intercambio que utiliza criptografía fuerte para hackear las transacciones.",
    answer: 3,
  },
  {
    question:  "¿Cuál es la criptomoneda más importante?",
    choice1: "Bitcoin",
    choice2: "Etherum",
    choice3: "DogeCoin",
    choice4: "Cardano",
    answer: 1,
  },
  {
    question: "¿Qué beneficios aportan las criptomonedas?",
    choice1: "Reduce el coste de transacción ya que no hay intermediario, reducción de tiempo de transacción y eliminación de usar agentes financieros.",
    choice2: "Mucho dinero ya que no paran de subir en el mercado",
    choice3: "Utilizar monedas digitales en vez de euros",
    choice4: "Aumenta el coste de transacción ya que hay intermediario, ampliación del tiempo de transacción y agregación de usar agentes financieros.",
    answer: 1,
  },
  {
    question: "¿Qué tecnología hay detrás de las criptomonedas?",
    choice1: "SHA-256.",
    choice2: "Blockchain",
    choice3: "Python",
    choice4: "Algoritmo de números primos",
    answer: 2,
  },
  {
    question: "¿En qué algoritmo se basa principalmente?",
    choice1:"Algoritmo de tripleta pitagórica y matrices.",
    choice2:"Algoritmo de Fibonacci mediante recursividad.",
    choice3:"Algoritmo de SHA-256 y scrypt.",
    choice4:"Algoritmo de números primos y que sean múltiplos de 2^256.",
    answer: 3,
  },
  {
    question: "¿Qué es el minado de criptomonedas?",
    choice1:"La misión de la minería es básicamente minear bloques de Etherum y recibir Etherum a cambio mediante tarjetas gráficas.",
    choice2:"La misión de la minería es básicamente permitir a las personas crear bitcoins falsos y así manipular el mercado fácilmente.",
    choice3:"Coger un pico y minar bitcoins.",
    choice4:"La misión de la minería es básicamente certificar que nadie usa las monedas dos veces y que nadie pueda introducir en el mercado bitcoins falsos.",
    answer: 4,
  },
  {
    question: "¿Cuándo apareció la primera criptomoneda?",
    choice1: "2009",
    choice2: "2010",
    choice3: "2011",
    choice4: "2008",
    answer: 1,
  },
  {
    question: "¿Quién creo el Bitcoin?",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin.",
    choice3: "Elon Musk",
    choice4: "Billy Markus",
    answer: 1,
  },
  {
    question: "¿Quién creo el Etherum",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin.",
    choice3: "Elon Musk.",
    choice4: "Billy Markus",
    answer: 2,
  },
  {
    question: "¿Quién creo el DogeCoin?",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin",
    choice3: "Elon Musk.",
    choice4: "Billy Markus",
    answer: 4,
  },
];

const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length
/** @function startGame
 * Inicializa el cuestionario
 */
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
/** @function getNewQuestion
 * Siempre y cuando no sea la ultima pregunta, muestra nuevas preguntas, finalmente
 * envia a la parte final del cuestionario.
 * Incrementa el contador de las preguntas y muestra 0 / 10 preguntas junto a una barra de progreso.
 */
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
/** @function choiceForEach
 * Recorre el array y vincula el data-set de HTML con la variable number
 * Utiliza el metodo splice para añadir/eliminar elementos del array
 */
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
/** @function choiceForEach
 * Crea el evento onclick para comprobar si la respuesta es correcta/incorrecta
 * Si es correcta aplica el estilo de style.css "correct" si es incorrecta "incorrect" 
 * Si la respuesta es correcta incrementa con la variable SCORE_POINTS (+100) al contador de puntos 
 */
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
/** @function setTimeout
 * Elimina el estilo aplicado una vez pase a la siguiente pregunta
 */
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})
/** @function incrementScore
 * Aumenta en el contador la puntuacion del usuario
 */
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
/** @function startGame
 * Inicializa el quiz
 */
startGame()