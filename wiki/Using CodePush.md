# CodePush简介与集成

CodePush是由微软出品的，用于动态下发代码完成热更新的一套生态产品。其稳定性有保障，被业界广泛采用，官方也一直在积极的维护更新。CodePush的主要工具和其用途如下：

1. CodePush Server：托管和下发补丁包，管理我们的应用信息以及热更新的配置，是由微软维护的服务器
2. CodePush SDK：移动需要集成的SDK，提供JS，Android，iOS三端代码，根据配置与CodePush Server通信，下载管理补丁包
3. CodePush Client：安装到本地的命令行工具，可以与CodePush Server通信，管理应用信息、打包上传发布补丁

<img src="https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/images/codepush.jpg" alt="codepush" style="zoom:50%;" />

CodePush热更新的思路是下载最新的代码和资源到手机的指定目录，然后通过ReactNative引擎重新加载代码完成热更新。业内主流的方案是[**CodePush**](https://github.com/Microsoft/react-native-code-push)。关于CodePush的集成文档可以参考：

- [官方文档](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/)
- 中文博客
  - [segmentfault](https://segmentfault.com/a/1190000009642563#item-4-4)
  - [掘金](https://juejin.im/post/5d0b05acf265da1bc5526908)

## CodePush命令行安装

安装codepush命令行工具，在终端执行如下命令即可：

 `npm install -g code-push-cli`

## CodePush Server注册应用

1. 使用命令行指令完成注册。在终端输入如下指令，会自动打开浏览器

    `code-push register`

   选取任意方式完成注册，获取token

2. 将获取的token，复制到终端

   ```shell
   jinaiyuan$ code-push register
   Please login to Mobile Center in the browser window we've just opened.
   
   Enter your token from the browser:  ac6a0ec7d7621bba32adbde3b224ec2a905591d5
   
   Successfully logged-in. Your session file was written to /Users/jinaiyuan/.code-push.config. You can run the code-push logout command at any time to delete this file and terminate your session.
   ```

3. 分别向服务器注册iOS和Android应用

   - Android `code-push app add CodePush-Android android react-native`，其中**CodePush-Android**为应用的名称

     ```shell
     jinaiyuan$ code-push app add CodePush-Android android react-native
     Successfully added the "CodePush-Android" app, along with the following default deployments:
     ┌────────────┬────────────────────────────────────────┐
     │ Name       │ Deployment Key                         │
     ├────────────┼────────────────────────────────────────┤
     │ Production │ I8ShazZNFleHtAggMrHAlZHkyG9-KDW_so5tm5 │
     ├────────────┼────────────────────────────────────────┤
     │ Staging    │ iGkfEvGhcoVprYcexxzV-bk0UlxG7PAT3G4Io  │
     └────────────┴────────────────────────────────────────┘
     ```

   - iOS `code-push app add CodePush-iOS ios react-native`，其中**CodePush-iOS**为应用的名称

     ```shell
     jinaiyuan$ code-push app add CodePush-iOS ios react-native
     Successfully added the "CodePush-iOS" app, along with the following default deployments:
     ┌────────────┬────────────────────────────────────────┐
     │ Name       │ Deployment Key                         │
     ├────────────┼────────────────────────────────────────┤
     │ Production │ _hV1POnwGqTDUCrBckXIsCheeuuCSAaQcVI1r7 │
     ├────────────┼────────────────────────────────────────┤
     │ Staging    │ x4U38_JsndFp5Wib-fAbiIm4hgWAxeDUpAvLf  │
     └────────────┴────────────────────────────────────────┘
     ```

4. 查看已注册应用 `code-push app ls`

   ```shell
   jinaiyuan$ code-push app ls
   ┌──────────────────┬─────────────────────┐
   │ Name             │ Deployments         │
   ├──────────────────┼─────────────────────┤
   │ CodePush-Android │ Staging, Production │
   ├──────────────────┼─────────────────────┤
   │ CodePush-iOS     │ Staging, Production │
   └──────────────────┴─────────────────────┘
   ```

   Staging和Production相当于Android的构建变体和iOS的Configrutions.

   - Staging：指预发布环境
   - Production: 生产环境

   开发和测试环境下是官方刻意没有配置，否则更新补丁可能会影响正常的开发测试。Staging这一配置可以认为是专门用来在上线前做测试的。

## CodePush Mobile SDK集成

### iOS SDK集成

1. 在项目的根目录下执行`npm install --save react-native-code-push`

2. 切换到iOS工程目录，执行`pod install`

3. 打开编辑`AppDelegate.m`，如果是Swift也类似不做展示

   - 导入头文件`#import <CodePush/CodePush.h>`
   - 替换生产模式下加载jsbundle的加载逻辑

   ```objective-c
   - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
   {
   #if DEBUG
     return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
   #else
   //  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
     return [CodePush bundleURL];
   #endif
   }
   ```

4. 将申请的**Deployment key** 添加到 `Info.plist`，其中plist文件中的key为**CodePushDeploymentKey**。

   因为有Staging和Production两个**Deployment key**，所以最好在自动构建系统中通过命令行根据配置自动切换key，也可以参考[iOS Add User-Defined Setting](https://segmentfault.com/a/1190000009642563#item-4-4)。


### Android

1. 在项目的根目录下执行`npm install --save react-native-code-push`，iOS和Android只需要执行一次

2. 在主工程的`build.gradle`脚本中，找到`react.gradle`的导入代码。在其下面添加导入`codepush.gradle`

   ```groovy
   ...
   apply from: "../../node_modules/react-native/react.gradle"
   apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
   ...
   ```

3. 编辑`MainApplication.java`

   ```java
   ...
   // 1. Import the plugin class.
   import com.microsoft.codepush.react.CodePush;
   public class MainApplication extends Application implements ReactApplication {
       private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
           ...
           // 2. Override the getJSBundleFile method in order to let
           // the CodePush runtime determine where to get the JS
           // bundle location from on each app start
           @Override
           protected String getJSBundleFile() {
               return CodePush.getJSBundleFile();
           }
       };
   }
   ```

4. 添加**Deployment key**

   ```xml
   <resources>
        <string name="app_name">AppName</string>
        <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string>
    </resources>
   ```

   与iOS类似，利用gradle或者自动构建脚本根据配置，自动替换**Deployment key**

### JS集成

1. 导入codepush库 `import codePush from 'react-native-code-push';`

2. 集成代码如下：

   ```jsx
   let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
   
   class MyApp extends Component {
     onButtonPress() {
       codePush.sync({
         updateDialog: true,
         installMode: codePush.InstallMode.IMMEDIATE,
       });
     }
   
     render() {
       return (
         <View style={styles.center}>
           <TouchableOpacity onPress={this.onButtonPress}>
             <Text style={styles.button}>Check for updates</Text>
           </TouchableOpacity>
           <Text style={styles.version}>Version 1.0.0</Text>
         </View>
       );
     }
   }
   
   const styles = StyleSheet.create({
     button: {
       color: 'skyblue',
       fontWeight: 'bold',
       fontSize: 20,
       margin: 30,
     },
     version: {
       color: 'blue',
       fontWeight: 'bold',
       fontSize: 30,
     },
     center: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
   });
   
   AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(MyApp));
   ```

## 构建补丁

1. 修改JS代码版本号显示为1.0.1

   ```jsx
   <View style={styles.center}>
       <TouchableOpacity onPress={this.onButtonPress}>
         <Text style={styles.button}>Check for updates</Text>
       </TouchableOpacity>
       <Text style={styles.version}>Version 1.0.1</Text>
   </View>
   ```

2. 切换到RN的根目录下，构建发布补丁，终端输入

    `code-push release-react CodePush-Android android --d Production`

   默认发布到Staging，添加参数`--d Production` 发布到生产环境。

3. 查看补丁发布和安装情况，终端输入

   `code-push deployment list CodePush-Android`

   ```shell
   jinaiyuan$ code-push deployment list CodePush-Android
   ┌────────────┬─────────────────────────────┬──────────────────────┐
   │ Name       │ Update Metadata             │ Install Metrics      │
   ├────────────┼─────────────────────────────┼──────────────────────┤
   │ Production │ Label: v1                   │ Active: 50% (1 of 2) │
   │            │ App Version: 1.0            │ Total: 1             │
   │            │ Mandatory: No               │                      │
   │            │ Release Time: 3 minutes ago │                      │
   │            │ Released By:                │                      │
   ├────────────┼─────────────────────────────┼──────────────────────┤
   │ Staging    │ Label: v1                   │ No installs recorded │
   │            │ App Version: 1.0            │                      │
   │            │ Mandatory: No               │                      │
   │            │ Release Time: 6 minutes ago │                      │
   │            │ Released By:                │                      │
   └────────────┴─────────────────────────────┴──────────────────────┘
   ```

## 展示效果

1. 安装apk

   <img src="https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/images/codepush-old.jpg" alt="codepush-old" style="zoom:20%;" />

2. 点击按钮检查升级（也支持自动检测）

   <img src="https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/images/code-dialog.jpg" alt="code-dialog" style="zoom:20%;" />

3. 新版本界面

   <img src="https://github.com/jinaiyuanbaojie/codepush-guide/blob/master/images/codepush-new.jpg" alt="codepush-new" style="zoom:20%;" />
