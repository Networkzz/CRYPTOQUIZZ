const username = document.querySelector('#username2')
const saveScoreBtn = document.querySelector('#saveScoreBtn2')
const finalScore = document.querySelector('#finalScore2')
const mostRecentScore = localStorage.getItem('mostRecentScore2')

const highScores = JSON.parse(localStorage.getItem('highScores2')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores2', JSON.stringify(highScores))
    window.location.assign('/html+quizs/highscore2.html')

    
}