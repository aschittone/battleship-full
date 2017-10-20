// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require cable.js
//= require components/grid.js
//= require components/ship.js
//= require components/user.js
//= require components/users.js
//= require adapters/UsersAdapter.js


document.addEventListener('turbolinks:load', function () {

	document.getElementById('grid-container').addEventListener('click', function (event) {

		if (event.target && event.target.matches("button.submit-button")) {
			event.preventDefault()
			newGrid = new Grid(document.getElementById('create-name').value)
			createUser(newGrid.user)
		} else if (event.target && event.target.matches("button.history-button")) {
			event.preventDefault()
			document.getElementById('grid-container').style = ''
			getHistory()
		}
	})
	document.getElementById('insert-ships').addEventListener('click', function (event) {
		event.preventDefault();
		size = event.target.id
		document.getElementById('ship-info').innerHTML = `<br><h4 style="font-family: 'Black Ops One', cursive;">This ship is ${size} box(es) long, click on the grid to start placing the ship!</h4><br>`
		currentShip = new Ship(event.target.innerHTML, newGrid, size)
		Ship.removeShip(size)



		document.getElementById('grid-container').addEventListener('click', function (event) {
			if (event.target && event.target.nodeName == `DIV`) {
				document.getElementById('alerts').innerHTML = ""
				let coordinates = event.target.id
				currentShip.setCoordinates(coordinates)
				if (currentShip.coordinates.length === parseInt(size)) {
					newGrid.checkFinished()
				}
			}
		})

	})

	document.getElementById('grid-container').addEventListener('mouseover', function (event) {
		if (event.target && event.target.matches("div.grid-border")) {
			if (event.target.style.cssText === "background-color: black;") {
				event.target.style = "background-color: black; box-shadow: 0 4px 8px 0 #000000, 0 6px 20px 0 #000000;";
			} else {
				event.target.style = "box-shadow: 0 4px 8px 0 #000000, 0 6px 20px 0 #000000;"
			}

		}
	})
	document.getElementById('firing-grid').addEventListener('mouseover', function (event) {
		if (event.target && event.target.matches("div.grid-border")) {

			if (event.target.style.cssText === "background-color: blue;") {

				event.target.style = "background-color: blue; box-shadow: 0 4px 8px 0 #000000, 0 6px 20px 0 #000000;";
			} else if (event.target.style.cssText === "background-color: red;") {
				event.target.style = "background-color: red; box-shadow: 0 4px 8px 0 #000000, 0 6px 20px 0 #000000;";
			} else {
				event.target.style = "box-shadow: 0 4px 8px 0 #000000, 0 6px 20px 0 #000000;"
			}
		}
	})
	document.getElementById('grid-container').addEventListener('mouseout', function (event) {
		if (event.target && event.target.matches("div.grid-border")) {
			if (event.target.style.cssText === "background-color: black;") {
				let styling = event.target.style.cssText;
				event.target.style = "";
				event.target.style = styling;
			} else if (event.target.style.cssText === "background-color: black; box-shadow: rgb(0, 0, 0) 0px 4px 8px 0px, rgb(0, 0, 0) 0px 6px 20px 0px;") {
				event.target.style = "background-color: black;"
			} else {
				event.target.style = "";
			}
		}
	})
	document.getElementById('firing-grid').addEventListener('mouseout', function (event) {
		if (event.target && event.target.matches("div.grid-border")) {

			if (event.target.style.cssText === "background-color: blue;") {
				let styling = event.target.style.cssText;
				event.target.style = "";
				event.target.style = styling;
			} else if (event.target.style.cssText === "background-color: blue; box-shadow: rgb(0, 0, 0) 0px 4px 8px 0px, rgb(0, 0, 0) 0px 6px 20px 0px;") {
				event.target.style = "background-color: blue;"
			} else if (event.target.style.cssText === "background-color: red;") {
				let styling = event.target.style.cssText;
				event.target.style = "";
				event.target.style = styling;
			} else if (event.target.style.cssText === "background-color: red; box-shadow: rgb(0, 0, 0) 0px 4px 8px 0px, rgb(0, 0, 0) 0px 6px 20px 0px;") {
				event.target.style = "background-color: red;"
			} else {
				event.target.style = "";
			}
		}
	})

	document.getElementById('firing-grid').addEventListener('click', function (event) {
		let firingCoordinate = event.target.id
		let currentGridId = document.querySelector('h2').id
		let currentGrid = Grid.all()[parseInt(currentGridId)]
		let opponentsGrid;
		Grid.all().forEach(function (grid) {
			if (grid.id !== currentGrid.id) {
				opponentsGrid = grid
			}
		})

		currentGrid.fireTorpedo(firingCoordinate, opponentsGrid)

	})

	document.getElementById('alerts').addEventListener('click', function (event) {
		event.preventDefault();
		if (event.target && event.target.nodeName == 'BUTTON') {
			let nextGridId = parseInt(event.target.id)
			document.getElementById('alerts').innerHTML = "";
			Grid.all()[nextGridId].renderPlayingBoard();
		}
	})

});


function renderTransferScreen(opponentsGrid) {
	document.getElementById('firing-grid').innerHTML = "";
	document.getElementById('players-grid').innerHTML = "";
	document.getElementById('alerts').innerHTML = `<center><h2 style="font-family: 'Black Ops One', cursive;">Switching Players....</h2><h5 style="font-family: 'Black Ops One', cursive;">Pass the computer to your opponent</h5><button  style="font-family: 'Black Ops One', cursive;" id="${opponentsGrid.id}" class="btn btn-default btn3d submit-button">Click to switch player</button></center>`
}

function renderWinScreen(grid) {
	document.getElementById('firing-grid').innerHTML = "";
	document.getElementById('players-grid').innerHTML = "";
	document.getElementById('alerts').innerHTML = `<center><h1 style="font-family: 'Black Ops One', cursive;">${grid.user} won the game!!!</h1> <br> <button style="font-family: 'Black Ops One', cursive;" onclick="location.href='https://ship-battle.herokuapp.com'" class="btn btn-default btn3d">Play again?</button></center>`
}

function validCoordinate(coordinate) {
	if (document.getElementById(coordinate) !== null) {
		return true;
	} else {
		document.getElementById('alerts').innerHTML = `<center><h4 style="font-family: 'Black Ops One', cursive;">Your ship cannot fit that way!!</h4></center>`
		return false;
	}
}

function noShipsInTheWay(firstCoordinate, lastCoordinate, grid, direction) {
	let testCoordinates = []
	switch (direction) {
		case "down":
			for (let i = firstCoordinate[0] + 1; i < lastCoordinate[0]; i++) {
				testCoordinates.push(`${i},${firstCoordinate[1]}`);
			}
		case "up":
			for (let i = lastCoordinate[0] + 1; i < firstCoordinate[0]; i++) {
				testCoordinates.push(`${i},${firstCoordinate[1]}`)
			}
		case "left":
			for (let i = lastCoordinate[1]; i < firstCoordinate[1]; i++) {
				testCoordinates.push(`${firstCoordinate[0]},${i}`)
			}
		case "right":
			for (let i = firstCoordinate[1] + 1; i <= lastCoordinate[1]; i++) {
				testCoordinates.push(`${firstCoordinate[0]},${i}`)
			}
	}
	for (let coordinate in grid.placedShipCoordinates) {
		if (testCoordinates.includes(coordinate)) {
			document.getElementById('alerts').innerHTML = `<center> <h4 style="font-family: 'Black Ops One', cursive;">Your ship cannot fit that way!!</h4></center>`
			return false;
		}
	}
	return true;
}

function getHistory() {
	new Users()
}

function createUser(user) {
	newUser = new UsersAdapter(user)
	UsersAdapter.createOrFindUser(newUser)
}
