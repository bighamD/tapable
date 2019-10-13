# tapable
a simple tapable serize hooks


### SyncHook 
`demo`
```
const { SyncHook, SyncBailHook, SyncLoopHook, SyncWaterfallHook } = require('tapable')

class Node {
  constructor () {
    this.hooks = {
      node: new SyncHook(['name']), // SyncHook 依次执行所有注册好的事件
    }
  }
  tap() {
    this.hooks.node.tap('node', data => {
      console.log('version1', data)
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
// version1 node
// version2 node
```