# codepush-guide
Wiki for Using CodePush

## 移动端开发技术选型

业界**大前端**的概念呼声很大，但是炒作和概念居多，没有看到任何成熟的产品。但是聚焦到移动端的跨平台技术，还是有很多不错的方案：

- **原生开发**

  优点：**性能最优**，可以利用各自平台的API，如蓝牙、相机等等。从业人员多，仍然也一直是**主流**的开发方式

  缺点：**很难做到热更新**，如果添加新功能需要发布新版本，~~维护开发成本高~~。

- **HyBird**

  优点：利用移动端WebView展示H5，**动态能力最强**，一套代码两端复用

  缺点：**性能较差**，用户体验不好。有一定的学习成本，javascript容易写出不易维护的代码

- **ReactNative**

  优点：利用javascript开发，原生渲染，具有**友好的开发体验**，同时保证了性能接近原生应用。在一定程度上，可以做到热更新

  缺点：除了原生的开发技能，还需使用的其他技术栈：`javascript` `node` `react` `redux` `flex` `npm` `babel` ，**学习曲线过于陡峭**。想要精通很难，遇到棘手问题很难排查解决。

- **Flutter**

  优点：基于Skia绘制引擎，**自建UI系统**。脱离了原生平台，比RN更加独立。技术栈相对不复杂，性能更强。

  缺点：目前Dart语言还是编译成机器码，**无法做到热更新**

  

**没有免费的午餐**，像ReactNative这样的跨平台技术，虽然可以做到热更新、解放一定的生产力。但也有如下**问题**需要注意：

1. 有了热更新，不代表可以一直不发版本，如下场景都需要**升级应用**
   - 要利用新原生的能力
   - ReactNative引入新的npm第三方库且该库含有native code
   - 集成了新的SDK
   - 适配新的Android和iOS系统
2. 因为通过网络下载补丁包，热更新肯定有一定的概率会**失败**
3. 遇到问题需要**花费更多的时间解决**，甚至很难解决
4. 跨平台绝对不代表50%的人力成本节约，个人经验节省**至多30%左右**
5. 对团队要求高，学习曲线陡峭
6. 不是纯粹的RN项目集成有一定难度，**混合应用维护成本高**



**总结**

1. 原生仍是王道
2. 热更新其实更应该是**热修复**
3. 跨平台的技术具有学习价值，可以开阔思路



## 热更新方案

热更新的主流方案有**ReactNative**和**H5**两种。热更新一直是苹果官方所禁止的，使用ReactNative存在较低的风险被拒。由于H5的方式比较简单、易于理解，下面主要介绍如何利用ReactNative实现热更新

### ReactNative

1. [ReactNative技术栈简述](https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/wiki/Hello%20ReactNative.md)
2. [搭建ReactNative开发环境](https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/wiki/Using%20ReactNative.md)
3. [CodePush集成](https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/wiki/Using%20CodePush.md)

### H5

H5的热更新不再详述，这与用浏览器打开网页的场景是等价的。只需将前端重新发版部署，客户端即可使用新功能。

<img src="https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/images/h5.jpg" alt="h5" style="zoom:50%;" />

## 示例开发环境

所有示例均在MacOS Catalina v10.15.3 系统下进行。

- `node` v12.3.1
- `npm` v6.4.1
- `Android Studio` v3.5.3
- `gradle` v5.4.1
- `jdk` 1.8
- `Xcode` v11.3.1
- `cocoapods` v1.8.4
- `ruby` 2.6.3p62

