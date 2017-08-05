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

const pb = new P5Behavior();
const FPS = 30;

pb.preload = function (p) {
}

pb.setup = function (p) {

};

pb.draw = function (floor, p) {

  this.clear();
  this.fill('rgb(242, 135, 36)');
};


export const behavior = {
  title: "Evolution",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
};
export default behavior
