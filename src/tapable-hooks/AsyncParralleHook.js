class AsyncParralleHook {
  constructor(args) {
    this.tasks = [];
  }
  tapPromise(name, cb) {
    this.tasks.push(cb);
  }
  promise(...rest) {
    let promiseTasks = this.tasks.map(task => task(...rest));
    return Promise.all(promiseTasks);
  }
}

var hook = new AsyncParralleHook(['name'])
hook.tapPromise('vue', function (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('im learning vue')
      resolve('vue');
    }, 1000);
  })
});
hook.tapPromise('node', function (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('im learning node')
      resolve('node');
    }, 1000);
  })
});
hook.promise('react').then(data => {
  console.log(data);
})