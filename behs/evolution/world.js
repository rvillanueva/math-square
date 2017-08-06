import User from './user';
import DNA from './dna';
import Agent from './agent';

class World {
  constructor(options){
    this.options = options || {};
    this.users = [];
    this.agents = [];
    this.width = this.options.width || 1920;
    this.height = this.options.height || 1080;
    this.fps = this.options.fps || 20;
  }

  init(){
    this.users = [];
    this.agents = [];
    var seedSize = this.options.seedSize || 5;
    this.createRandomAgents(this.options.seedSize || 5);

    console.log(`Evolution world initialized!`)
    console.log(`World size is [${this.width},${this.height}], started with ${seedSize} agents.`);
  }

  clearUsers(){
    this.users = [];
  }

  addUser(u){
    var user = new User(u.id);
    user.setPosition(u.x, u.y);
    this.users.push(user);
  }

  createRandomAgents(x){
    for (var i = 0; i < x; i++){
      var dna = new DNA();
      dna.randomize();
      var position = {
        x: Math.floor(this.width * Math.random()),
        y: Math.floor(this.height * Math.random())
      };
      var agent = new Agent(position, dna, this);
      this.createAgent(agent);
    }
  }

  createAgent(agent){
    this.agents.push(agent);
  }

  update(){
    this.agents = this.agents.filter(agent => {
      return agent.state.alive;
    });
    if(this.agents.length < 2){
      this.createRandomAgents(1);
    }
    this.agents.forEach(agent => {
      agent.update(this);
    });
  }
}

export default World;
