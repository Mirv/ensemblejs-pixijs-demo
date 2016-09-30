'use strict';

import read, { unwrap } from 'ok-selector';

function applyCollisionProxy (ball) {
  return {
    position: unwrap(ball, 'proxy'),
    velocity: unwrap(ball, 'velocity'),
    radius: read(ball, 'radius')
  };
}

module.exports = {
  type: 'PhysicsMap',
  deps: ['Config'],
  func: function (config) {
    return {
      'ball': [{sourceKey: 'demo.ball', via: applyCollisionProxy}],
      'top-walls': [
        {
          'position': {'x': -100, 'y': -100},
          'width': config().demo.board.width + 200,
          'height': 100
        },
        {
          'position': {'x': -100, 'y': 500},
          'width': config().demo.board.width + 200,
          'height': 100
        },
      ],
      'side-walls': [
        {
          'position': {'x': -100, 'y': -100},
          'width': 100,
          'height': config().demo.board.height + 200
        },
        {
          'position': {'x': 500, 'y': -100},
          'width': 100,
          'height': config().demo.board.height + 200
        },
      ]
    };
  }
};