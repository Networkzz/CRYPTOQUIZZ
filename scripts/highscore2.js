const highScoresList = document.querySelector('#highScoresList2')
const highScores = JSON.parse(localStorage.getItem("highScores2")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score2">${score.name} - ${score.score}</li>`
}).join("")