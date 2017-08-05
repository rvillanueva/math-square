import User from './user';
import DNA from './dna';
import Agent from './agent';

class World {
  constructor(options){
    this.options = options || {};
    this.users = [];
    this.agents = [];
    this.width = 1920;
    this.height = 1080;
  }

  init(){
    console.log(`Evolution world initialized! World size is [${this.width},${this.height}]`);
    this.users = [];
    this.agents = [];
    var seedSize = this.options.seedSize || 50;
    console.log(seedSize);
    for (var i = 0; i < seedSize; i++){
      var dna = new DNA();
      dna.randomize();
      var position = {
        x: Math.floor(this.width * Math.random()),
        y: Math.floor(this.height * Math.random())
      };
      var agent = new Agent(position, dna);
      this.createAgent(agent);
    }
  }

  setSize(width, height){
    this.width = width;
    this.height = height;
  }

  clearUsers(){
    this.users = [];
  }

  addUser(u){
    var user = new User();
    user.setPosition(u.x, u.y);
    this.users.push(user);
  }

  createAgent(agent){
    this.agents.push(agent);
  }

  update(){
    this.agents.filter(agent => {
      return agent.alive;
    });
    this.agents.forEach(agent => {
      agent.update();
    });
  }
}

export default World;
