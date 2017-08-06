var Vec2D = require('vector2d');

class User {
  constructor(id,world){
    this.id = id;
    this.position = Vec2D.ObjectVector(this.width * Math.random(),this.height * Math.random());
    this.ghost = false;
    this.world = w
    this.velocity = Vec2D.ObjectVector(0,0)
    this.acceleration = Vec2D.ObjectVector(0,0)

    this.maxAccel = 0.3
    this.macSpeed = 10
  }

  setPosition(x, y){
    this.position = Vec2D.ObjectVector(x, y);
  }

  update(){
  	if (ghost == true){
  		this.goToAgents()
  		this.separateFromUsers()
		this.acceleration = this.limit(this.acceleration,this.maxAccel)
		this.velocity.add(this.acceleration)
		this.velocity = this.limit(this.velocity,this.maxSpeed)
		this.position.add(this.velocity)
		this.acceleration.mulS(0)
	}
  }

  goToAgents(){
  	var sum = Vec2D.ObjectVector(0,0);
    var count = 0;
    for ( var i =0; i < this.world.agents.length; i++){
      var a = this.world.agents[i];
      var dist = a.state.position.distance(this.position);
      if (dist > 0){
        sum.add(a.state.position);
        count++;
      }
 	}
    if(count>0){
      sum.divS(count)
      sum.subtract(this.position)
      sum.normalize()
      sum.mulS(this.maxSpeed)
      var steer = sum.clone()
      steer.subtract(this.velocity)
      steer.mulS(this.traits.attractionToOthers)
      steer = this.limit(steer,this.traits.maxAccel);
      this.applyForce(steer);
 	}
   }

   separateFromUsers(){
  	var sum = Vec2D.ObjectVector(0,0)
    var count = 0
    for ( var i =0; i < w.users.length; i++){
      var user = w.users[i];
      var dist = user.position.distance(this.position);
      if ((dist > 0) && (dist<60)) {
        var diff = this.position.clone()
        diff.subtract(user.position)
        diff.normalize()
        //diff.mulS(-1)
        diff.divS(dist)
        sum.add(diff)
        count++
      }
    }
    if(count>0){
      sum.divS(count)
      sum.normalize()
      sum.mulS(this.maxSpeed)
      var steer = sum.clone()
      steer.subtract(this.velocity)
      this.applyForce(steer);
    }
  }

  applyForce(force){
    this.state.acceleration.add(force)
  }

  
  limit(vec,mag){
    var v = vec;
    if (v.magnitude() > mag){
      v.unit()
      vec.mulS(mag)
    }
    return v

  }


}

export default User;
