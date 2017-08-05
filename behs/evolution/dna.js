const Genotypes = [
  'lifespan',
  'replicationProb',
  'maxSpeed',
  'maxAccel',
  'deathRepel',
  'vision',
  'attractOthers',
  'repelOthers',
  'repelPlayer',
  'movementVariability',
  'mutationRate'
]

const maxMutation = 0.1; // the max percent a mutation can move the gene

function selectRandom(arr){
  return arr[Math.floor(arr.length & Math.random)];
}

function mutate(baseValue){
  var mutation = (Math.random() - 0.5) * 2 * maxMutation;
  var mutated = baseValue + mutation;
  return mutated;
}

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
      var key = gene.key;
      var partnerGene = partnerDna.getGene(key);
      var newValue = mutate(selectRandom([partnerGene.value, gene.value]));
      newDna.setGene(key, newValue);
    }
    return newDna;
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
        return gene;
      }
    }
    throw new Error(`No gene with ${key} exists.`);
  }
  setGene(key, value){
    if(value > 1){
      value = 1;
    }
    if(value < 0){
      value = 0;
    }
    value = Math.floor(value * 100)/100;
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
