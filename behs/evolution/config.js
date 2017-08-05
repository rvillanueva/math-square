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
          var secondsToCoverWidth = 3;
          return world.width / (secondsToCoverWidth * world.fps);
        },
        unit: 'pixels per frame'
      }
    },
    {
      key: 'maxAccel',
      expression: {
        min: (world) => {
          var accel = 0.002;
          return accel/world.fps;
        },
        max: (world) => {
          var accel = 0.2;
          return accel/world.fps;
        },
        units: 'pixels per frame squared'
      }
    },
    {
      key: 'vision',
      expression: {
        min: (world) => {
          var percentOfWidth = 0;
          return percentOfWidth * world.width;
        },
        max: (world) => {
          var percentOfWidth = 0.2;
          return percentOfWidth * world.width;
        },
        units: 'percent of board width'
      }
    },
    {
      key: 'attractionToOthers',
      expression: {
        min: (world) => {
          var magnitude = 0.02;
          return magnitude;
        },
        max: (world) => {
          var magnitude = 2;
          return magnitude;
        },
        units: 'pixels per frames squared'
      }
    },
    {
      key: 'repelledFromOthers',
      expression: {
        min: (world) => {
          var magnitude = 0.02;
          return magnitude;
        },
        max: (world) => {
          var magnitude = 2;
          return magnitude;
        },
        units: 'pixels per frames squared'
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
