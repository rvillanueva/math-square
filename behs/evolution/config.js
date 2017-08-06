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
          return 0;
        },
        max: (world) => {
          return 1;
        },
        unit: 'modified likelihood of reproduction'
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
          var percentOfWidth = .02;
          return world.width*percentOfWidth;
        },
        max: (world) => {
          var percentOfWidth = .5;
          return world.width*percentOfWidth;
        },
        units: 'pixels'
      }
    },
    {
      key: 'distanceFromOthers',
      expression: {
        min: (world, agent) => {
          return 10;
        },
        max: (world, agent) => {
          return 50;
        },
        units: 'desired pixel distance from others'
      }
    },
    {
      key: 'repelFromUser',
      expression: {
        min: (world, agent) => {
          return 1;
        },
        max: (world, agent) => {
          return 3;
        },
        units: 'pixels/frame squared'
      }
    }
    {
      key: 'attractionToOthers',
      expression:{
        min: (world) => {
          return 0;
        },
        max: (world) => {
          return .02;
        },
        units: 'pixels/frame squared'
      }
    },
    {
      key: 'hsl-h',
      expression:{
        min: (world) => {
          return 0;
        },
        max: (world) => {
          return 256;
        },
        units: 'hue'
      }
    },
    {
      key: 'hsl-s',
      expression:{
        min: (world) => {
          return 75;
        },
        max: (world) => {
          return 100;
        },
        units: 'percent'
      }
    },
    {
      key: 'hsl-l',
      expression:{
        min: (world) => {
          return 30;
        },
        max: (world) => {
          return 95;
        },
        units: 'percent'
      }
    }
  ],
  killRadius: 60,
  maxAgents: 100,
  randomChance: 0.1
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
