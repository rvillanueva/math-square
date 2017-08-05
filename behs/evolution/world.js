import User from './user';

class World {
  constructor(){
    this.users = [];
    this.agents = [];
  }

  init(){
    console.log('Evolution world initialized!');
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
    this.agents.forEach(agent => {
      agents.update();
    });
  }
}

export default World;
