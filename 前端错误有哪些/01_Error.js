// demo1
// try {
//     var e = new Error('Could not parse input');
//     throw e;
// } catch (e) {
//     console.log(e.columnNumber) // 0
//     console.error(e.message);
//     console.error(e.name);
//     console.error(e.fileName);
//     console.error(e.lineNumber);
//     console.error(e.columnNumber);
//     console.error(e.stack)   
// }
// demo2
// try {
//     eval("hoo bar");
//   } catch (e) {
//     console.error(e instanceof SyntaxError);
//     console.error(e.message);
//     console.error(e.name);
//     console.error(e.fileName);
//     console.error(e.lineNumber);
//     console.error(e.columnNumber);
//     console.error(e.stack);
//   }

// demo3
// try {
//     null.f()
//   } catch (e) {
//     console.log(e instanceof TypeError)  // true
//     console.log(e.message)               // "null has no properties"
//     console.log(e.name)                  // "TypeError"
//     console.log(e.fileName)              // "Scratchpad/1"
//     console.log(e.lineNumber)            // 2
//     console.log(e.columnNumber)          // 2
//     console.log(e.stack)                 // "@Scratchpad/2:2:3\n"
//   }
// demo4
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