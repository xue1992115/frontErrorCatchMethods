## vue提供了全局的错误处理函数
```js
Vue.config.errorHandler = (err, vm, info) => {

console.error('通过vue errorHandler捕获的错误');

console.error(err);

console.error(vm);

console.error(info);

}
```