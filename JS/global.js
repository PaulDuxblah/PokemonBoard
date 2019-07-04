var manectric = new Pokemon("manectric")

document.addEventListener('DOMContentLoaded', (event) => {
    var game = document.getElementById("game")
    var boardGame = new BoardGame(document.getElementById("canvas"), game.offsetHeight, game.offsetWidth)

    window.onresize = () => {
        game = document.getElementById("game")
        boardGame.resize(game.offsetHeight, game.offsetWidth)
    }
    // manectric.display()
})
