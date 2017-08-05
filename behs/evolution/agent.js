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
    this.world = w
    this.dnaMapped = {
      'lifespan': mapper(this.dna.getGene('lifespan').value,30*this.world.fps,60*this.world.fps),
      'replicationProb': mapper(this.dna.getGene('replicationProb').value,1/(30*this.world.fps),1/(10*this.world.fps))
      'maxSpeed':mapper(this.dna.getGene('maxSpeed').value,this.world.width/(20*fps),this.world.width/(5*fps))
      'macAccel':mapper(this.dna.getGene('maxAccel').value,0.002,0.02)

    }
  	this.state = {
  		position:Vec2D.ObjectVector(position.x,position.y),
  		velocity:Vec2D.ObjectVector(0,0),
  		acceleration:Vec2D.ObjectVector(0,0),
  		alive: true,
  		health: this.dnaMapped.lifespan
  	}


  }

  update(agents){

  }

  mapper(val,min, max){
    v = ((max-min)*val)+min
    return v
  }
}


module.exports = Agent;


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
