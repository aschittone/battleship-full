function CreateGrid() {
	let id = 0
	const all = []

	return class Grid {

		constructor(user) {
			this.id = id++
			this.user = user
			this.placedShipCoordinates = {}
			this.firingBoard = {}
			this.render();
			all.push(this)
		}

		render() {
			let board = "";
			let x = 0;
			let y = 0;
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					board += `<div class="grid-border" id="${x},${y}"> </div>`
					y++;
				}
				x++;
				y = 0;
			}
			document.getElementById('grid-container').innerHTML = board;
			Ship.insertShips()
		}

		static renderBoards(playerName) {
			let currentPlayersGrid = Grid.all().find(grid => grid.user === playerName)
			document.getElementById('grid-container').remove()
			currentPlayersGrid.renderPlayingBoard()
		}

		renderPlayingBoard() {
			let ownCoordinates = this.placedShipCoordinates;
			let firingCoordinates = this.firingBoard;
			let board = `<h2 style="font-family: 'Black Ops One', cursive;" id="${this.id}"> ${this.user}'s Board </h2>`;
			let playingBoard = `<h2 style="font-family: 'Black Ops One', cursive;" id="${this.id}"> Firing Board </h2>`;
			let x = 0;
			let y = 0;
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					board += `<div class="grid-border" data-id="${x},${y}"> </div>`
					playingBoard += `<div class="grid-border" id="${x},${y}"> </div>`
					y++;
				}
				x++;
				y = 0;
			}
			document.getElementById('firing-grid').innerHTML = playingBoard;
			document.getElementById('players-grid').innerHTML = board;
			for (let coordinate in ownCoordinates) {
				if (ownCoordinates[coordinate] === 1) {

					document.querySelector(`div[data-id="${coordinate}"]`).style = "background-color: black;"
				} else if (ownCoordinates[coordinate] === 2) {
					document.querySelector(`div[data-id="${coordinate}"]`).style = "background-color: red;"
				} else if (ownCoordinates[coordinate] === 0) {
					document.querySelector(`div[data-id="${coordinate}"]`).style = "background-color: blue;"
				}
			}
			for (let coordinate in firingCoordinates) {
				if (firingCoordinates[coordinate] === 2) {
					document.getElementById(coordinate).style = "background-color: red;"
				} else if (firingCoordinates[coordinate] === 0) {
					document.getElementById(coordinate).style = "background-color: blue;"
				}
			}
		}

		checkFinished() {
			if (Object.keys(this.placedShipCoordinates).length === 15) {
				// alert('please give the computer to your oponent so they can place their ships')
				Grid.renderForm()
			}
			if (Grid.all().length === 2 && Object.keys(this.placedShipCoordinates).length === 15) {
				let firstPlayer = Grid.all()[0].user
				Grid.renderBoards(firstPlayer)
			}
		}

		static renderForm() {
			document.getElementById('ship-info').innerHTML = ''
			document.getElementById('grid-container').innerHTML = `<center>
			<h2 style="font-family: 'Black Ops One', cursive;">Opponent, please enter your name here to start playing!</h2>
			<form id="create-form">
			<input style="font-family: 'Black Ops One', cursive;" class="form-control transparent-input" type="text" id="create-name" placeholder="Enter your name">
			<button  style="font-family: 'Black Ops One', cursive;" class="btn btn-default btn3d submit-button">Submit</button>
			</form>
			</center>
			`
		}

		fireTorpedo(firingCoordinate, opponentsGrid) {
			if (Object.keys(opponentsGrid.placedShipCoordinates).includes(firingCoordinate)) {
				opponentsGrid.placedShipCoordinates[firingCoordinate] = 2
				this.firingBoard[firingCoordinate] = 2
				alert(`YOU'VE HIT A SHIP'!`)
				document.getElementById(firingCoordinate).style = "background-color: red;"

				let opponentsShips = Ship.all().filter(ship => ship.grid === opponentsGrid)
				let hitCount = 0
				let splitCoordinates = firingCoordinate.split(',').map(num => (parseInt(num)))
				let hitShip;
				opponentsShips.forEach(function (ship) {
					for (let i = 0; i < ship.coordinates.length; i++) {
						if (ship.coordinates[i][0] === splitCoordinates[0] && ship.coordinates[i][1] === splitCoordinates[1]) {
							hitShip = ship;
						}
					}
				})
				hitShip.coordinates.forEach(function (coordinate) {
					if (opponentsGrid.placedShipCoordinates[coordinate.join(",")] === 2) {
						hitCount += 1
						if (hitCount === hitShip.coordinates.length) {
							alert(`YOU'VE DESTROYED A SHIP!`)
						}
					}

				})

			} else {
				opponentsGrid.placedShipCoordinates[firingCoordinate] = 0
				this.firingBoard[firingCoordinate] = 0
				alert('YOU MISSED!')
				document.getElementById(firingCoordinate).style = "background-color: blue;"
			}
			if (Grid.gameWon(opponentsGrid)) {
				renderWinScreen(this)
				UsersAdapter.saveGameResults(this.user, opponentsGrid.user)
			} else {
				renderTransferScreen(opponentsGrid);
			}

			//opponentsGrid.renderPlayingBoard()
		}

		static gameWon(opponentsGrid) {
			let destroyedShipCounter = 0;
			let opponentsCoordinates = opponentsGrid.placedShipCoordinates;
			for (let coordinate in opponentsCoordinates) {
				if (opponentsCoordinates[coordinate] === 2) {
					destroyedShipCounter++;
				}
			}
			if (destroyedShipCounter === 15) {
				return true;
			} else {
				return false;
			}
		}

		addShip(coordinates) {
			document.getElementById(coordinates).style = "background-color: black;"
		}

		static all() {
			return all
		}

	}
}

const Grid = CreateGrid()

console.log('in grid')
