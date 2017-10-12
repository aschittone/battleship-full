function createConsumer() {
	const CableApp = {}
	CableApp.cable = ActionCable.createConsumer(`ws://${window.location.hostname}:3000/gamecast`)
	return CableApp
}

function subScribeToGame(cable) {
	if (cable.cable.subscriptions.length === 0) {
		cable.gamecast = cable.cable.subscriptions.create({ channel: "GameChannel", game: "one" }, {
			received: (message) => console.log('playing together')
		})
	} else {
		cable.gamecast = cable.cable.subscriptions.create({ channel: "GameChannel", game: "two" }, {
			received: (message) => console.log('playing together')
		})
	}
	return cable.gamecast
}

function sendGameCastAction(cable, msg) {
	cable.send(msg)
}

const functions = { renderWinScreen: renderWinScreen }

document.addEventListener('turbolinks:load', function () {
	// cable = createConsumer()
	// subScribeToGame(cable)
	// sendGameCastAction(gamecast,{msg:'test'})

	const CableApp = {}
	CableApp.cable = ActionCable.createConsumer(`ws://${window.location.hostname}:3000/gamecast`)


	// if (!cable.cable.subscriptions) {
	// 	cable.gamecast = cable.cable.subscriptions.create({channel: "GameChannel", game:"one"}
	//      })
	// } else {
	// 	cable.gamecast = cable.cable.subscriptions.create({channel: "GameChannel", game:"two"}
	// })
	subScribeToGame(CableApp)

	// CableApp.gamecast = CableApp.cable.subscriptions.create({channel: "GameChannel",game:"one"},
	//      {
	//        received: function(message) {

	//        	
	//        	let action = functions[message.toDo];
	//        	let otherPlayer = message.playerOne
	//        	Grid.all().push(otherPlayer)
	//        	console.log(message)
	//        	//action(message.playerOne);
	//        }
	//      })

	const trigger = document.getElementById('send-msg')
	trigger.addEventListener('click', function () {
		sendData('renderWinScreen')
	})

	function sendData(actionToDo) {

		CableApp.gamecast.send({ grids: Grid.all(), toDo: actionToDo })

	}



	console.log('triggered event')

