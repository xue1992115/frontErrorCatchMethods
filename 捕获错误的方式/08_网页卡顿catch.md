## 页面崩溃和卡顿
> 卡顿也就是网页暂时响应比较慢， JS 可能无法及时执行。但崩溃就不一样了，网页都崩溃了，JS 都不运行了，还有什么办法可以监控网页的崩溃，并将网页崩溃上报呢？
崩溃和卡顿也是不可忽视的，也许会导致你的用户流失。
1. 
```js
1. 利用 window 对象的 load 和 beforeunload 事件实现了网页崩溃的监控。不错的文章，推荐阅读：Logging Information on Browser Crashes。

window.addEventListener('load', function () {
  sessionStorage.setItem('good_exit', 'pending');
  setInterval(function () {
  sessionStorage.setItem('time_before_crash', new Date().toString());
  }, 1000);
});

window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('good_exit', 'true');
});

if(sessionStorage.getItem('good_exit') &&
sessionStorage.getItem('good_exit') !== 'true') {
  /*

  insert crash logging code here

  */
  alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}
```
2. 我们可以使用 Service Worker 来实现网页崩溃的监控：
> Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；
Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 SW 发送消息。