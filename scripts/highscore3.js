/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
const highScoresList = document.querySelector('#highScoresList3')
const highScores = JSON.parse(localStorage.getItem("highScores3")) || []

highScoresList.innerHTML =
/** @function Score
 * Muestra las mejores puntuaciones para el quiz Bitcoin
 */
highScores.map(score => {
    return `<li class="high-score3">${score.name} - ${score.score}</li>`
}).join("")