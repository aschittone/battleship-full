function CreateShip() {
	var id = 0
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
			var insertArea = document.getElementById('insert-ships')
			insertArea.innerHTML = `
			<button id="1">Destroyer</button>
			<button id="2">Cruiser</button>
			<button id="3">Submarine</button>
			<button id="4">Battleship</button>
            <button id="5">Carrier</button>
			`
		}

		setCoordinates(selectedCoordinates) {
			if (parseInt(this.size) !== this.coordinates.length) {
				this.checkPosition(selectedCoordinates)
				if (Object.keys(this.grid.placedShipCoordinates).length === 15) {
					alert('you have completed placing this ship. please give the computer to your oponent')
				} else if (parseInt(this.size) === this.coordinates.length){
					alert('you have completed placing this ship')
				}
			}
		}




		checkPosition(selectedCoordinates) {
            var length = parseInt(this.size);
             let xy = selectedCoordinates.split(",").map(number => (parseInt(number)))
             var gridShipKeys = Object.keys(this.grid.placedShipCoordinates)
             if (!(gridShipKeys.includes(selectedCoordinates)) && this.coordinates.length === 0 ) {
                 this.coordinates.push(xy)
                 this.grid.addShip(selectedCoordinates)
                 this.grid.placedShipCoordinates[selectedCoordinates] = 1;

             } else if (!gridShipKeys.includes(selectedCoordinates) && this.coordinates.length === 1) {
                 if ((xy[0] === this.coordinates[0][0] + 1) && (xy[1] === this.coordinates[0][1]) && (validCoordinate(`${this.coordinates[0][0] + length},${xy[1]}`))) {
                     this.coordinates.push(xy)
                     this.grid.addShip(selectedCoordinates)
                     this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                } else if ((xy[0] === this.coordinates[0][0] - 1) && (xy[1] === this.coordinates[0][1]) && (validCoordinate(`${this.coordinates[0][0] - length},${xy[1]}`))) {
                     this.coordinates.push(xy)
                     this.grid.addShip(selectedCoordinates)
                     this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                } else if ((xy[1] === this.coordinates[0][1] + 1) && (xy[0] === this.coordinates[0][0]) && (validCoordinate(`${xy[0]},${this.coordinates[0][0] + length}`))) {
                     this.coordinates.push(xy)
                     this.grid.addShip(selectedCoordinates)
                     this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                 } else if ((xy[1] === this.coordinates[0][1] - 1) && (xy[0] === this.coordinates[0][0]) && (validCoordinate(`${xy[0]},${this.coordinates[0][0] - length}`))) {
                     this.coordinates.push(xy)
                     this.grid.addShip(selectedCoordinates)
                     this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                 }
             } else if (!gridShipKeys.includes(selectedCoordinates) && this.coordinates.length > 1) {
                 var lastCoordinates = this.coordinates[this.coordinates.length - 1];
                 var secondToLast = this.coordinates[this.coordinates.length - 2];
                 if (secondToLast[0] - lastCoordinates[0] === 0) {
                     if ((secondToLast[1] - lastCoordinates[1] > 0) && (xy[1] === lastCoordinates[1] - 1 && xy[0] === lastCoordinates[0])) {
                         this.coordinates.push(xy);
                         this.grid.addShip(selectedCoordinates)
                         this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                     } else if ((secondToLast[1] - lastCoordinates[1] < 0) && (xy[1] === lastCoordinates[1] + 1 && xy[0] === lastCoordinates[0])) {
                         this.coordinates.push(xy);
                         this.grid.addShip(selectedCoordinates)
                         this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                     }
                 } else if (secondToLast[1] - lastCoordinates[1] === 0) {
                     if ((secondToLast[0] - lastCoordinates[0] > 0) && (xy[0] === lastCoordinates[0] - 1 && xy[1] === lastCoordinates[1])) {
                         this.coordinates.push(xy);
                         this.grid.addShip(selectedCoordinates)
                         this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                     } else if ((secondToLast[0] - lastCoordinates[0] < 0) && (xy[0] === lastCoordinates[0] + 1 && xy[1] === lastCoordinates[1])) {
                         this.coordinates.push(xy);
                         this.grid.addShip(selectedCoordinates)
                         this.grid.placedShipCoordinates[selectedCoordinates] = 1;
                     }
                 }
            }//   else {
            //      alert('this is an invalid position, please choose another.')
            //  }
         }

         static all() {
            return all;
         }
	}
}

const Ship = CreateShip()

console.log('in ship')
