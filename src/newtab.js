function focusOnInput() {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
    if (localStorage.getItem("searchTheme") === null) {
        localStorage.setItem("searchTheme", "theme1");
    }
    const selectedTheme = localStorage.getItem("searchTheme");
    showToolTip(searchEngine);
    applyTheme(selectedTheme);
}

function removeCodeWord(query) {
    const list = query.split(" ");
    if (list.length <= 1) {
        return query;
    }
    else {
        return list.slice(1).join(" ");
    }
}

function searchEngineURL(searchEngine) {
    switch (searchEngine) {
        case "Google":
            return "https://www.google.com/search?q=";
        case "Duck Duck Go":
            return "https://www.duckduckgo.com/?q=";
        case "YouTube":
            return "https://www.youtube.com/results?search_query=";
        case "Bing":
            return "https://www.bing.com/search?q=";
        case "Ecosia":
            return "https://www.ecosia.org/search?q=";
    }
}

function constructSearchQuery(query) {
    if (searchEngine === "Default") {
        if (localStorage.getItem("searchEngine") === null) {
            localStorage.setItem("searchEngine", "engine1");
        }
        const engine = localStorage.getItem("searchEngine");
        return searchEngineURL(decodeEngine(engine)) + query;
    }
    return searchEngineURL(searchEngine) + removeCodeWord(query);
}

function decodeEngine(engine) {
    const listOfEngines = ["Google", "YouTube", "Duck Duck Go", "Bing", "Ecosia"];
    const ind = parseInt(engine.charAt(engine.length - 1)) - 1;
    return listOfEngines[ind];
}

function showToolTip(searchEngine) {
    const searchEngineTip = document.getElementById("searchEngineTip");
    if (searchEngine === "Default") {
        if (localStorage.getItem("searchEngine") === null) {
            localStorage.setItem("searchEngine", "engine1");
        }
        const engine = localStorage.getItem('searchEngine');
        searchEngineTip.innerHTML = "Your default search engine is " + decodeEngine(engine);
    }
    else {
        searchEngineTip.innerHTML = "Your current search engine is " + searchEngine;
    }
}

function detectSearchEngine(query) {
    const queryList = query.split(" ");
    if (queryList.length <= 1) {
        showToolTip("Default");
    }
    else {
        switch (queryList[0]) {
            case "g":
                searchEngine = "Google";
                break;
            case "d":
                searchEngine = "Duck Duck Go";
                break;
            case "y":
                searchEngine = "YouTube";
                break;
            case "b":
                searchEngine = "Bing";
                break;
            case "e":
                searchEngine = "Ecosia";
                break;
        }
        showToolTip(searchEngine)
    }
}

function setTheme1() {
    const html = document.querySelector("html");
    const input = document.getElementById("search");
    const tip = document.getElementById("searchEngineTip");
    html.style.background = "linear-gradient(to bottom, #24c6dc, #514a9d)";
    input.classList.remove("theme2");
    input.classList.remove("theme3");
    input.classList.remove("theme4");
    input.classList.add("theme1");
    input.style.color = "rgb(194,194,194)";
    tip.style.color = "rgb(194,194,194)";
}

function setTheme2() {
    const html = document.querySelector("html");
    const input = document.getElementById("search");
    const tip = document.getElementById("searchEngineTip");
    html.style.background = "linear-gradient(to top, #70e1f5, #ffd194)";
    input.classList.remove("theme1");
    input.classList.remove("theme3");
    input.classList.remove("theme4");
    input.classList.add("theme2");
    input.style.color = "rgb(61,61,61)";
    tip.style.color = "rgb(61,61,61)";
}

function setTheme3() {
    const html = document.querySelector("html");
    const input = document.getElementById("search");
    const tip = document.getElementById("searchEngineTip");
    html.style.background = "linear-gradient(to bottom, #009fff, #ec2f4b)";
    input.classList.remove("theme1");
    input.classList.remove("theme2");
    input.classList.remove("theme4");
    input.classList.add("theme3");
    input.style.color = "rgb(194, 194, 194)";
    tip.style.color = "rgb(194,194,194)";
}

function setTheme4() {
    const html = document.querySelector("html");
    const input = document.getElementById("search");
    const tip = document.getElementById("searchEngineTip");
    html.style.background = "linear-gradient(to top, #000000, #434343)";
    input.classList.remove("theme1");
    input.classList.remove("theme2");
    input.classList.remove("theme3");
    input.classList.add("theme4");
    input.style.color = "rgb(207, 207, 207)";
    tip.style.color = "rgb(207, 207, 207)";
}

function applyTheme(theme) {
    switch (theme) {
        case "theme1":
            setTheme1();
            break;
        case "theme2":
            setTheme2();
            break;
        case "theme3":
            setTheme3();
            break;
        case "theme4":
            setTheme4();
            break;
    }
}

const search = document.getElementById("search");
search.addEventListener("keyup", function (event) {
    detectSearchEngine(search.value);
    if (event.key === "Enter") {
        const query = search.value;
        if (query) {
            const searchQuery = constructSearchQuery(query);
            const mode = "_self";
            window.open(searchQuery, mode);
        }
    }
});

window.addEventListener("storage", function () {
    const selectedTheme = localStorage.getItem("searchTheme");
    const selectedEngine = localStorage.getItem("searchEngine");
    applyTheme(selectedTheme);
    showToolTip(decodeEngine(selectedEngine));
});


var searchEngine = "Default";
window.onload = focusOnInput()
