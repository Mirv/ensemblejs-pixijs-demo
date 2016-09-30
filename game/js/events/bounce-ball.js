'use strict';

import { unwrap } from 'ok-selector';

module.exports = {
  type: 'OnPhysicsFrame',
  func: function OnPhysicsFrame () {
    return function bounceBall (delta, state) {
      const position = unwrap(state, 'demo.ball.position');
      const velocity = unwrap(state, 'demo.ball.velocity');

      const nextPosition = {
        x: position.x + velocity.x * delta / 1000,
        y: position.y + velocity.y * delta / 1000
      };

      return [
        ['demo.ball.proxy', nextPosition],
        ['demo.ball.position', unwrap(state, 'demo.ball.proxy')]
      ];
    };
  }
};