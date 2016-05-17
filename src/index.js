/**
 * oklm-js
 *
 * Copyright © 2016 . All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/*

middleware = function* (previous) {
  let params = previous();
  let result = yield params;
  yield result;
}

*/



class Oklm {
  constructor(fn) {
    this.fn = fn;
    this.middlewares = [];
  }
  apply (middleware) {
    this.middlewares.unshift(middleware);
  }
  run (...args) {
    let preIt = this.pre(this.middlewares, args);
    let preVal;
    console.log(args)
    do {
      preVal = preIt.next(args);
      args = preVal.value;
      console.log('do args', args)
    } while(!preVal.done);
    let result = this.fn.apply(null, ...args);

    let postIt = this.post(iterators, result);
    let postVal;
    do {
      postVal = postIt.next(result);
      result = postVal.value;
    } while(!postVal.done);

    return result;
  }
  * pre (middlewares, args) {
    let nextArgs = args;
    console.log('mid',nextArgs);
    for(let middleware of middlewares) {
       middleware = middleware(nextArgs);
       nextArgs = yield middleware.next();
    }
  }
  * post (middlewares, args) {
    let nextArgs = args;
    for(let i = middlewares.length; i--;) {
       nextArgs = yield middlewares[i].next(nextArgs);
    }
  }
}

export default Oklm;
