
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
    question: "¿Qué es blockchain?",
    choice1: "Es una estructura de datos cuya información se agrupa en conjuntos (bloques) a los que se le añade metainformaciones relativas a otro bloque de la cadena anterior en una línea temporal.",
    choice2: "Es una estructura de Bitcoins cuya información se agrupa en conjuntos (bloques) a los que se le añade metainformaciones relativas a otro bloque de la cadena anterior en una línea temporal.",
    choice3: "Es una estructura de Etherum cuya información se agrupa en conjuntos (bloques) a los que se le añade metainformaciones relativas a otro bloque de la cadena anterior en una línea temporal",
    choice4: "Es una estructura de datos cuya información que va separado (uni-bloque) a los que se le añade metainformaciones relativas a otro bloque de la cadena anterior en una línea temporal.",
    answer: 1,
  },
  {
    question: "¿En que se basa blockchain?",
    choice1: "En las funciones hash, el Bitcoin y Etherum.",
    choice2: "En la criptografía asimétrica, funciones hash y en la implementación de ledger",
    choice3: "En la minería de criptomonedas y hash",
    choice4: "En la criptografía asimétrica, mineo de criptomonedas y Bitcoin",
    answer: 2,
  },
  {
    question: "¿Qué enfoques tiene el blockchain?",
    choice1: "Almacenamiento de datos, bases de datos, MySQL y Python.",
    choice2: "Análisis de bloques de comportamiento, Python y utilizando JSON para comunicarse.",
    choice3: "Almacenamiento de datos, transmisión de datos y confirmación de datos.",
    choice4: "Almacenamiento de datos, transmisión de datos, Python y FrontEnd de HTML, CSS y JS.",
    answer: 3,
  },
  {
    question: "¿Dónde se utiliza blockchain?",
    choice1: "Para construir un edificio mediante inteligencia artificial",
    choice2: "Para virtualizar tus posesiones",
    choice3: "Creación de criptomonedas, transacciones bancarias, contratación pública…",
    choice4: "No sirven para nada son un engaño de la sociedad moderna.",
    answer: 3,
  },
  {
    question: "¿Cómo se clasifican los bloques?",
    choice1:"Según su acceso a los datos, procesamiento de la información y mineo de bloque.",
    choice2:"Depende del bloque tiene una función de acceso u otra de procesamiento.",
    choice3:"Según su acceso a los datos, administración y transmisión de los datos",
    choice4:"Según su acceso a los datos, permisos, combinaciones de acceso y permisos y según el modelo de cambio de estado",
    answer: 4,
  },
  {
    question: "¿Qué es una Sidechain o cadena lateral?",
    choice1:"Es una cadena de bloques que valida datos desde una terminal y utiliza un sistema de descripción SHA 256 que tardaría más tiempo del que un humano pueda vivir.",
    choice2:"Es una cadena de bloques que valida datos desde otras cadenas de bloques a la que se llama secundaria.",
    choice3:"Es una cadena de bloques que valida datos desde la misma cadena de bloques a la que se llama principal.",
    choice4:"Es una cadena de bloques que valida datos desde otra cadena de bloques a la que se llama principal.",
    answer: 4,
  },
  {
    question: "¿Qué ha conseguido blockchain?",
    choice1: "Descentralización de los pagos electrónicos y una seguridad muy alta ante las transacciones omitiendo las transacciones dobles por completo.",
    choice2: "Descentralización y ganar mucho dinero porque el bitcoin era muy barato antes y ahora vale mucho",
    choice3: "Seguridad y un sistema descentralizado para cometer ilegalidades",
    choice4: "Descentralización para poder comprar en la Deep web drogas.",
    answer: 1,
  },
  {
    question: "¿Quién creo la tecnología blockchain?",
    choice1: "Bill Gates.",
    choice2: "Vitalik Buterin",
    choice3: "Satoshi Nakamoto.",
    choice4: "Elon Musk",
    answer: 3,
  },
  {
    question: "¿Cuándo se creó blockchain?",
    choice1: "2010",
    choice2: "2009",
    choice3: "2008",
    choice4: "2011",
    answer: 3,
  },
  {
    question: "¿Quién es Satoshi Nakamoto?",
    choice1: "Un ingeniero especializado en criptografía.",
    choice2: "Un matemático especializado en criptografía.",
    choice3: "No se sabe mucho de esta persona, es alguien bastante anónimo.",
    choice4: "Un hacker que creo blockchain para hackear.",
    answer: 3,
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