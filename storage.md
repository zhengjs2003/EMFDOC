## <a name="storage"></a>数据管理
分三个级别统一管理：  
    1. APP级别：数据的有效期同APP 
       Repository.appStorage.get/setXX()
    1. Version级别：数据的有效期跟APP版本一致，APP升级后，数据将被清理
       Repository.versionStorage.get/setXX()
    1. User级别：数据的有效期跟用户登录一致，用户推出后，数据将被清理
       Repository.userStorage.get/setXX() 

典型应用

```
//获取
String ver = Repository.versionStorage.getAppVersion()； //获取App版本

//设置
Repository.versionStorage.setAppVersion(“1.0.0”); //设置APP版本
```