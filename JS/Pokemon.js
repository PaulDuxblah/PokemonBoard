class Pokemon {
    constructor(name) {
        this.name = name
        this.loadJSON((response) => {
            var pokemons = JSON.parse(response)
            if (pokemons.hasOwnProperty(name)) {
                this.hp = pokemons[name].hp
                this.currentHp = pokemons[name].hp
                this.att = pokemons[name].att
                this.def = pokemons[name].def
                this.speatt = pokemons[name].speatt
                this.spedef = pokemons[name].spedef
                this.speed = pokemons[name].speed
                this.ability = pokemons[name].ability
                this.moves = pokemons[name].moves
            }
        })
    }

    ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    loadJSON(callback) {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', '../Assets/json/pokemons.json', true)
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText)
            }
        }
        xobj.send(null)
    }

    display() {
        var details = document.getElementById("details")
        details.getElementsByTagName("img")[0].src = "../Assets/images/" + this.name + ".png"
        details.getElementsByTagName("strong")[0].innerHTML = this.ucFirst(this.name)

        var statistics = details.getElementsByClassName("statistics")[0]
        statistics.getElementsByClassName("hp")[0].getElementsByTagName("text")[0].innerHTML = this.hp
        statistics.getElementsByClassName("att")[0].getElementsByTagName("text")[0].innerHTML = this.att
        statistics.getElementsByClassName("def")[0].getElementsByTagName("text")[0].innerHTML = this.def
        statistics.getElementsByClassName("speatt")[0].getElementsByTagName("text")[0].innerHTML = this.speatt
        statistics.getElementsByClassName("spedef")[0].getElementsByTagName("text")[0].innerHTML = this.spedef
        statistics.getElementsByClassName("speed")[0].getElementsByTagName("text")[0].innerHTML = this.speed

        let movesLi = details.getElementsByClassName("moves")[0].getElementsByTagName("li")
        Array.from(movesLi).forEach((li, index) => {
            if (typeof this.moves[index] !== 'undefined') {
                li.innerHTML = this.ucFirst(this.moves[index])
            }
            else {
                li.innerHTML = "-"
            }
        })

        details.style.display = "flex"
    }
}