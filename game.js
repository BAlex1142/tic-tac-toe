const gameData = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    xWins: 0,
    oWins: 0,
    draws: 0,
    winner: null,
    gameActive: true,
    isDraw: false
};
function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
        if (gameData.board[a] && 
            gameData.board[a] === gameData.board[b] && 
            gameData.board[a] === gameData.board[c]
        ) {
            gameData.winner = gameData.currentPlayer;
            gameData.gameActive = false;
            if (gameData.currentPlayer === 'X') gameData.xWins++;
            else gameData.oWins++;
            updateGameScores();
            document.getElementById('victorySound').play().catch(() => {});
            return;
        }
    }
    if (gameData.board.every(cell => cell !== '') && !gameData.winner) {
        gameData.isDraw = true;
        gameData.draws++;
        updateGameScores();
        gameData.gameActive = false;
    }
}
function handleCellClick(index) {
    if (!gameData.gameActive || gameData.board[index] !== '') return;
    gameData.board[index] = gameData.currentPlayer;
    checkWinner();
    if (gameData.gameActive) {
        gameData.currentPlayer = gameData.currentPlayer === 'X' ? 'O' : 'X';
    }
    switchToGamePage();
}
function resetGame() {
    gameData.board = Array(9).fill('');
    gameData.currentPlayer = 'X';
    gameData.winner = null;
    gameData.isDraw = false;
    gameData.gameActive = true;
    switchToGamePage();
}
window.gameData = gameData;
window.handleCellClick = handleCellClick;
window.resetGame = resetGame;