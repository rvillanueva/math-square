import User from './user';
import DNA from './dna';
import Agent from './agent';

class World {
  constructor(options){
    this.options = options || {};
    this.users = [];
    this.agents = [];
    this.width;
    this.height;
  }

  init(){
    console.log('Evolution world initialized!');
    this.users = [];
    this.agents = [];
    for (var i = 0; i < this.options.seedSize || 50; i++){
      var dna = new DNA();
      dna.randomize();
      var agent = new Agent(dna);
      this.createAgent(agent);
    }
  }

  setSize(width, height){
    this.width = width;
    this.height = height;
    console.log(`World size set to ${width}, ${height}.`);
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
      agents.update();
    });
  }
}

export default World;
