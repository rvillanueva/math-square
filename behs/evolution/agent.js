class Agent {
  //dns: new DNA()
  constructor(position, dna){
    this.dna = dna;
    this.state = {
        position: position || {
          x: position.x,
          y: position.y
        }
    }
  }
  update(){

  }
}

export default Agent;
