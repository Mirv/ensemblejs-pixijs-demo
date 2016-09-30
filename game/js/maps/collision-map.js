'use strict';

import { unwrap } from 'ok-selector';
import moment from 'moment';

const reverse = (current) => -current;
const bounceBallX = () => ['demo.ball.velocity.x', reverse];
const bounceBallY = () => ['demo.ball.velocity.y', reverse];
const resetProxy = (delta, state) => ['demo.ball.proxy', unwrap(state, 'demo.ball.position')];

module.exports = {
  type: 'CollisionMap',
  func: function () {
    return {
      'ball': [
        { and: ['top-walls'], start: [bounceBallY, resetProxy] },
        { and: ['side-walls'], start: [bounceBallX, resetProxy]  }
      ]
    };
  }
};