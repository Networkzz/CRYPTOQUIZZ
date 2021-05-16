/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores2')) || []

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

    localStorage.setItem('highScores2', JSON.stringify(highScores))
    window.location.assign('/html+quizs/highscore2.html')

}