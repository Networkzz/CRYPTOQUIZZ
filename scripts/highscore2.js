/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
const highScoresList = document.querySelector('#highScoresList2')
const highScores = JSON.parse(localStorage.getItem("highScores2")) || []

highScoresList.innerHTML =
/** @function Score
 * Muestra las mejores puntuaciones para el quiz Criptomonedas
 */
highScores.map(score => {
    return `<li class="high-score2">${score.name} - ${score.score}</li>`
}).join("")