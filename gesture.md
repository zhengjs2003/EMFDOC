### 手势密码
EMF提供了手势密码控件的容器类GestureContentView，用于绘制手势密码,手势密码转换成数字密码，及手势密码的正确性验证。  

1）设置手势密码  
 
```   
mGestureContentView = new GestureContentView(this, false, "", new GestureDrawline.GestureCallBack() {
            @Override
            public void onGestureCodeInput(String inputCode, String spassNum) {
                            }

            @Override
            public void checkedSuccess(String inputCode) {

            }

            @Override
            public void checkedFail(String inputCode, String spassNum) {

            }
        });
```


2） 手势密码验证
 
```
 //传入旧的密码gestureCode
mGestureContentView = new GestureContentView(this, true, gestureCode,
        new GestureDrawline.GestureCallBack() {

    @Override
    public void onGestureCodeInput(String inputCode, String spassNum) {
    }

    @Override
    public void checkedSuccess(String inputCode) {
        验证成功
    }

    @Override
    public void checkedFail(String inputCode, String code) {
        验证失败
    }
});
    
```
