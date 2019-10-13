class SyncWaterFullHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, cb) {
    this.tasks.push(cb);
  }
  call(...rest) {
    const  [fisrtCallback, ...others] = this.tasks;
    const ret = fisrtCallback(...rest);
    others.reduce((prev, curr) => {
      return curr(prev);
    }, ret)

  }
}
let hook = new SyncWaterFullHook(['name']);
hook.tap('vue', name => {
  console.log('i am good at vue')
  return 'node'
})
hook.tap('node', data => {
  console.log('i am good at', data)
  return 'react'
})
hook.tap('react', data => {
  console.log('i am good at', data)
})
hook.call('vue');