/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
 const highScoresList = document.querySelector('#highScoresList')
 const highScores = JSON.parse(localStorage.getItem("highScores3")) || []
 
 highScoresList.innerHTML =
 /** @function Score
   * Muestra las mejores puntuaciones para el quiz Blockchain
   */
 highScores.map(score => {
     return `<li class="high-score">${score.name} - ${score.score}</li>`
 }).join("")