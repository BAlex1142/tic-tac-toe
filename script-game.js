function switchToGamePage() {
    const page = document.getElementById('IPage');
    if (!page) return;
    page.innerHTML = `
        <div class="page game">
            <h2>Игра</h2>
            <p> Сейчас ходит: <span id="currentPlayer"> X </span> </p>
            <div class="game-board"> </div>
            <button class="reset-btn" onclick="resetGame()"> 🔄 Сброс </button>
        </div>
    `;
    const board = page.querySelector('.game-board');
    board.innerHTML = '';
    gameData.board.forEach((cell, index) => {
        const cellEl = document.createElement('div');
        cellEl.className = 'game-cell';
        if (cell) {
            cellEl.classList.add(cell);
        }
        cellEl.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellEl);
    });
    const playerEl = document.getElementById('currentPlayer');
    playerEl.textContent = gameData.currentPlayer;
    playerEl.className = `player-${gameData.currentPlayer}`;
    if (gameData.winner) {
        const gameDiv = page.querySelector('.game');
        gameDiv.innerHTML += `<p class="result">Победитель: ${gameData.winner}</p>`;
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: [
                "\u{1F308}", // 🌈 — Rainbow
                "\u{1F984}", // 🦄 — Unicorn
                "\u{1F60E}", // 😎 — Smiling face with sunglasses
                "\u{1F389}", // 🎉 — Party popper
                "\u{1F923}", // 🤣 — Rolling on the floor laughing
                "\u{1F929}"  // 🤩 — Star-struck
            ]
        });
        setTimeout(resetGame, 3000);
    }
    else if (gameData.isDraw) {
        const gameDiv = page.querySelector('.game');
        gameDiv.innerHTML += `<p class="result">Ничья!</p>`;
        setTimeout(resetGame, 2000);
    }
    window.location.hash = 'game';
}
window.switchToGamePage = switchToGamePage;