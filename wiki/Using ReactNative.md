# Using ReactNative

[ReactNative中文社区官网](https://reactnative.cn/docs/getting-started/)

## 安装环境

安装iOS和Android和原生开发环境略。

1. 安装node，为测试环境提供js的运行引擎，终端执行

   `brew install node`

   新版本中npm会随node一起安装，保证node版本在v10以上。切换npm镜像，终端执行

   `npx nrm use taobao`

   npm镜像可以认为是Android中的maven仓库或iOS中cocoapods在github中的仓库

2.  安装watchman，监控本地文件变化做到hot reload，终端执行

   `brew install watchman`

3. 安装yarn，功能与npm相同，但是执行速度更快，终端执行

   `npm install -g yarn`

4. 最新的RN版本已经不需要命令行工具`react-native-cli`，如果安装了，终端执行卸载

   `npm uninstall -g react-native-cli`

5. 现有原生应用集成RN，混合开发模式，参考[集成到现有原生应用](https://reactnative.cn/docs/integration-with-existing-apps/)

## 使用命令行创建新的RN项目

终端执行 `npx react-native init CodePush`，创建一个ReactNative项目。其中CodePush为项目名称

iOS pod安装失败报错，参考[解决方法](https://www.jianshu.com/p/58660bd281e3)或者关闭代理

> Fetching podspec for `glog` from `../node_modules/react-native/third-party-podspecs/glog.podspec`
> [!] CDN: trunk URL couldn't be downloaded: https://raw.githubusercontent.com/CocoaPods/Specs/master/Specs/6/7/d/boost-for-react-native/1.63.0/boost-for-react-native.podspec.json, error: Failed to open TCP connection to raw.githubusercontent.com:443 (Connection refused - connect(2) for "raw.githubusercontent.com" port 443)

## 运行项目

1. 分别使用各自的IDE运行，如Xcode或Android Studio
2. 使用命令行工具

- `yarn ios` 运行iOS
- `yarn android` 运行Android

## 运行效果

- iOS

  <img src="https://github.com/jinaiyuanbaojie/codepush-guide/tree/master/images/RNiOS.png" alt="RNiOS" style="zoom:33%;" />

- Android

  <img src="https://github.com/jinaiyuanbaojie/codepush-guide/tree/master/images/RNandroid.png" alt="RNandroid" style="zoom:33%;" />
