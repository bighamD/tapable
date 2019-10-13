class AsyncSeriseHook{
  constructor(...args) {
    this.tasks = []
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }
  promise(...rest) {
    let [firstCallback, ...otherCallbcaks] = this.tasks;
    let firstPromise = firstCallback(...rest);
    return otherCallbcaks.reduce((prvePromise, currPromise) => {
      return prvePromise.then((res) => currPromise(res))
    }, firstPromise);
  }
}

var hook = new AsyncSeriseHook(['name']);
hook.tapPromise('vue', function (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('im learning', data)
      resolve('vue');
    }, 1000);
  })
});
hook.tapPromise('node', function (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('im learning', data)
      resolve('node');
    }, 1000);
  })
});
hook.tapPromise('node', function (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('im learning', data)
      resolve();
    }, 1000);
  })
});
hook.promise('react').then(data => {
  console.log('done');
})