## try catch
### 用法    
```js
try {
    add()
} catch (error) {
    console.log(error);
}
```
### 基础的语法
```js
try {
    try_statements
 }
 [catch (exception_var_1 if condition_1) { // non-standard
    catch_statements_1
 }]
 ...
 [catch (exception_var_2) {
    catch_statements_2
 }]
 [finally {
    finally_statements
 }]
```
1. try_statements
> 需要被执行的语句
2. catch_statements_1, catch_statements_2
> try块中有异常抛出时执行的代码
3. exception_var_1, exception_var_2
> 用于保存关联catch子句的异常对象的标识符。
4. condition_1
> 一个条件语句
5. finally_statements
> 在try语句块之后执行的语句块。无论是否有异常抛出或捕获这些语句都将执行。
6. 语句的组成部分，一个或者多个语句组成的try块，和至少一个catch块或者一个finally块的其中一个，或者两个兼有，下面是三种形式的try声明：
```js
try...catch
try...finally
try...catch...finally
```
### 捕获异常的规则
 1. 在嵌套的语句块中，如果try语句块中没有对应的catch语句，就会被外边包裹的catch捕获
 2. 如果try块中抛出错误，那么try块报错内容后边的代码就不执行了
 ```js
 try {
   add() // 错误行，后续的不再执行了
   console.log('hanahn');
   try {
      // 如果上边没有抛出错误，那么这行代码的错误会被外边的catch捕获
      bbb()
   } finally {

   }
} catch (error) {
   console.log(error);
}
console.log('hanah '); // 这行代码还会执行
 ```
 3. 无条件catch
 抛出任何的异常都会进入到catch子块中
 catch(e) e标识符号是有throw语句执行的值

 4. 条件catch块
 就是可以创建一个或者多个子catch块处理特定异常
 > try块中会抛出三种异常:
* TypeError: 类型错误，值的类型不是预期的类型就会抛错误
* RangeError: 值的范围错误，值不在指定的范围
* EvalError: 是eval全局函数的错误
```js
// 注意：这个功能不符合ECMAscript规范
try {
    myroutine(); // may throw three types of exceptions
} catch (e if e instanceof TypeError) {
    // statements to handle TypeError exceptions
} catch (e if e instanceof RangeError) {
    // statements to handle RangeError exceptions
} catch (e if e instanceof EvalError) {
    // statements to handle EvalError exceptions
} catch (e) {
    // statements to handle any unspecified exceptions
    logMyErrors(e); // pass exception object to error handler
}
```
 5. finally块
 > finally块是在try 和catch之后，一定会执行

### demo
```js
try {
   try {
     throw new Error("oops");
   }
   finally {
     console.log("finally");
   }
 }
 catch (ex) {
   console.error("outer", ex.message);
 }
```
> 输出内容：

> finally

> outer oops
```js
try {
  try {
    throw new Error("oops");
  }
  catch (ex) {
    console.error("inner", ex.message);
  }
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}

```
> 输出内容：

> inner oops

> finally

```js
try {
  try {
    throw new Error("oops");
  }
  catch (ex) {
    console.error("inner", ex.message);
    throw ex;
  }
  finally {
    console.log("finally");
  }
}
catch (ex) {
  console.error("outer", ex.message);
}
```

> 输出内容：

> inner oops

> finally

> outer oops

> ⚠️ 任何给定的异常只会被离它最近的封闭 catch 块捕获一次。

### try catch 不能捕获的错误
> try catch只能捕获代码常规的运行时的错误，语法错误和异步错误捕获不到
1. 语法错误不能捕获
> 原因是：语法错误在语法检查阶段就报错了，还没有到运行阶段
```js
try {
  a.
} catch (error) {
  console.log(`捕获到的错误：${error}`);
}
try {
  const notdefined;
} catch (error) {
  console.log(`捕获到的错误：${error}`);
}
```
2. 异步无法捕获
> 因为setTimeout是异步执行的，try catch是同步执行的代码，等到setTimeout里边的事件进入事件队列的时候，主线程已经离开了try catch，所以try catch是无法捕获异步函数的错误的。
```js
try {
  setTimeout(() => {
    throw new Error('异步错误')
  }, 0)
} catch (error) {
  console.log(`捕获到的错误：${error}`);
}
```
3. promise异常无法捕获
> promise的异常也是无法捕获的，对于promise构造函数的异常只能被自带的 reject 也就是.catch 函数捕获到。
```js
try {
  new Promise((revolve, reject) => {
    throw new Error('Promise 异常错误')
  })
} catch (error) {
  console.log(`捕获到的错误：${error}`);
}
```
> 如果想捕获Promise异常
```js
async function fn() {
  try {
    await new Promise((revolve, reject) => {
      throw new Error('Promise 异常错误')
    })
  } catch (error) {
    console.log(`捕获到的错误：${error}`);
  }
}
fn()
```
> 这次Promise异常能被捕获到,是因为async和await,正常不加async,await的时候,执行promise后,在等待promise回调的时候,try,catch已经执行完了,所以捕获不到,然而加了async和await后,try,catch必须等promise的回调执行完后,才能继续往下走,这个时候trycatch没执行完,promise抛出异常,自然而然能被catch捕获到

```js
async function fn() {
  try {
      await new Promise(() => {
          throw new Error('new promise throw error');
      }).catch(error=>{
          console.log('.catch',error);
      })
  } catch (error) {
    console.log(`捕获到的错误：${error}`);
  }
}
fn()
```
> Promise异常,如果写了.catch,就会被优先.catch捕获到,如果没有,那么就会被try,catch捕获到

### 补充 try catch中的return
try catch中的return相当是是函数的return；
如果finall中有return那就是函数的return值，如果没有
才是try或者catch中的return
```js
function fn() {
  try {
    add()
    return '1'
  } catch (error) {
    console.log(`捕获到的错误：${error}`);
    return '2'
  } finally {
    console.log('finally');
    return '3'
  }
}
const res = fn()
console.log(res);
```

## 总结
1. try catch 可以捕获js运行时的错误
2. 异步的错误无法捕获
3. promise抛出的错误无法捕获
## 参考文章
[trycatch 不能捕获运行时异常_面试官：用一句话描述 JS 异常是否能被 try catch 捕获到 ?](https://juejin.cn/post/7021889887615844360)