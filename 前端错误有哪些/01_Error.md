## 常见的前端的错误
> 1. js的语法错误和代码异常
> 2. 加载静态资源异常
> 3. 请求接口异常：Ajax、Fetch、websocket
> 4. Promise处理错误
> 5. 框架错误：React、Vue、Angular
> 6. Iframe异常
> 7. 跨域Script error
> 8. 页面崩溃和卡顿
## 1.js错误
### Error
> 代码 ***运行时*** 错误产生时，Error对象会被抛出
### Error信息
Error是一个对象，包含了一下的信息
```js
try {
    var e = new Error('Could not parse input');
    throw e;
} catch (e) {
    console.log(e.columnNumber) // 发生错误文件的列号
    console.error(e.message); // 发生错误信息
    console.error(e.name); // error 类型的名称。初始值为"Error".
    console.error(e.fileName); // 发生错误的文件名
    console.error(e.lineNumber); // 发生错误文件的行号 
    console.error(e.stack, 'stack')  // 函数调用栈  
}
```
### js常见的错误类型
#### EvalError
> eval全局函数执行时报错的错误
```js
try {
  throw new EvalError("Hello", "someFile.js", 10);
} catch (e) {
  console.log(e instanceof EvalError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "EvalError"
  console.log(e.fileName); // "someFile.js"
  console.log(e.lineNumber); // 10
  console.log(e.columnNumber); // 0
  console.log(e.stack); // "@Scratchpad/2:2:9\n"
}
```
#### InternalError
> InternalError 对象表示出现在 JavaScript 引擎内部的错误。通常描述某种数量过多的情况，
1. "too many switch cases"（过多 case 子句）；
2. "too many parentheses in regular expression"（正则表达式中括号过多）；
3. "array initializer too large"（数组初始化器过大）；
4. "too much recursion"（递归过深）
```js
function loop(x) {
  if (x >= 1000000000000) return;

  // 做一些事情
  loop(x + 1);
}
loop(0);
```
#### RangeError
> 创建一个 error 实例，表示错误的原因：数值变量或参数超出其有效范围。
```js
function check(n) {
  if (!(n >= -500 && n <= 500)) {
    throw new RangeError("The argument must be between -500 and 500.")
  }
}
try {
  check(2000);
} catch (error) {
  if (error instanceof RangeError) {
    // 处理错误
  }
}
```
#### ReferenceError
> ReferenceError（引用错误）对象代表当一个不存在（或尚未初始化）的变量被引用时发生的错误。
```js
try {
  let a = undefinedVariable
} catch (e) {
  console.log(e instanceof ReferenceError)  // true
  console.log(e.message)                    // "undefinedVariable is not defined"
  console.log(e.name)                       // "ReferenceError"
  console.log(e.fileName)                   // "Scratchpad/1"
  console.log(e.lineNumber)                 // 2
  console.log(e.columnNumber)               // 6
  console.log(e.stack)                      // "@Scratchpad/2:2:7\n"
}
```
#### SyntaxError
> 尝试解析不符合语法的代码的错误
```js
try {
    // 语法错误
    eval("hoo bar");
  } catch (e) {
    console.error(e instanceof SyntaxError);
    console.error(e.message);
    console.error(e.name);
    console.error(e.fileName);
    console.error(e.lineNumber);
    console.error(e.columnNumber);
    console.error(e.stack);
  }
```
#### TypeError
> 类型错误，传入的变量类型非执行的类型报错
```js
try {
    null.f()
  } catch (e) {
    console.log(e instanceof TypeError) // true
    console.log(e.message) // "null has no properties"
    console.log(e.name) // "TypeError"
    console.log(e.fileName) // "Scratchpad/1"
    console.log(e.lineNumber) // 2
    console.log(e.lineNumber) // 2
    console.log(e.lineNumber) // 2
    console.log(e.columnNumber) // 2
    console.log(e.stack) // "@Scratchpad/2:2:3\n"
  }
```
#### URIError
> URIError 对象用来表示以一种错误的方式使用全局 URI 处理函数而产生的错误。
```js
try {
    decodeURIComponent('%')
  } catch (e) {
    console.log(e instanceof URIError)  // true
    console.log(e.message)              // "malformed URI sequence"
    console.log(e.name)                 // "URIError"
    console.log(e.fileName)             // "Scratchpad/1"
    console.log(e.lineNumber)           // 2
    console.log(e.columnNumber)         // 2
    console.log(e.stack)                // "@Scratchpad/2:2:3\n"
  }
```
## 2.加载静态资源异常
> 资源错误指：js、图片、css等静态资源加载异常
> 如果网络波动或者资源服务器异常，会导致资源加载失败，例如下面截图是加载异步组件失败日志，如果不捕获该异常，可能会出现白屏。
```js
<img src="http://localhost:9000/index.png" />
window.addEventListener('error', function(event) { 
    console.log("addEventListener", event)
}, true)
```
## 3.请求接口异常：Ajax、Fetch、websocket
接口请求异常分为两种：
> 1. 网络中断异常  
> 可跳转到网络异常页面，提示用户检查网络并重试
> 2. 服务端返回状态非200的业务异常  
> 如果服务端返回404,500,401等异常，可使用拦截器对异常统一处理，但是记得把处理不了的异常reject出去
## 4.Promise处理错误
> 当Promise调用reject，但调用方没声明catch,，会抛出UnHandledRejection异常，类似下面截图

![这是图片](/assets/01.png)

> 正确的方法，可以给promise定义catch捕获
```js
const myPromise = new Promise((resolve, reject) => {
    reject('异常数据')
    // 获取throw异常，也可以被catch方法捕获
    // throw('throw的异常')
})

myPromise.catch(err => {
    console.log(err) // 打印 "异常数据"
})
```
> 但是给每一个都进行捕获就不太合理，可以定义全局监听unhandledrejection捕获异常，做兜底操作。
```js
 window.addEventListener('unhandledrejection', (e) => {
    console.log(e.reason); // 得到promise reject的数据
    e.preventDefault() // 停止异常继续打印
  });
```
## 5.框架错误：React、Vue
> Vue框架提供处理errorHandler函数收集组件渲染函数和侦听器执行期间抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和相应的应用实例。
```js
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}

import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(async () => {
        throw new Error('组件内抛出异常')
    })
  },
};
```
> errorHandler接收的异常信息
```js
Error: 组件内抛出异常
    at _callee2$ (HelloWorld.vue?fdab:46:1)
    at tryCatch (runtime.js?96cf:63:1)
    at Generator.invoke [as _invoke] (runtime.js?96cf:293:1)
    at Generator.eval [as next] (runtime.js?96cf:118:1)
    at asyncGeneratorStep (asyncToGenerator.js?1da1:3:1)
    at _next (asyncToGenerator.js?1da1:25:1)
    at eval (asyncToGenerator.js?1da1:32:1)
    at new Promise (<anonymous>)
    at eval (asyncToGenerator.js?1da1:21:1)
    at callWithErrorHandling (runtime-core.esm-bundler.js?5c40:154:1) Proxy {…}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false 'mounted hook' 'errorHandler'

```
>  React 实现了所谓的错误边界。错误边界是 React 组件，它“捕获子组件树中的任何地方的 JavaScript 错误”，同时还记录错误并显示回退用户界面。
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // 展示出错的UI
    this.setState({ hasError: true });
    // 将错误信息上报到日志服务器
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // 可以展示自定义的错误样式
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
> 但是需要注意的是， error boundaries 并不会捕捉下面这些错误：
>
> 1. 事件处理器
> 2. 异步代码
> 3. 服务端的渲染代码
> 4. 在 error boundaries 区域内的错误
我们可以这样使用 ErrorBoundary：
```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary
```
## 6.Iframe异常
> 对于 iframe 的异常捕获，我们还得借力 window.onerror：
```js
window.onerror = function(message, source, lineno, colno, error) {
console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```
## 7.跨域Script error
> 一般情况，如果出现 Script error 这样的错误，基本上可以确定是出现了跨域问题。这时候，是不会有其他太多辅助信息的，但是解决思路无非如下：
1. 跨源资源共享机制( CORS )：我们为 script 标签添加 crossOrigin 属性。
2. 动态去添加 js 脚本：
```js
const script = document.createElement('script');

script.crossOrigin = 'anonymous';

script.src = url;

document.body.appendChild(script);
// 特别注意，服务器端需要设置：Access-Control-Allow-Origin
```
## 8.页面崩溃和卡顿
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
## 参考文章
[浅谈前端常见监控错误类型、错误收集](https://juejin.cn/post/7121521490142429214)  
[如何优雅处理前端异常？（前端常见问题解决方案](https://www.finclip.com/news/f/115.html)
[常见的前端异常处理](https://juejin.cn/post/7048450212431396878#heading-8)
[前端异常处理总结](https://juejin.cn/post/7089990575490859039#heading-8)

