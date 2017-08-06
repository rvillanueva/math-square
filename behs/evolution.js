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
  var vector = pb.createVector(agent.state.velocity.x, agent.state.velocity.y);
  var theta = vector.heading() + pb.radians(90);
  var r = 5;
  pb.fill(204);
  pb.stroke(0);
  pb.push();
  pb.translate(agent.state.position.x,agent.state.position.y);
  pb.rotate(theta);
  pb.beginShape();
  pb.vertex(0, -r*2);
  pb.vertex(-r, r*2);
  pb.vertex(r, r*2);
  pb.endShape();
  pb.pop();
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
