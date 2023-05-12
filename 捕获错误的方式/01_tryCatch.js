// demo1  
// try {
//     add()
// } catch (error) {
//     console.log(error);
// }

// demo2
// try {
//    add()
//    console.log('hanahn');
//    try {
//       bbb()
//    } finally {

//    }
// } catch (error) {
//    console.log(error);
// }
// console.log('hanah ');

// demo3
// try {
//    try {
//      throw new Error("oops");
//    }
//    finally {
//      console.log("finally");
//    }
//  }
//  catch (ex) {
//    console.error("outer", ex.message);
//  }

// demo4 语法错误不能捕获
// try {
//   a.
// } catch (error) {
//   console.log(`捕获到的错误：${error}`);
// }

// try {
//   const notdefined;
// } catch (error) {
//   console.log(`捕获到的错误：${error}`);
// }

// demo5 异步无法捕获
// try {
//   setTimeout(() => {
//     throw new Error('异步错误')
//   }, 0)
// } catch (error) {
//   console.log(`捕获到的错误：${error}`);
// }

// demo6 promise捕获
// try {
//   new Promise((revolve, reject) => {
//     throw new Error('Promise 异常错误')
//   })
// } catch (error) {
//   console.log(`捕获到的错误：${error}`);
// }

// async function fn() {
//   try {
//     await new Promise((revolve, reject) => {
//       throw new Error('Promise 异常错误')
//     })
//   } catch (error) {
//     console.log(`捕获到的错误：${error}`);
//   }
// }
// fn()

// 修改上边的代码
// async function fn() {
//   try {
//       await new Promise(() => {
//           throw new Error('new promise throw error');
//       }).catch(error=>{
//           console.log('.catch',error);
//       })
//   } catch (error) {
//     console.log(`捕获到的错误：${error}`);
//   }
// }
// fn()

// demo6 测试return 返回
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
