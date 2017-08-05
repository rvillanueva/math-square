class Agent {
  //dns: new DNA()
  constructor(position, dna){
    this.state = {
        position: position || {
          x: position.x,
          y: position.y
        }
    }
  }
  update(){

  }
}

<<<<<<< HEAD
module.exports = Agent;



export default Agent;

Agent Architecture

Init(DNA, Position)

state[pos, vel, accel, alive, health, ]
DNA [lifespan, replicationProb, maxSpeed, maxAccel, deathRepel, vision, attractOthers, repelPlayer, movementVariability, mutationRate]



Functions

update (list of agents)
	add up accel (limit) -> vel (limit)-> pos
	accel * 0
	limitLocation	
	display

lifespan
	counts down from lifespan 

limitLocation
	agent wraps around borders

Attract Others

for a in agents
	if a distance is less than vision
		decide if 