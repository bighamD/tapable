const { SyncHook, SyncBailHook, SyncLoopHook, SyncWaterfallHook, AsyncSeriesHook } = require('tapable')

class Node {
  constructor () {
    this.hooks = {
      node: new SyncBailHook(['name']), // SyncBailHook 当执行到返回值不为undefined的回调时 中断后面的回调
    }
  }
  tap() {
    this.hooks.node.tap('node', data => {
      console.log('im learning', data)
      return 'vue学不动了';
    });
    this.hooks.node.tap('vue', data => {
      console.log('verison2', data)
    })
  }
  call(args) {
    this.hooks.node.call(args)
  }
}

const node  = new Node();
node.tap();
node.call('node');