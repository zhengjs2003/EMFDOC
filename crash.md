## <a name="crash"></a>Crash管理
EMF集成了Bugly崩溃信息管理，在应用启动时初始化Bugly，并设置<b>"注册时申请的APPID"</b>。    
在https://bugly.qq.com/上可以查看奔溃的记录信息。

```
void startBugly() {
    // 使用自定义的错误处理方式，当发生错误的时候主动发送友盟服务器
    CrashHandler.getInstance().init(getApplicationContext());

    CrashReport.initCrashReport(getApplicationContext(),
    //BUGLY_APP_ID是注册时申请的APPID        ConstValue.BUGLY_APP_ID, !"release".equals(BuildVariants.BUILD_TYPE));
    CrashReport.setUserId(LoginInfo.getUserId());
    CrashReport.putUserData(getApplicationContext(), "Phone", LoginInfo.get().telephone);
    CrashReport.putUserData(getApplicationContext(), "Revision", BuildVariants.CLIENT_VERSION);
    CrashReport.putUserData(getApplicationContext(), "BuildTimestamp", BuildVariants.BUILD_TIMESTAMP);
}
```