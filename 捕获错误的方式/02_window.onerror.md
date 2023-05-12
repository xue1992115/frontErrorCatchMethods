## window.onerror

> window.onerror 是浏览器事件，当**_JS 运行时_**发生错误但没有捕获的时候，就会触发它;
> window.onerror 和 try catch 都是捕获运行时错误
> 这是客户端记录错误并报告给服务器最简单的方法，也是 Sentry 的客户端 JavaScript 集成 (raven-js) 工作的主要机制之一

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  // ... handle error ...
  return false;
};
```

> 1. msg: 错误的信息
> 2. url: 发生错误的文件的地址
> 3. lineNo: 行号
> 4. columnNo: 列号
> 5. error: 错误对象

## window.onerror 参数的兼容性

![兼容性列表](/assets/02.png)
基本上大部分的浏览器都支持这些参数，IE8，9，10 还不支持列号和 errorObj；safari9 低版本的安卓浏览器不支持 errorObj

## window.onerror 能捕获的哪些错误呢？

1. EvalError

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
throw new EvalError("Hello", "someFile.js", 10);
```

![运行时的EvalError](/assets/05.png) 2. InternalError 语法错误

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
function loop(x) {
  if (x >= 1000000000000) return;

  // 做一些事情
  loop(x + 1);
}
loop(0);
```

![运行时的InternalError](/assets/06.png)  
3. RangeError

```js
function check(n) {
  if (!(n >= -500 && n <= 500)) {
    throw new RangeError("The argument must be between -500 and 500.");
  }
}
check(2000);
```

![运行时的RangeError](/assets/07.png)  
4. ReferenceError

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
add();
```

![运行时的RangeError](/assets/08.png)  
5. SyntaxError 语法错误

> 一般语法错误在语法检查阶段就被抛出了，这种是无法捕获的

```js
window.onerror = function(msg, url, lineNo, columnNo, error) {
            console.log(error, 'error');
            console.log(url, 'url');
            console.log(lineNo, 'lineNo');
            console.log(columnNo, 'columnNo');
            console.log(error, 'error');
    }
    // 语法错误可以捕获
    let name = 'Jartto;
```

> 运行时的语法错误可以捕获

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
// 这个语法错误捕获不了
// let name = 'Jartto;
// 这个可以捕获
const data = JSON.parse("");
```

![运行时的语法错误](/assets/03.png)  
6. TypeError 类型错误

> 类型错误也可以捕获

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
null.f();
```

![运行时的类型错误](/assets/04.png)  
7. URIError

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
decodeURIComponent("%");
```

总结：js 运行时的错误基本上都能被捕获  
8. 异步的错误

> 异步的错误可以捕获

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
setTimeout(() => {
  throw new Error("异步错误");
}, 0);
```

![运行时的异步错误](/assets/10.png)  
9. promise 的错误

> promise 的错误是捕获不到的

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
new Promise((revolve, reject) => {
  throw new Error("Promise 异常错误");
});
```

![运行时的promise错误](/assets/11.png)  
10. 网络的错误

> 不论是静态资源请求还是接口请求异常都捕获不到

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log(error, "error");
  console.log(url, "url");
  console.log(lineNo, "lineNo");
  console.log(columnNo, "columnNo");
  console.log(error, "error");
};
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
```
![运行时的接口请求错误](/assets/13.png)
```js
<img src="https://baidu.com/qpi/01.png" alt="" srcset="">
```
![运行时的资源请求错误](/assets/12.png)

11. 跨域Script error
> 也是捕获不到的

## 总结
1. window.onerror可捕获js运行时的错误
2. 异步的也可以捕获
3. promise错误无法捕获
4. 网络资源和接口请求，以及script error都无法捕获

## 参考文章
[window.onerror](https://blog.sentry.io/client-javascript-reporting-window-onerror/)
[如何优雅处理前端异常？（前端常见问题解决方案](https://www.finclip.com/news/f/115.html)