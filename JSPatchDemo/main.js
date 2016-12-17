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
