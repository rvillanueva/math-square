import * as Display from 'display'
import P5Behavior from 'p5beh';
import * as Floor from 'floor';
import World from './evolution/world';
import User from './user';
import DNA from './dna';
var Vec2D = require('vector2d');


class Agent {
  constructor(position,dna,w){
  	this.dna = dna
    this.world = w;
    this.traits = {

      'lifespan': this.mapper(this.dna.getGene('lifespan').value,30*this.world.fps,60*this.world.fps),
      'replicationProb': this.mapper(this.dna.getGene('replicationProb').value,1/(30*this.world.fps),1/(10*this.world.fps))
      'maxSpeed':this.mapper(this.dna.getGene('maxSpeed').value,this.world.width/(20*this.world.fps),this.world.width/(5*this.world.fps))
      'maxAccel':this.mapper(this.dna.getGene('maxAccel').value,0.002,0.02)
    }
  	this.state = {
  		position:Vec2D.ObjectVector(position.x,position.y),
  		velocity:Vec2D.ObjectVector(0,0),
  		acceleration:Vec2D.ObjectVector(0,0),
  		alive: true,
  		health: this.traits.lifespan
  	}


  }

  update(){
    this.checkHealth()

    this.state.acceleration = limit(this.state.acceleration,this.traits.maxAccel)
    this.state.velocity.add(this.state.acceleration)
    this.state.velocity = limit(this.state.velocity,this.traits.maxSpeed)
    this.state.position.add(this.state.velocity)
    this.state.acceleration.mulS(0)
  }

  // ____Behavior Functions________

  checkHealth(){
    this.state.health -= 1
    if (this.state.health <= 0){
      this.state.alive = false
    }
  }

  interact(){
    for ( var i =0; i < this.world.agents.length(); i++){
      var a = this.world.agents.length[i]
      if (a.state.position.magnitude() < this.traits.vision){
        this.align(a)
        this.attract(a)
        this.repel(a)
        this.reproduce(a)
      }
    }
  }

  attract(a){

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
