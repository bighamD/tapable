class SyncBailHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, cb) {
    this.tasks.push(cb);
  }
  call(...rest) {
    var index = 0;
    var len = this.tasks.length;
    do {
      var ret = this.tasks[index++](...rest);
    } while (ret === undefined && index < len);
  }
}
let hook = new SyncBailHook(['name']);
hook.tap('vue', data => {
  console.log('i am good at vue')
  return 'node 学不动了'
})
hook.tap('node', data => {
  console.log('i am good at', data)
})
hook.call('node');