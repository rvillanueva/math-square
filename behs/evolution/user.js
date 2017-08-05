var Vec2D = require('vector2d');

class User {
  constructor(id){
    this.id = id;
    this.position = Vec2D.ObjectVector(0,0);
  }

  setPosition(x, y){
    this.position = Vec2D.ObjectVector(x, y);
  }
}

export default User;
