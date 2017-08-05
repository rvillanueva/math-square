const Genotypes = [
  'lifespan',
  'replicationProb',
  'maxSpeed',
  'maxAccel',
  'deathRepel',
  'vision',
  'attractOthers',
  'repelPlayer',
  'movementVariability',
  'mutationRate'
]

class Gene {
  constructor(key, value){
    this.key = key;
    this.value = value;
  }
}

class DNA {
  constructor(){
    this.genes = [];
  }
  reproduce(partnerDna){
    var newDna = new DNA();
    for (var i = 0; i < this.genes.length; i++){
      var gene = this.genes[i];
      var partnerValue = partnerDna.getGene(gene.key);
      var mutation = Math.random() - 0.5;
      var newValue = partnerValue * gene.value + mutation;
      this.setGene(gene.key, newValue);
    }
  }
  randomize(){
    this.genes = [];
    Genotypes.forEach(type => {
      var value = Math.floor(Math.random() * 100)/100; // should be normal dist
      this.setGene(type, value);
    })
  }
  getGene(key){
    for (var i = 0; i < this.genes.length; i++){
      let gene = this.genes[i];
      if(gene.key == key){
        return key;
      }
    }
    return null;
  }
  setGene(key, value){
    if(value > 1){
      value = 1;
    }
    if(value < 0){
      value = 0;
    }
    for (var i = 0; i < this.genes.length; i++){
      let gene = this.genes[i];
      if(gene.key == key){
        gene.value = value;
        return;
      }
    }
    this.genes.push(new Gene(key, value));
  }
}

export default DNA;
