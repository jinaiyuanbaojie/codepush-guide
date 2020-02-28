# Hello ReactNative

ReactNative是有Facebook在2015开源发布的。最早是一群Facebook的Web前端工程师为了开发移动应用而主导研发的。所以ReactNative集成了很多Facebook既有的框架和工具，如

- React 目前前端最流行的开发框架之一与Vue并驾齐驱
- [Folly](https://github.com/facebook/folly)  C++基础库
- yoga C语言开发的支持flex布局的框架

同时由于RN的主力开发语言是js，顺理成章的使用了node和npm

- node 开发阶段js的运行环境
- npm 管理RN的第三方库

## ReactNative的逻辑架构

<img src="https://github.com/jinaiyuanbaojie/codepush-guide/tree/master/images/reactnative.jpg" alt="reactnative" style="zoom:50%;" />

1. React层类似于Commander，处理所有业务逻辑，如网络请求，数据加工，UI事件响应等。

2. Native层接受指令，根据JS bridge的传递的参数，在原生界面渲染UI。

3. JSBridge是双向通信的，

- Native -> React: 原生捕获到点击事件，传递给JS执行JS的函数
- React -> Native: React层由于数据或者状态改变虚拟DOM的节点属性，传递给原生重绘UI

## 常见问题汇总

1. 为什么真机调试RN应用，需要与开发电脑在同一个网络下？

   debug时，我们写的js代码会以node服务的形式运行于自己的开发电脑，同时开启8081端口。

   所以如果真机想执行js逻辑，必须通过网络与开发机器上的node服务通信。

   如果是模拟器肯定能访问到同一电脑下的node服务。

2. debug和release包有什么不同？

   release的js代码会压缩混淆，安装包更小。debug不会压缩混淆，这样是为了方便调试。

   release模式会将js代码打包成jsbundle，以静态资源的方式嵌入到应用中，随着应用一起发布。

   debug模式应用启动后会通过socket于node服务通信，app内没有任何js资源。

3. JSX语法是怎么被识别的？

   JSX肯定是不符合js规范的。在打包代码之前，会有JSX转换器，将其转换成等价语意的js代码。

4. `import` `export`关键字是什么？

   原生的js是不支持命名空间，这样会很危险。这两个关键字是为了支持命名空间。其实最后的代码都会编译成`es5`，也就是原生的js。这些关键字就像JSX语法一样，告诉了处理器`babel`如何控制变量的作用域。

5. 我需要使用Redux么？

   看业务的复杂程度和应用的规模，不建议为了用而用，如果数据流动很复杂适合用Redux。
