var Vec2D = require('vector2d');

class User {
  constructor(id,world){
    this.id = id;
    this.position = Vec2D.ObjectVector(world.width * Math.random(),world.height * Math.random());
    //this.position = Vec2D.ObjectVector(world.width/2,world.height/2);
    this.ghost = false;
    this.world = world
    this.velocity = Vec2D.ObjectVector(0,0)
    this.acceleration = Vec2D.ObjectVector(0,0)

    this.maxAccel = 0.03
    this.maxSpeed = 2
  }

  setPosition(x, y){
    this.position = Vec2D.ObjectVector(x, y);
  }

  update(){
  	if (this.ghost == true){
  		this.checkForEdge()
  		this.goToAgents()
  		this.separateFromUsers()
		///this.acceleration = this.limit(this.acceleration,this.maxAccel)
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
      if (dist > 0 && dist <this.world.width/5){
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
      //steer.mulS()
      steer = this.limit(steer,this.maxAccel);
      this.applyForce(steer);
 	}
   }

   separateFromUsers(){
  	var sum = Vec2D.ObjectVector(0,0)
    var count = 0
    for ( var i =0; i < this.world.users.length; i++){
      var user = this.world.users[i];
      var dist = user.position.distance(this.position);
      if ((dist > 0) && (dist<80)) {
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

  checkForEdge(){
    var margin = 20;
    var x = this.position.getX();
    var y = this.position.getY();
    if(x > this.world.width - margin){
      this.position.setX(this.world.width - margin);
    } else if (x < margin){
      this.position.setX(margin);
    }

    if(y > this.world.height - margin){
      this.position.setY(this.world.height - margin);
    } else if (y < margin){
      this.position.setY(margin);
    }
  }

  applyForce(force){
    this.acceleration.add(force)
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
