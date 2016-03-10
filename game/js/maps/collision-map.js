'use strict';

function bounceBallX (delta, state) {
  return [
    'demo.ball.velocity.x', state.get('demo.ball.velocity.x') * -1
  ];
}

function bounceBallY (delta, state) {
  return [
    'demo.ball.velocity.y', state.get('demo.ball.velocity.y') * -1
  ];
}

module.exports = {
  type: 'CollisionMap',
  func: function () {
    return {
      'ball': [
        { and: ['top-walls'], start: bounceBallY },
        { and: ['side-walls'], start: bounceBallX }
      ]
    };
  }
};