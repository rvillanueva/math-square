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
let frames = 0;


function drawAgent(agent, pb){
  var lifespan = agent.dna.getGene("lifespan").value
  var maxAccel = agent.dna.getGene("maxAccel").value
  var maxSpeed = agent.dna.getGene("maxSpeed").value
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
  pb.rotate(frames / (8 * (maxSpeed - 13)/6.5));
  star(0,0, distanceFromOthers*20 + 1, attractionToOthers*20 + 1, Math.floor(vision*10), pb);
  pb.pop();
}

function drawUser(user){

}

function drawCounter(number, pb){
  pb.fill(256);
  pb.stroke(0);
  pb.textSize(18);
  pb.text(`Remaining: ${number}`, 25, 50);
}

function star(x, y, radius1, radius2, npoints, pb) {
  var angle = pb.TWO_PI / npoints;
  var halfAngle = angle/2.0;
  pb.beginShape();
  for (var a = 0; a < pb.TWO_PI; a += angle) {
    var sx = x + pb.cos(a) * radius2;
    var sy = y + pb.sin(a) * radius2;
    pb.vertex(sx, sy);
    sx = x + pb.cos(a+halfAngle) * radius1;
    sy = y + pb.sin(a+halfAngle) * radius1;
    pb.vertex(sx, sy);
  }
  pb.endShape();
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
  if(frames < 300){
    frames++;
  } else {
    frames = 0;
  }
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
  drawCounter(world.agents.length, this);
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
