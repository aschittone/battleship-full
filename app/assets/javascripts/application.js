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
//= require components/grid.js
//= require components/ship.js
console.log('step 0')

document.addEventListener('turbolinks:load', function(){
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

});
