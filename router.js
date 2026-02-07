function navigateTo(hash, pageFn) {
    window.location.hash = hash;
    if (typeof pageFn === 'function') {
        pageFn();
    }
}
window.addEventListener('hashchange', () => {
    const hash = window.location.hash || '#main';
    switch (hash.toLowerCase()) {
        case '#main':
        case '':
            switchToMainPage();
            break;
        case '#game':
            switchToGamePage();
            break;
        case '#score':
            switchToScorePage();
            break;
        case '#rules':
            switchToRulesPage();
            break;
        default:
            switchToMainPage();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash || '#main';
    const handler = {
        '#main': switchToMainPage,
        '#game': switchToGamePage,
        '#score': switchToScorePage,
        '#rules': switchToRulesPage
    }[hash.toLowerCase()] || switchToMainPage;
    handler();
});