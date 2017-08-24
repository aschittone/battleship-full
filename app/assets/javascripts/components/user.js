class User {
  constructor(userJson) {

    this.user_name = userJson.user_name
    this.user_wins = userJson.user_wins
  }
  render() {
    return `<li>${this.user_name}- ${this.user_wins}`
  }

}
