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

const pb = new P5Behavior();
const FPS = 20;
const world = new World({
  seedSize: 50,
  fps: FPS
});


function drawAgent(agent, pb){
  var lifespan = agent.dna.getGene("lifespan").value
  var maxAccel = agent.dna.getGene("maxAccel").value  
  var health = agent.state.health 
  var attractionToOthers = agent.dna.getGene("attractionToOthers").value
  var distanceFromOthers = agent.dna.getGene("distanceFromOthers").value
  var replicationProb = agent.dna.getGene("replicationProb").value
  pb.fill(attractOthers*255,repelOthers*255,repelPlayer*255, health*0.5)
  pb.stroke(0,191,255,health*0.5);
  pb.strokeWeight(vision*8);
  pb.push();
  pb.translate(width*0.5, height*0.5);
  pb.rotate(frameCount / (15/accel));
  pb.star(0, 0, 25/replicationProb, 200, lifespan*10); 
  pb.pop();
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


pb.preload = function (p) {
}

pb.setup = function (p) {
  world.setSize(Display.width, Display.height);
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
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
