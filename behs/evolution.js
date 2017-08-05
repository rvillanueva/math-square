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
const FPS = 30;
const world = new World({
  seedSize: 50
});


function drawAgent(agent, pb){
  pb.fill(204)
  pb.ellipse(agent.state.pos.x, agent.state.pos.y, 20, 20)
}

function testDraw(pb){
  pb.fill(204);
  pb.ellipse(200, 200, 20, 20);
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
        x: user.x,
        y: user.y
      })
    })
  }
  world.update();
  world.agents.forEach(agent => {
    drawAgent(agent, this);
  })
  //testDraw();
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
