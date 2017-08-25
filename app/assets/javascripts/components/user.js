class User {
  constructor(userJson) {

    this.user_name = userJson.user_name
    this.user_wins = userJson.user_wins
  }
  render() {
    return `<center><h3 style="font-family: 'Black Ops One', cursive;"><li style="font-family: 'Black Ops One', cursive; text-align:left;">${this.user_name}- ${this.user_wins} wins</li></h3></center>`
  }

}
