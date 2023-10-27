var filemap = {
    entries: [
        { filename: "../Husky Coin.html", name: "Main Page" },
        { filename: "savegame1/savegame.html", name: "Save Game 1" },
        { filename: "savegame2/savegame.html", name: "Save Game 2" },
        { filename: "savegame3/savegame.html", name: "Save Game 3" }
    ]
};

var display = {
    updatepage: function() {
        var filemapContainer = document.getElementById("filemap");
        filemapContainer.innerHTML = "";

        for (var i = 0; i < filemap.entries.length; i++) {
            var entry = filemap.entries[i];
            filemapContainer.innerHTML += '<a href="' + entry.filename + '"><button class="button">' + entry.name + '</button></a><p class="br">y</p>';
        }
    }
};

window.onload = function() {
    display.updatepage();
};
