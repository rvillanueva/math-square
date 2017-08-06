/* MoMath Math Square Behavior
 *
 *        Title: Evolution
 *  Description: Evolution
 * Scheduler ID:
 *    Framework: P5
 *       Author:
 *      Created:
 *       Status: dev
 */

import * as Display from 'display'
import P5Behavior from 'p5beh';
import * as Floor from 'floor';
import World from './evolution/world';
import config from './evolution/config';

const pb = new P5Behavior();
const FPS = 20;
const world = new World({
  seedSize: 50,
  fps: FPS,
  width: Display.width,
  height: Display.height
});


function drawAgent(agent, pb){
  var lifespan = agent.dna.getGene("lifespan").value
  var maxAccel = agent.dna.getGene("maxAccel").value
  var health = agent.state.health
  var attractionToOthers = agent.dna.getGene("attractionToOthers").value
  var distanceFromOthers = agent.dna.getGene("distanceFromOthers").value
  var replicationProb = agent.dna.getGene("replicationProb").value
  var vision = agent.dna.getGene("vision").value
  var width = 2
  var height = 2
  var hslStr = `hsl(${Math.floor(agent.traits['hsl-h'])}, ${Math.floor(agent.traits['hsl-s'])}%, ${Math.floor(agent.traits['hsl-l'])}%)`;
/*  pb.stroke('hsl(160, 100%, health*100%)');
  pb.strokeWeight(vision*2);*/
  pb.noStroke();
  pb.fill(hslStr);
  pb.push();
  pb.translate(agent.state.position.x,agent.state.position.y);
  pb.rotate(FPS / 100);
  polygon(0, 0, 15, lifespan*10, pb);
  pb.pop();
}

function drawCounter(number, pb){
  pb.fill(256);
  pb.stroke(0);
  pb.textSize(18);
  pb.text(`Remaining: ${number}`, 25, 50);
}


function drawUser(user,pb){
	//console.log(user.position)
	var r = config.killRadius
	pb.noFill()
	pb.strokeWeight(3)
	pb.stroke(0,100,255)
	pb.ellipse(user.position.x,user.position.y,r,r)
	pb.noStroke()
	pb.fill(0,100,255)
	pb.ellipse(user.position.x,user.position.y,r/2,r/2)
}


function polygon(x, y, radius, npoints,pb) {
  var angle = pb.TWO_PI / npoints;
  pb.beginShape();
  for (var a = 0; a < pb.TWO_PI; a += angle) {
    var sx = x + pb.cos(a) * radius;
    var sy = y + pb.sin(a) * radius;
    pb.vertex(sx, sy);
  }
  pb.endShape();
}

pb.preload = function (p) {
}

pb.setup = function (p) {
  world.init();
};

pb.draw = function (floor, p) {
  this.clear();

  world.clearUsers();
  if(floor && floor.users){
    floor.users.forEach((user, u) => {
      world.addUser({
        id: user.id,
        x: user.x,
        y: user.y
      })
    })
  }
  world.update();
  this.background(60)
  world.agents.forEach(agent => {
    drawAgent(agent, this);
  })
  world.users.forEach(user => {
  	drawUser(user,this)
  })
  drawCounter(world.agents.length, this);
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
