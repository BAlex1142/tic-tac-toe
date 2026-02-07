function switchToScorePage() {
    const page = document.getElementById('IPage');
    if (!page) return;
    const oWins = gameData?.oWins ?? 0;
    const xWins = gameData?.xWins ?? 0;
    const draws = gameData?.draws ?? 0;
    page.innerHTML = `
        <div class="page score">
            <h2>🏆 Счёт</h2>
            <table class="score-table">
                <thead>
                    <tr>
                        <th> Игрок </th>
                        <th> Побед </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-o">
                        <td> Игрок "O" </td>
                        <td class="score-value"> ${oWins} </td>
                    </tr>
                    <tr class="row-x">
                        <td> Игрок "X" </td>
                        <td class="score-value"> ${xWins} </td>
                    </tr>
                    <tr class="row-draw">
                        <td> Ничья </td>
                        <td class="score-value"> ${draws} </td>
                    </tr>
                </tbody>
            </table>
            <div class="buttons-container">
                <button class="back-btn" onclick="switchToGamePage()"> ⬅️ Вернуться в игру </button>
                <button class="reset-btn" onclick="resetGameScores()"> 🔄 Сбросить счёт </button>
            </div>
        </div>
    `;
}
function updateGameScores() {
    localStorage.setItem('tictactoe.store', JSON.stringify({
        xWins: gameData.xWins,
        oWins: gameData.oWins,
        draws: gameData.draws
    }));
}
function loadGameScores() {
    const saved = localStorage.getItem('tictactoe.store');
    if (saved) {
        const data = JSON.parse(saved);
        gameData.xWins = data.xWins || 0;
        gameData.oWins = data.oWins || 0;
        gameData.draws = data.draws || 0;
    }
}
loadGameScores();
function updateScoreDisplay() {
    // Обновляет ВСЕ элементы с классом score-value
    const scoreElements = document.querySelectorAll('.score-value');
    if (scoreElements.length >= 3) {
        scoreElements[0].textContent = gameData.oWins;  // Игрок O
        scoreElements[1].textContent = gameData.xWins;  // Игрок X  
        scoreElements[2].textContent = gameData.draws;  // Ничья
    }
}
function resetGameScores() {
    gameData.xWins = 0;
    gameData.oWins = 0;
    gameData.draws = 0;
    updateGameScores();
    updateScoreDisplay();
}
window.resetGameScores = resetGameScores;
window.switchToScorePage = switchToScorePage;
  