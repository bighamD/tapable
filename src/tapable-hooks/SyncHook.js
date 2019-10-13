class SyncHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, cb) {
    this.tasks.push(cb);
  }
  call(...rest) {
    this.tasks.forEach(task => task(...rest))
  }
}

var hook = new SyncHook(['name']);
hook.tap('vue', data => {
  console.log('i am good at vue')
})
hook.tap('node', data => {
  console.log('i am good at', data)
})
hook.call('node');