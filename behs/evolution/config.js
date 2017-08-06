var config = {
  genes: [
    {
      key: 'lifespan',
      expression: {
        min: (world) => {
          var seconds = 30;
          return seconds * world.fps;
        },
        max: (world) => {
          var seconds = 60;
          return seconds * world.fps;
        },
        unit: 'frames'
      }
    },
    {
      key: 'replicationProb',
      expression: {
        min: (world) => {
          var averageReplicationSeconds = 10;
          return averageReplicationSeconds / world.fps / 60;
        },
        max: (world) => {
          var averageReplicationSeconds = 30;
          return averageReplicationSeconds / world.fps / 60;
        },
        unit: 'replication chance per frame'
      }
    },
    {
      key: 'maxSpeed',
      expression: {
        min: (world) => {
          var secondsToCoverWidth = 20;
          return world.width / (secondsToCoverWidth * world.fps);
        },
        max: (world) => {
          var secondsToCoverWidth = 6;
          return world.width / (secondsToCoverWidth * world.fps);
        },
        unit: 'pixels per frame'
      }
    },
    {
      key: 'maxAccel',
      expression: {
        min: (world) => {
          var accel = 0.02;
          return accel;
        },
        max: (world) => {
          var accel = 0.2;
          return accel;
        },
        units: 'pixels per frame squared'
      }
    },
    {
      key: 'vision',
      expression: {
        min: (world) => {
          var percentOfWidth = 0.2;
          return world.width*percentOfWidth;
        },
        max: (world) => {
          var percentOfWidth = 1;
          return world.width*percentOfWidth;
        },
        units: 'percent of board width'
      }
    },
    {
      key: 'distanceFromOthers',
      expression: {
        min: (world, agent) => {
          return 20;
        },
        max: (world, agent) => {
          return agent.dna.getGene('vision').value;
        },
        units: 'desired pixel distance from others'
      }
    },
    {
      key: 'attractionToOthers',
      expression:{
        min: (world) => {
          return 0.1;
        },
        max: (world) => {
          return 1;
        },
        units: 'pixels/frame squared'
      }
    },
    {
      key: 'color',
      expression:{
        min: (world) => {
          return 0;
        },
        max: (world) => {
          return 16777215;
        },
        units: 'integer to rgb'
      }
    }
  ]
}

/*
const Genotypes = [
  'lifespan',
  'replicationProb',
  'maxSpeed',
  'maxAccel',

  ///
  'deathRepel',
  'vision',
  'attractOthers',
  'repelOthers',
  'repelPlayer',
  'movementVariability',
  'mutationRate',
  'sensitivityToDeath',
  'zigzag'
]
*/

export default config;
