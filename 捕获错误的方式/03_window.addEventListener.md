## window.addEventListener

> 上一节学习 window.onerror 的时候对于一些请求资源的报错是捕获不了的，那么如何解决这种问题呢？

1. 在请求资源的添加 onerror 监听函数

```js
<script>
  function errorHandler(error) {
    console.log("捕获到静态资源加载异常", error);
  }
</script>
<script src="http://cdn.xxx.com/js/test.js" onerror="errorHandler(this)"></script>
<link rel="stylesheet" href="http://cdn.xxx.com/styles/test.css" onerror="errorHandler(this)">
```

![运行时的资源请求错误](/assets/14.png)

> 缺点：这样可以拿到静态资源的错误，但缺点很明显，代码的侵入性太强了，每一个静态资源标签都要加上 onerror 方法。   

2. 添加 window.addEventListener("error")
> 当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的onerror() 处理函数。这些 error 事件不会向上冒泡到 window ，不过（至少在 Firefox 中）能被单一的window.addEventListener 捕获。
> 由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。
```js
window.addEventListener('error', (error) => {
console.log('捕获到异常：', error);
// 必须设置为true, 否则就无法捕获到
}, true)
<script src="http://cdn.xxx.com/js/test.js"></script>
<link rel="stylesheet" href="http://cdn.xxx.com/styles/test.css">
```
![运行时的资源请求错误](/assets/15.png)
> window.addEventListener获取的错误信息获取的错误信息是events事件，包含了window.onerror中获取的信息
![window.addEventListener获取的错误信息](/assets/16.png)

