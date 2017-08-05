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
const world = new World();

pb.preload = function (p) {
}

pb.setup = function (p) {
  world.init();
};

pb.draw = function (floor, p) {
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
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
