class Pokemon {
    constructor(name) {
        this.name = name
        this.loadJSON((response) => {
            var pokemons = JSON.parse(response)
            console.log(pokemons)
        })
    }

    loadJSON(callback) {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', '../Assets/json/pokemons.json', false)
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText)
            }
        }
        xobj.send(null)
    }
}