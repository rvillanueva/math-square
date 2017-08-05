import * as Display from 'display'
import P5Behavior from 'p5beh';
import * as Floor from 'floor';
import World from './evolution/world';
import User from './user';
import DNA from './dna';
import config from './config';

var Vec2D = require('vector2d');

class Agent {
  constructor(position,dna,w){
  	this.dna = dna
    this.world = w;
    this.traits = this.expressGenes(dna);
  	this.state = {
  		position:Vec2D.ObjectVector(position.x,position.y),
  		velocity:Vec2D.ObjectVector(0,0),
  		acceleration:Vec2D.ObjectVector(0,0),
  		alive: true,
  		health: this.traits.lifespan
  	}
  }

  expressGenes(dna){
    var traits = {};
    config.genes.forEach(gene => {
      var min = gene.expression.min(this.world);
      var max = gene.expression.max(this.world);
      var expressedValue = (max - min) * dna.getGene(gene.key).value + min;
      traits[gene.key] = expressedValue;
    })
    return traits;
  }

  update(agents){

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
