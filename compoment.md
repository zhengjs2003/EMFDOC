
### 基类
#### BaseAPP  
1）编译时静态变量的初始化  
2）各个模块的初始化    
	日志、服务总线(路由总线)、热修复和崩溃日志Buggly、推送通知、友盟、
	下载管理、内存泄露检测、调试Steho等  
3）Activity的生命周期跟踪，实现自动化埋点功能  
	
#### BaseActivity  
1）	Activity生命周期事件管控  
2）状态栏的设置
	如需定制，需重载setStatusBar方法  


#### BaseFragment  
1）Fragment生命周期事件管控  
2）Fragment的生命周期跟踪，实现自动化埋点功能  



