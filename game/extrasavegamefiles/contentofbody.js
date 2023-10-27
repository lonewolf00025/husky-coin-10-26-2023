document.addEventListener("DOMContentLoaded", function() {
    // Determine game mode
    var mode = parseInt(document.getElementById("mode").innerHTML);
    var gamemode = '';
    var gamemodefile = '';

    if (mode === 1) {
        gamemode = 'Easy';
        gamemodefile = 'href="../easy.html"';
    } else if (mode === 2) {
        gamemode = 'Medium';
        gamemodefile = 'href="../medium.html"';
    } else if (mode === 3) {
        gamemode = 'Hard';
        gamemodefile = 'href="../hard.html"';
    }

    // Determine save game number
    var savegamenumber = parseInt(document.getElementById("savegamenumber").innerHTML);
    var savegameid = savegamenumber.toString();

    // Create Section 1: Title
    var section1 = document.createElement("h2");
    section1.id = "Title";
    section1.className = "h1";
    section1.textContent = `Husky Coin v0.5 - ${gamemode} mode - Save ${savegameid}`;
    document.getElementById("content").appendChild(section1);

    // Create Section 2: Score
    var section2 = document.createElement("p");
    section2.className = "money";
    section2.innerHTML = `<span id="score">0</span> Husky Coin - sps = Score per second is: <span id="scorepersecond"></span><br>`;
    document.getElementById("content").appendChild(section2);

    // Create Section 3: Husky Image
    var section3 = document.createElement("img");
    section3.src = "../../Husky.jpg";
    section3.className = "img1";
    section3.onclick = function() {
        game.addtoscore(game.clickvalue);
    };
    document.getElementById("content").appendChild(section3);

    // Create Tabs and Tab Content
    var tabsContainer = document.createElement("div");
    tabsContainer.className = "tabs";

    var tabButton1 = document.createElement("button");
    tabButton1.className = "tab-button";
    tabButton1.textContent = "Tab 1";
    tabButton1.onclick = function() {
        openTab(1);
    };
    tabsContainer.appendChild(tabButton1);

    var tabButton2 = document.createElement("button");
    tabButton2.className = "tab-button";
    tabButton2.textContent = "Tab 2";
    tabButton2.onclick = function() {
        openTab(2);
    };
    tabsContainer.appendChild(tabButton2);

    var tabContent = document.createElement("div");
    tabContent.className = "tab-content";

    var tab1 = document.createElement("div");
    tab1.id = "tab1";
    tab1.className = "tab";
    tab1.innerHTML = `<div class="shopcontainer" id="shopContainer"></div><br>`;
    tabContent.appendChild(tab1);

    var tab2 = document.createElement("div");
    tab2.id = "tab2";
    tab2.className = "tab";
    tab2.innerHTML = `<button class="timer">Time until next auto save <span id="timer">10</span></button><br>`+
                     `<button class="savegame" onclick="saveGame();">Save Game</button><br>` +
                     `<button class="resetgame" onclick="resetGame();">Reset Game</button><br>` +
                     `<a ${gamemodefile}><button class="button">Main page for ${gamemode} mode</button></a>`;
    tabContent.appendChild(tab2);

    // Append Tabs and Tab Content to the content container
    document.getElementById("content").appendChild(tabsContainer);
    document.getElementById("content").appendChild(tabContent);

    // Initialize the default tab
    openTab(1);

    function openTab(tabIndex) {
        var tabs = document.getElementsByClassName("tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }
        document.getElementById("tab" + tabIndex).style.display = "block";
    }

    function saveGame() {
        // Your save game logic here
    }

    function resetGame() {
        // Your reset game logic here
    }
});
