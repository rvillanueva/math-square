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
  pb.noStroke()
  pb.fill(204)
  pb.ellipse(agent.state.position.getX(), agent.state.position.getY(), 10, 10)
  pb.noFill()
  pb.stroke(255,0,0)
  //pb.ellipse(agent.state.position.getX(), agent.state.position.getY(), agent.traits.vision, agent.traits.vision)
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
