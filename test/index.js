/**
 * oklm-js
 *
 * Copyright © 2016 . All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import 'babel-polyfill';
import { expect } from 'chai';
import Oklm from '../src/index';

describe('Oklm', () => {

  describe('Oklm.run()', () => {

    it('should lol', () => {
      const oklm = new Oklm(c => c*2);
      oklm.apply(function* (params) {
        let result;
        console.log('test parm', params)
        while (true) {
          result = yield params[0]+1;
          params = yield result+1;
        }
      });
      let result = oklm.run(1);
      expect(result).to.be.equal(5);
    });
  });
});
