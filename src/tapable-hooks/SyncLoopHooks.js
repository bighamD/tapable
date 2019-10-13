class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, cb) {
    this.tasks.push(cb);
  }
  call(...rest) {
    this.tasks.forEach(task => {
      do {
        var ret = task(...rest);
      } while (ret === undefined);
    })
  }
}

var hook = new SyncLoopHook(['name']);
var index = 0;
hook.tap('vue', data => {
  index ++;
  console.log(`学了${index}次vue`);
  if (index > 3) {
    return `学了${index}次vue`;
  }
})
hook.tap('node', data => {
  console.log('i am good at', data);
  return 'node学习了'
})
hook.call('node');