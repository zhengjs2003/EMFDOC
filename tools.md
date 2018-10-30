## <a name="tools"></a>通用工具库
1. Context工具类 － ContextUtil	
	也是Application的父类，通过以下方法在任意地方可以获取应用上下文
	
	```
	public static Context getContext() {
        return mContext.getApplication();
    }
	```
	
1. AppUtils APP工具类  
	APP相关信息工具类，提供以下等信息：  
	1）获取APP的版本号  
	2）获取APP的版本名  
	3）获取APP缓存目录  
	4）获取手机系统SDK版本  
	5）获取应用签名  
1. DeviceUtils 设备工具类  
	1）获取手机DeviceId  
	2）得到CPU核心数  
1. ScreenTools  
	1）获取屏幕高度  
	2）获取屏幕宽度   
	3）禁止截屏  
	4）dp，sp和px转换  
	5）扩展View点击区域  
1. FileUtils  
	文件的读，写，拷贝，删除，移动等操作  
1. JsonHelper  
	提供Json与Bean的转换  
1. KeyboardController    
	提供软键盘的显示和隐藏功能  
1. MyToast  
	提供Toast的显示  
1. NetWorkUtil  
	提供网络状态信息的工具类  
1. NumberUtils  
	提供各类的数据格式化，字符串转数据，数字格式化为中文等  
1. PriceUtil    
	价格相关的格式化工具类  
1. StringUtils    
	字符串工具类，提供一些字符串相关的便捷方法，比如字符串为空时，统一显示"--" 
1. PdfUtil
	PDF文件的下载和打开工具	 
1. ProgressUtil
	进度条工具类
