## react提供了componentDidCatch
```js
// 封装ErrorBoundary的高阶组件
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
```js
// 在项目中使用
<ErrorBoundary>
  <App />
</ErrorBoundary>
```
> 但是需要注意的是， error boundaries 并不会捕捉下面这些错误：
>
> 1. 事件处理器
> 2. 异步代码
> 3. 服务端的渲染代码