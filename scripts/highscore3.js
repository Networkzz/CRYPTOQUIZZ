const highScoresList = document.querySelector('#highScoresList3')
const highScores = JSON.parse(localStorage.getItem("highScores3")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score3">${score.name} - ${score.score}</li>`
}).join("")