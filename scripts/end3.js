/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
const username = document.querySelector('#username3')
const saveScoreBtn = document.querySelector('#saveScoreBtn3')
const finalScore = document.querySelector('#finalScore3')
const mostRecentScore = localStorage.getItem('mostRecentScore3')

const highScores = JSON.parse(localStorage.getItem('highScores3')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
/** @function saveUsername
 * Bloquea el guardar puntuacion si el usuario no tiene un nombre introducido
 */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
/** @function saveHighscore
 * Almacena en las mejores puntuaciones (si es posible) la ultima puntuacion realizada
 */
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)
/** @function sortHighscore
 * Ordena el array de las mejores puntuaciones de mejor a peor
 */
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores3', JSON.stringify(highScores))
    window.location.assign('/html+quizs/highscore3.html')

    
}