var savegamenumber = parseInt(document.getElementById("savegamenumber").innerHTML);
var mode = parseInt(document.getElementById("mode").innerHTML);
var gamemode = ["Easy", "Medium", "Hard"][mode - 1];
var multiplier = [1, 5, 10][mode - 1];
var mtt = 2 * multiplier;
var scorepersecond = 0;

var game = {
    score: 10 * multiplier,
    clickvalue: 1,
    version: 0.01,
    addtoscore: function(amount) {
        this.score += amount;
        display.updatescore();
    },
    getscorepersecond: function() {
        return building.income.reduce((total, income, i) => total + income * building.count[i], 0);
    }
};

var building = {
    name: ["Husky coin generator level 1 (+1 sps each)", "Husky coin generator level 2 (+2 sps each)", "Husky coin generator level 3 (+4 sps each)", "Husky coin generator level 4 (+8 sps each)", "Husky coin generator level 5 (+16 sps each)", "Husky coin generator level 6 (+32 sps each)"],
    count: [0, 0, 0, 0, 0, 0],
    income: [1, 2, 4, 8, 16, 32],
    cost: [10, 100, 1000, 10000, 100000, 1000000].map(cost => cost * multiplier),
    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * mtt);
            display.updateShop();
        }
        display.updatescore();
    }
};

var display = {
    updatescore: function() {
        document.getElementById("score").innerHTML = numberformat.formatShort(Math.round(game.score), {sigfigs: 3});
        document.getElementById("scorepersecond").innerHTML = numberformat.formatShort(game.getscorepersecond(), {sigfigs: 3});
    },
    updateShop: function() {
        var shopContainer = document.getElementById("shopContainer");
        shopContainer.innerHTML = building.name.map((name, i) => `<table class="shopbutton" onclick="building.purchase(${i})"><tr><td class="innergut1" id="nameAndCost"><p>${name}</p><p><span>${numberformat.formatShort(building.cost[i], {sigfigs: 3})}</span> Husky Coin</p></td><td class="innergut2" id="amount"><p><span>${numberformat.formatShort(building.count[i], {sigfigs: 3})}</span></p></td></tr></table>`).join('');
    }
};
var currentUser = localStorage.getItem("currentUser");
var savegamename = `${currentUser}HuskyCoin${gamemode}modeSavegame${savegamenumber}`;

function saveGame() {
    var gameSave = { score: game.score, clickvalue: game.clickvalue, version: game.version, buildingCount: building.count, buildingIncome: building.income, buildingCost: building.cost, lastSaveTimestamp: Date.now() };
    localStorage.setItem(savegamename, JSON.stringify(gameSave));
}

function calculateOfflineEarnings(lastSaveTimestamp) {
    var currentTime = Date.now();
    var timeDifferenceInSeconds = Math.floor((currentTime - lastSaveTimestamp) / 1000);
    return timeDifferenceInSeconds * game.getscorepersecond();
}

function loadGame() {
    var saveGame = JSON.parse(localStorage.getItem(savegamename));
    if (saveGame) {
        game.score = saveGame.score || game.score;
        game.clickvalue = saveGame.clickvalue || game.clickvalue;
        if (saveGame.buildingCount) building.count = saveGame.buildingCount;
        if (saveGame.buildingIncome) building.income = saveGame.buildingIncome;
        if (saveGame.buildingCost) building.cost = saveGame.buildingCost;
        if (saveGame.lastSaveTimestamp) {
            var offlineEarnings = calculateOfflineEarnings(saveGame.lastSaveTimestamp);
            game.score += offlineEarnings * multiplier;
        }
    }
}

var timer = 10;

function updateTimer() {
    timer -= 1;
    document.getElementById("timer").innerHTML = timer;
}

function resetTimer() {
    timer = 10;
    document.getElementById("timer").innerHTML = timer;
}

function resetGame() {
    if (confirm("Are you sure you want to reset the game?")) {
        localStorage.removeItem(savegamename);
        game.score = 10 * multiplier;
        game.clickvalue = 1;
        building.count = [0, 0, 0, 0, 0, 0];
        building.cost = [10, 100, 1000, 10000, 100000, 1000000].map(cost => cost * multiplier);
        building.income = [1, 2, 4, 8, 16, 32];
        display.updatescore();
        display.updateShop();
    }
}

window.onload = function() {
    loadGame();
    display.updatescore();
    display.updateShop();
};

setInterval(function() {
    game.score += game.getscorepersecond();
    display.updatescore();
}, 1000);

setInterval(updateTimer, 1000);
setInterval(function() {
    resetTimer();
    saveGame();
}, 10000);
