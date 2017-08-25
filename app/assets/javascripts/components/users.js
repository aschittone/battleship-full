class Users {
  constructor() {
    this.users = []
    this.adapter = new UserAdapter()
    this.fetchAndLoadUsers()
  }
  fetchAndLoadUsers() {
    this.adapter.getUserHistory()
    .then(usersJson => usersJson.forEach(user => this.users.push(new User(user) )))
    .then(this.render.bind(this))
    .catch((error) => console.log(error) )
  }
  userInfo(){
    return this.users = this.users.map(user => user.render()).join('')
  }

  render() {
    document.getElementById('grid-container').innerHTML = `
    <center><h1 style="font-family: 'Black Ops One', cursive;">Top Players</h1><br><br><br><ol>${this.userInfo()}</ol></center>`
  }
}
