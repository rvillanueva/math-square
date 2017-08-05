import * as Display from 'display'
import P5Behavior from 'p5beh';
import * as Floor from 'floor';
import World from './evolution/world';
import User from './user';
import DNA from './dna';
import config from './config';

var Vec2D = require('vector2d');

const killDistance = 20;

class Agent {
  constructor(position,dna,w){
  	this.dna = dna
    this.world = w;
    this.traits = this.expressGenes(dna);
  	this.state = {
  		position:Vec2D.ObjectVector(position.x,position.y),
  		velocity:Vec2D.ObjectVector(Math.random() * 4, Math.random() * 4),
  		acceleration:Vec2D.ObjectVector(0,0),
  		alive: true,
  		health: this.traits.lifespan
  	}
  }

  expressGenes(dna){
    var traits = {};
    config.genes.forEach(gene => {
      var min = gene.expression.min(this.world, this);
      var max = gene.expression.max(this.world, this);
      var expressedValue = (max - min) * dna.getGene(gene.key).value + min;
      traits[gene.key] = expressedValue;
    })
    return traits;
  }

  update(){
    this.checkHealth()
    this.checkForKill();
    this.checkForEdge();
    this.tryReproducing();
    this.alignWithAgents();
    this.state.acceleration = this.limit(this.state.acceleration,this.traits.maxAccel)
    this.state.velocity.add(this.state.acceleration)
    this.state.velocity = this.limit(this.state.velocity,this.traits.maxSpeed)
    this.state.position.add(this.state.velocity)
    this.state.acceleration.mulS(0)
  }

  // ____Behavior Functions________

  checkForKill(){
    for (var i = 0; i < this.world.users.length; i++){
      var user = this.world.users[i];
      if(this.state.position.distance(user.position) < 20){
        this.state.alive = false;
        console.log('Agent killed!');
        return;
      }
    }
  }

  checkForEdge(){
    var x = this.state.position.getX();
    var y = this.state.position.getY();
    if(x > this.world.width){
      this.state.position.setX(0);
    } else if (x < 0){
      this.state.position.setX(this.world.width);
    }

    if(y > this.world.height){
      this.state.position.setY(0);
    } else if (y < 0){
      this.state.position.setY(this.world.height);
    }
  }

  tryReproducing(){
    var roll = Math.random();
    if(roll < this.traits.replicationProb && this.world.agents.length < 100){
      var partner = this.world.agents[Math.floor(Math.random() * this.world.agents.length)];
      var dna = this.dna.reproduce(partner.dna);
      var position = {
        x: (this.state.position.getX() + partner.state.position.getX())/2,
        y: (this.state.position.getY() + partner.state.position.getY())/2
      }
      this.world.createAgent(new Agent(position, dna, this.world));
    }
  }

  checkHealth(){
    this.state.health -= 1;
    if (this.state.health <= 0){
      this.state.alive = false;
    }
  }

  alignWithAgents(){
    var sum = Vec2D.ObjectVector(0,0);
    var count = 0;
    for ( var i =0; i < this.world.agents.length; i++){
      var a = this.world.agents[i];
      var dist = a.state.position.distance(this.state.position);
      if ((dist > 0) && (dist<this.traits.vision)) {
        sum.add(a.state.velocity);
        count ++;
      }
    }
    if(count>0){
      sum.divS(count);
      sum.normalize();
      sum.mulS(this.traits.maxSpeed);
      var steer = sum.clone();
      steer.subtract(this.state.velocity);
      steer = this.limit(steer,this.traits.maxAccel);
      return steer;
    }
    else {
      return Vec2D.ObjectVector(0,0);
    }
  }



// ______HELPER FUNCTIIONS__________


  applyForce(force){
    this.state.acceleration.add(force)
  }

  limit(vec,magnitude){
    if (vec.magnitude > magnitude){
      vec.normalize()
      vec.mulS(magnitude)
    }
    return vec
  }

  mapper(val,min, max){
    var v = ((max-min)*val)+min
    return v
  }
}

export default Agent;



// Agent Architecture

// Init(DNA, Position)

// state[position, velocity, acceleration, alive, health]
// DNA [lifespan, replicationProb, maxSpeed, maxAccel, deathRepel, vision, attractOthers, repelPlayer, movementVariability, mutationRate]



// Functions

// update (list of agents)
// 	add up accel (limit) -> vel (limit)-> pos
// 	accel * 0
// 	limitLocation
// 	display

// lifespan
// 	counts down from lifespan

// limitLocation
// 	agent wraps around borders

// Attract Others

// for a in agents
// 	if a distance is less than vision
// 		decide if
