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

function createConsumer() {
	const CableApp = {}
	CableApp.cable = ActionCable.createConsumer(`ws://${window.location.hostname}:3000/gamecast`)
	return CableApp
}

function subScribeToGame(cable) {
	cable.gamecast = cable.cable.subscriptions.create({channel: "GameChannel",game:"one"},
      {
        received: (message) => console.log('playing together')
      })
	return cable.gamecast 
}

function sendGameCastAction(cable,msg) {
	cable.send(msg)
}

document.addEventListener('turbolinks:load', function(){
	// cable = createConsumer()
	// subScribeToGame(cable)
	// sendGameCastAction(gamecast,{msg:'test'})

	const CableApp = {}
	CableApp.cable = ActionCable.createConsumer(`ws://${window.location.hostname}:3000/gamecast`)
	CableApp.gamecast = CableApp.cable.subscriptions.create({channel: "GameChannel",game:"one"},
      {
        received: (message) => console.log('playing together')
      })

	const triggger = document.getElementById('send-msg')
	triggger.addEventListener('click',send)
	
	function send() {
		CableApp.gamecast.send({m:'fasffsadf'})
	}

	
	
	console.log('triggered event')
	document.getElementById('grid-container').addEventListener('click', function(event) {
		if (event.target && event.target.matches("input.submit-button")) {
			event.preventDefault()
			newGrid = new Grid(document.getElementById('create-name').value)


		}
	})
	document.getElementById('insert-ships').addEventListener('click', function(event){
		size = event.target.id
		document.getElementById('ship-info').innerHTML = `This ship is ${size}, click on the grid to place the ship`
		currentShip = new Ship(event.target.innerHTML, newGrid, size)
		Ship.removeShip(size)



		document.getElementById('grid-container').addEventListener('click', function(event) {
			if (event.target && event.target.nodeName == `DIV`) {
				var coordinates = event.target.id
				currentShip.setCoordinates(coordinates)
				if (currentShip.coordinates.length === parseInt(size)) {
					newGrid.checkFinished()
				}
			}
		})

	})

	document.getElementById('firing-grid').addEventListener('click', function(event) {
		var firingCoordinate = event.target.id
		var currentGridId = document.querySelector('h2').id
		var currentGrid = Grid.all()[parseInt(currentGridId)]
		var opponentsGrid;
		Grid.all().forEach(function(grid) {
			if (grid.id !== currentGrid.id) {
				debugger
				opponentsGrid = grid
			}
		})
		
		currentGrid.fireTorpedo(firingCoordinate, opponentsGrid)

	})

	document.getElementById('alerts').addEventListener('click', function(event) {
		event.preventDefault();
		if (event.target && event.target.nodeName == 'BUTTON') {
			var nextGridId = parseInt(event.target.id)
			document.getElementById('alerts').innerHTML = "";
			Grid.all()[nextGridId].renderPlayingBoard();
		}
	})

});


function renderTransferScreen(opponentsGrid) {
	document.getElementById('firing-grid').innerHTML = "";
	document.getElementById('players-grid').innerHTML = "";
	document.getElementById('alerts').innerHTML = `<center><h2>Switching Players....</h2><h5>Pass the computer to your opponent</h5><button id="${opponentsGrid.id}">Click to switch player</button></center>`
}

function renderWinScreen(grid) {
	document.getElementById('firing-grid').innerHTML = "";
	document.getElementById('players-grid').innerHTML = "";
	document.getElementById('alerts').innerHTML = `<center><h1>${grid.user} won the game!!!</h1></center>`
}








