```js
const log = (store) => (next) => (action) => {
  console.log("dispatch", action);

  let res = next(action);

  console.log("next state", store.getState());

  return res;
};

function log(store) {
  return function (next) {
    return function (action) {
      console.log("dispatch", action);

      let res = next(action);

      console.log("next state", store.getState());

      return res;
    };
  };
}

function applyMiddleware(store, middlewares) {
    let ms = middlewares.slice()
    ms.reverse()

    let dispatch = store.dispatch()

    ms.forEach(v => {
        dispatch = v(store)(dispatch)
    })
    return {
        ...store,
        dispatch
    }
}
```