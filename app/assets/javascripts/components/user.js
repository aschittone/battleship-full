class User {
  constructor(userJson) {

    this.user_name = userJson.user_name
    this.user_wins = userJson.user_wins
  }
  render() {
    return `<h3><li>${this.user_name}- ${this.user_wins} wins</li></h3>`
  }

}
