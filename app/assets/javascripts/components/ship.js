function CreateShip() {
    let id = 0
    const all = []

    return class Ship {
        constructor(name, grid, size) {
            this.coordinates = [];
            this.id = id++
            this.grid = grid
            this.size = size
            this.name = name
            all.push(this)
        }

        static removeShip(id) {
            document.getElementById(`${id}`).remove()
        }

        static insertShips() {
            let insertArea = document.getElementById('insert-ships')
            insertArea.innerHTML = `

			<div class="container">
			<div class="row" style="text-align:center;">
			<div class="container">
			<button class="btn btn-default btn3d" id="1">Destroyer</button>
			<button class="btn btn-default btn3d" id="2">Cruiser</button>
			<button class="btn btn-default btn3d" id="3">Submarine</button>
			<button class="btn btn-default btn3d" id="4">Battleship</button>
			<button class="btn btn-default btn3d" id="5">Carrier</button>
			</div>
			</div>
			</div>


			`
        }

        setCoordinates(selectedCoordinates) {
            if (parseInt(this.size) !== this.coordinates.length) {
                this.checkPosition(selectedCoordinates)
                if (Object.keys(this.grid.placedShipCoordinates).length === 15) {
                    alert('You have completed placing this ship. Please give the computer to your opponent!')
                } else if (parseInt(this.size) === this.coordinates.length) {
                    alert('You have completed placing this ship!')
                }
            }
        }




        checkPosition(selectedCoordinates) {
            let length = parseInt(this.size) - 1;
            let xy = selectedCoordinates.split(",").map(number => (parseInt(number)))
            let gridShipKeys = Object.keys(this.grid.placedShipCoordinates)
            debugger
            if (!(gridShipKeys.includes(selectedCoordinates)) && this.coordinates.length === 0) {
                this.buildShip(xy, selectedCoordinates)


            } else if (!gridShipKeys.includes(selectedCoordinates) && this.coordinates.length === 1) {
                //down
                if ((xy[0] === this.coordinates[0][0] + 1) && (xy[1] === this.coordinates[0][1]) && (validCoordinate(`${this.coordinates[0][0] + length},${xy[1]}`)) && noShipsInTheWay(this.coordinates[0], [this.coordinates[0][0] + length, xy[1]], this.grid, "down")) {

                    this.buildShip(xy, selectedCoordinates)
                    // up
                } else if ((xy[0] === this.coordinates[0][0] - 1) && (xy[1] === this.coordinates[0][1]) && (validCoordinate(`${this.coordinates[0][0] - length},${xy[1]}`)) && noShipsInTheWay(this.coordinates[0], [this.coordinates[0][0] - length, xy[1]], this.grid, "up")) {
                    this.buildShip(xy, selectedCoordinates)
                    // right
                } else if ((xy[1] === this.coordinates[0][1] + 1) && (xy[0] === this.coordinates[0][0]) && (validCoordinate(`${xy[0]},${this.coordinates[0][1] + length}`)) && noShipsInTheWay(this.coordinates[0], [xy[0], this.coordinates[0][1] + length], this.grid, "right")) {
                    this.buildShip(xy, selectedCoordinates)
                    //left
                } else if ((xy[1] === this.coordinates[0][1] - 1) && (xy[0] === this.coordinates[0][0]) && (validCoordinate(`${xy[0]},${this.coordinates[0][1] - length}`)) && noShipsInTheWay(this.coordinates[0], [xy[0], this.coordinates[0][1] - length], this.grid, "left")) {
                    this.buildShip(xy, selectedCoordinates)
                }
            } else if (!gridShipKeys.includes(selectedCoordinates) && this.coordinates.length > 1) {
                let lastCoordinates = this.coordinates[this.coordinates.length - 1];
                let secondToLast = this.coordinates[this.coordinates.length - 2];
                if (secondToLast[0] - lastCoordinates[0] === 0) {
                    if ((secondToLast[1] - lastCoordinates[1] > 0) && (xy[1] === lastCoordinates[1] - 1 && xy[0] === lastCoordinates[0])) {
                        this.buildShip(xy, selectedCoordinates)
                    } else if ((secondToLast[1] - lastCoordinates[1] < 0) && (xy[1] === lastCoordinates[1] + 1 && xy[0] === lastCoordinates[0])) {
                        this.buildShip(xy, selectedCoordinates)
                    }
                } else if (secondToLast[1] - lastCoordinates[1] === 0) {
                    if ((secondToLast[0] - lastCoordinates[0] > 0) && (xy[0] === lastCoordinates[0] - 1 && xy[1] === lastCoordinates[1])) {
                        this.buildShip(xy, selectedCoordinates)
                    } else if ((secondToLast[0] - lastCoordinates[0] < 0) && (xy[0] === lastCoordinates[0] + 1 && xy[1] === lastCoordinates[1])) {
                        this.buildShip(xy, selectedCoordinates)
                    }
                }
            }//   else {
            //      alert('this is an invalid position, please choose another.')
            //  }
        }

        static all() {
            return all;
        }

        buildShip(coordinates, stringifiedCoordinates) {
            this.coordinates.push(coordinates);
            this.grid.addShip(stringifiedCoordinates);
            this.grid.placedShipCoordinates[stringifiedCoordinates] = 1;
        }
    }
}

const Ship = CreateShip()

console.log('in ship')
