class User {
  constructor(id){
    this.id = id;
    this.x;
    this.y;
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
}

export default User;
