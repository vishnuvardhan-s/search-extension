function setThemeAndEngine() {
    if (localStorage.getItem("searchTheme") === null) {
        localStorage.setItem("searchTheme", "theme1");
    }
    if (localStorage.getItem("searchEngine") === null) {
        localStorage.setItem("searchEngine", "engine1");
    }
    const theme = localStorage.getItem('searchTheme');
    const themeIndex = theme.charAt(theme.length - 1);
    document.getElementById("theme").selectedIndex = themeIndex;

    const engine = localStorage.getItem('searchEngine');
    const engineIndex = parseInt(engine.charAt(engine.length - 1));
    document.getElementById("engine").selectedIndex = engineIndex;
}

window.onload = setThemeAndEngine();

document.getElementById("theme").addEventListener("change", function () {
    const selectedTheme = document.getElementById("theme").value;
    localStorage.setItem('searchTheme', selectedTheme);
});

document.getElementById("engine").addEventListener("change", function () {
    const selectedEngine = document.getElementById("engine").value;
    localStorage.setItem('searchEngine', selectedEngine);
});
