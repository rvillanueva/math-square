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
  		velocity:Vec2D.ObjectVector(0,0),
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
        console.log('DEAD')
        return;
      }
    }
  }

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
