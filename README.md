# JSPatch-iOS-APP
JSPatch 是一个开源项目[Github链接](https://github.com/bang590/JSPatch)，只需要在项目里引入极小的引擎文件，就可以使用 JavaScript 调用任何 Objective-C 的原生接口，替换任意 Objective-C 原生方法。目前主要用于下发 JS 脚本替换原生 Objective-C 代码，实时修复线上 bug。

## BuglyHotfix简介
BuglyHotfix 基于 JSPatch 封装，完全兼容 JSPatch 编写的脚本文件。本文实例基于集成BuglyHotfix环境进行总结编写实例的。

## SDK集成
- 下载[Bugly iOS](https://bugly.qq.com/docs/release-notes/release-ios-hotfix/) 热更新 SDK
- 添加以下依赖库
     - SystemConfiguration.framework
     - Security.framework
     - JavascriptCore.framework
     - libz.tbd
     - libc++.tbd
     
## SDK初始化
- 在工程的AppDelegate.m文件导入头文件
     #import <BuglyHotfix/Bugly.h>
- 在工程AppDelegate.m的application:didFinishLaunchingWithOptions:方法中初始化BuglyHotfix，示例代码如下：
 
```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    BuglyConfig *config = [[BuglyConfig alloc] init];
    config.hotfixDebugMode = YES;
    [Bugly startWithAppId:@"e1d8b8f150"
#ifdef DEBUG
        developmentDevice:YES
#endif
                   config:config];
    
    return YES;
}
```

## 发布补丁
- 编写规则参见[JSPatch介绍](https://github.com/bang590/JSPatch);
- 将补丁文件main.js拖拽到工程内；
- 将本地测试通过的main.js文件压缩成zip，点击 Bugly 平台 热更新 功能的发布新补丁 (热更新菜单在应用升级模块下);
- 选择目标版本（即应用版本）及开发设备，其它按默认值进行下发；
- [iOS 热更新 SDK 使用指南](https://bugly.qq.com/docs/user-guide/instruction-manual-ios-hotfix/?v=20161125161608);

## 示例
```objc
 @interface ViewController : UIViewController

- (void)JSPatchWithParam:(NSString *)param;

@end
```
 
```objc
@interface ViewController ()

@property(nonatomic, strong) NSString *titleName;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)JSPatchWithParam:(NSString *)param
{

}

@end
```

```js
require('ViewController, UIColor')

defineClass("ViewController", ['totalCount'], {
        viewDidLoad: function() {
        
            self.ORIGviewDidLoad();
            var redColor = UIColor.redColor();
            self.view().setBackgroundColor(redColor);
            
            
            self.JSPatchWithParam("JSPatch 测试成功");
            
        },
    })


defineClass("ViewController", {
        JSPatchWithParam: function(param) {
            
            var alertView = require('UIAlertView').alloc().initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles("提示",param, self, "确定",  null);
            alertView.show()
            
        },
    })
```

## 运行效果
![alt tag](https://github.com/JackSteven/JSPatch-iOS-APP/blob/master/Simulator%20Screen%20Shot%202016%E5%B9%B412%E6%9C%8817%E6%97%A5%20%E4%B8%8B%E5%8D%883.22.56.png "Simulator png")
