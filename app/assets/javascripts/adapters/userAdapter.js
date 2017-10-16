class UserAdapter {
  constructor(user) {
    this.baseUrl = 'https://ship-battle.herokuapp.com/users'

    this.user = user
  }

  getUserHistory() {

    return fetch(this.baseUrl)
      .then(resp => resp.json())

  }

  static createOrFindUser(newUser) {
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { name: newUser.user } })
    }
    fetch(newUser.baseUrl, userCreateParams).then(resp => resp.json()).catch((error) => console.log(error))
  }

  static saveGameResults(winner, loser) {
    const gameCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ game: { winner: winner, loser: loser } })
    }

    fetch('https://ship-battle.herokuapp.com/games', gameCreateParams).then(resp => resp.json()).catch((error) => console.log(error))
  }


}
