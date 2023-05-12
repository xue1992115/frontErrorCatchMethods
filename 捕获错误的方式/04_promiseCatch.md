## promise 的异常捕获

1. promise 的异常需要在 promise 带的 catch 中进行捕获

```js
new Promise((revolve, reject) => {
  throw new Error("Promise 异常错误");
}).catch((error) => {
  console.log(error);
});
```

![promise异常捕获](/assets/17.png) 2. 或者改为同步函数在 try catch 中捕获

```js
async function fn() {
  try {
    await new Promise((revolve, reject) => {
      throw new Error("Promise 异常错误");
    });
  } catch (error) {
    console.log(`捕获到的错误：${error}`);
  }
}
fn();
```

3. 对于没有 catch 语句的异常如何捕获呢？
   > 增加一个全局的对 unhandledrejection 事件的监听，全局监听 Uncaught Promise Error。

```js
window.addEventListener("unhandledrejection", function (e) {
event.preventDefault();
  console.log(e);
});
new Promise((revolve, reject) => {
  throw new Error("Promise 异常错误");
});
```
> unhandledrejection事件监听的是PromiseRejectionEvent，监听的事件信息如下：
![promise异常捕获](/assets/18.png)

> 补充：从上图也可以看出控制台还有有error信息提示，需要添加event.preventDefault();
![promise异常捕获](/assets/19.png)

