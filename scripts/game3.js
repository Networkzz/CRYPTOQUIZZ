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
    question: "¿Qué es Bitcoin?",
    choice1: "Es una moneda física, con proyecto de código privado y red entre iguales que se utiliza como criptomoneda, sistema de pago y mercancía.",
    choice2: "Es una moneda virtual como el euro, pero online",
    choice3: "Es un protocolo, proyecto de código privado y red entre iguales que se utiliza como criptomoneda, sistema de pago y mercancía",
    choice4: "Es un protocolo, proyecto de código abierto y red entre iguales que se utiliza como criptomoneda, sistema de pago y mercancía.",
    answer: "Es un protocolo, proyecto de código abierto y red entre iguales que se utiliza como criptomoneda, sistema de pago y mercancía.",
  },
  {
    question: "¿Quién creo el Bitcoin?",
    choice1: "Satoshi Nakamoto",
    choice2: "Vitalik Buterin",
    choice3: "Elon Musk",
    choice4: "Billy Markus",
    answer: "Satoshi Nakamoto",
  },
  {
    question: " ¿Cuándo se creó el Bitcoin?",
    choice1: "2009",
    choice2: "2010",
    choice3: "2011",
    choice4: "2008",
    answer: "2008",
  },
  {
    question: "¿Cuál es la moneda que se especula que superara al Bitcoin?",
    choice1: "Bitcoin Cash",
    choice2: "Etherum",
    choice3: "XRP",
    choice4: "Maker",
    answer: "Etherum",
  },
  {
    question: "¿Se puede comprar con Bitcoin en el supermercado?",
    choice1:"Si",
    choice2:"No",
    choice3:"Cuando la ley de transmisión de datos se apruebe",
    choice4:"Cuando el bitcoin alcance al millón",
    answer:"No",
  },
  {
    question: "¿Cuál es la moneda que mas % ha subido en 2021?",
    choice1:"Bitcoin",
    choice2:"Etherum",
    choice3:"DogeCoin",
    choice4:"Shiba",
    answer:"DogeCoin",
  },
  {
    question: "¿Cómo se identifica una transacción de Bitcoin?",
    choice1: "SHA-256",
    choice2: "Codigo binario",
    choice3: " Algoritmo de números primos",
    choice4: "Codigo morse",
    answer: "SHA-256",
  },
  {
    question: "¿Dónde se almacenan los Bitcoins?",
    choice1: "En un Exchange o cartera virtual",
    choice2: "En una cartera física o en el banco",
    choice3: "En el banco",
    choice4: "En un Exchange o banco",
    answer: "En un Exchange o cartera virtual",
  },
  {
    question: "¿Dónde comprar Bitcoins?",
    choice1: "En un Exchange",
    choice2: "En el banco",
    choice3: "En la Deep web",
    choice4: "En la W3C",
    answer: "En un Exchange",
  },
  {
    question: "¿Qué tiene más futuro?",
    choice1: "Oro",
    choice2: "Euro",
    choice3: "Dolar",
    choice4: "Bitcoin",
    answer: "Bitcoin",
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

        return window.location.assign('/html+quizs/end.html')
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
 * Si es correcta aplica el estilo de style.css "correct" si es incorrecta "incorrect" *NO FUNCIONA*
 * Si la respuesta es correcta incrementa con la variable SCORE_POINTS (+100) al contador de puntos *NO FUNCIONA*
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