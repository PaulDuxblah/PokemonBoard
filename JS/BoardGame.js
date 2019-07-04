class BoardGame {
    constructor(canvas, height = 500, width = 500, verticalTilesNumber = 10, horizontalTilesNumber = 10) {
        this.verticalTilesNumber = verticalTilesNumber
        this.horizontalTilesNumber = horizontalTilesNumber

        this.map = []
        for (var i = 0; i < horizontalTilesNumber; i++) {
            this.map[i] = []
            for (var j = 0; j < verticalTilesNumber; j++) {
                this.map[i][j] = null
            }
        }

        this.map[0][0] = "manectric"
        // this.map[0][5] = "manectric"

        this.sprites = {
            url: "../Assets/images/",
            "manectric": {
                x: 0, 
                y: 0,
                extension: ".png"
            }
        }

        this.canvas = canvas
        this.context = this.canvas.getContext("2d")
        this.resize(height, width)
    }

    draw() {
        var self = this
        this.map.forEach((row, y) => {
            row.forEach((tile, x) => {
                self.drawTile(x, y)

                if (tile !== null) {
                    self.drawSprite(tile, x, y)
                }
            })
        })
    }

    drawTile(x, y) {
        this.context.fillRect(
            this.tileWidth * x, 
            this.tileHeight * y, 
            this.tileWidth, 
            this.tileHeight
        )
    }

    drawSprite(sprite, x, y) {
        var self = this
        const img = new Image()
        img.src = self.sprites.url + sprite + self.sprites[sprite].extension
        img.onload = () => {
            var finalPosX = Math.floor(x * self.tileWidth)
            var finalPosY = Math.floor(y * self.tileHeight)
            var finalHeight = self.tileHeight
            var finalWidth = self.tileWidth

            var proportionnalHeight = self.tileHeight / img.height
            var proportionnalWidth = self.tileWidth / img.width

            if (proportionnalWidth > proportionnalHeight) {
                finalWidth = Math.floor(img.width * proportionnalHeight)
            }
            else {
                finalHeight = Math.floor(img.height * proportionnalWidth)
            }

            finalHeight = Math.floor(finalHeight * 0.9)
            finalWidth = Math.floor(finalWidth * 0.9)
            finalPosX += Math.floor((self.tileWidth - finalWidth) / 2)
            finalPosY += Math.floor((self.tileHeight - finalHeight) / 2)

            self.context.drawImage(
                img,
                finalPosX, finalPosY, finalWidth, finalHeight
            )
        };
    }

    resize(height, width) {
        this.canvas.height = height
        this.canvas.width = width
        this.tileHeight = this.canvas.height / this.verticalTilesNumber
        this.tileWidth = this.canvas.width / this.horizontalTilesNumber
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "rgba(255, 0, 0, 0.6)"

        this.draw()
    }
}