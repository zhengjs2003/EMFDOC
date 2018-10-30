## H5容器
    
APP开发中会有部分需求更新频繁、业务需求动态等特点，需要用户能够及时更新。该场景下，H5能够满足此类特性的需求（更快、更简便的服务，代码可高度重用，服务发布方便等优点），能够做到快速承载业务的更新，多端开发统一。 
  
H5容器实现了以下功能：  ####1. H5预加载  H5预加载是通过webview在用户打开页面之前预先把页面加载好，当用户点击打开的时候达到秒开的效果。  ####2. 显示进度条和自定义标题  H5页面在webview打开时，显示加载的进度条。  
H5页面可以通过设置title，在显示时动态的更改标题栏上的标题  ####3. pdf文件显示  H5容器已封装了pdf文件下载显示功能。####4. 插件化管理  1）网络请求插件  
实现Native与H5页面的交互：业务协议接口的定义，与服务器的数据交互，APP端通用功能等。Native与H5的请求委托，将鉴权信息等部分接口委托至APP端，增加安全性。  
2）图片插件  
实现图片的手指缩放。  
3）埋点插件  
实现页面的自动化埋点。   
4) 自定义插件 
提供灵活的插件扩功能。
####5. 自动化埋点统计  埋点包括页面埋点和事件埋点，页面埋点自动采集H5页面的进入和离开时间；事件埋点基于当前需求，少量事件需要埋点，采取手动埋点的方式。埋点的数据交给用户行为分析SDK统一处理。   

典型应用  
### 1. 预加载  
```
//预加载设置
WebViewManager.getInstance().preLoad("http://m.sina.com.cn", "sina", false);

//调用打开
Intent intent = new Intent(this, BaseWebViewActivity.class);
intent.putExtra("url", "http://m.sina.com.cn");
intent.putExtra("webviewName", "sina"); //预加载时必须指定
intent.putExtra("reload", true);
startActivity(intent);  
```
### 2. 显示进度条和自定义标题
```
 //隐藏标题栏和
Intent intent = new Intent(this, BaseWebViewActivity.class);
intent.putExtra("hideTitleBar", false); //标题栏，默认false
intent.putExtra("hideProgressBar", false); //进度条，默认false
intent.putExtra("url", "https://www.baidu.com");
startActivity(intent);
```
### 3. pdf文件显示
```
//H5中编写pdf文件
<a href="http://x.x.x.x/xxx.pdf">PDF文件</a>
```
### 4. 网络请求插件
```
var data = {'url':"emf/gitList",'type':"get",'data':"time=1&user=zhangsan"}

window.WebViewJavascriptBridge.callHandler(
            'networklugin',
            data, //请求参数
            function(responseData){
            	alert(responseData)
            });
```
请求参数是json数据格式：  
url：请求的URL地址  
type： 请求类型，“get” 或 “post”  
data： 请求的参数



### 5. 自动埋点插件
H5页面引入emf.js文件，页面的进入和离开可实现自动埋点  
事件埋点需要单独调用如下：  

```
analyticsEvent(eventId, label);
```

### 6. 自定义插件
Android原生代码继承BasePlugin，并在BaseWebViewActivity中注册该插件  

```
//定义插件
public class MyPlugin extends BasePlugin {
@Override
    public void handler(final String data, final CallBackFunction function) {
    	//数据处理
    ｝
｝

//注册插件
mBaseWebView.addPlugin(new MyPlugin("myplugin"));


//插件使用
window.WebViewJavascriptBridge.callHandler(
               'myplugin',
               data, //请求参数
               function(responseData) {
               });
```

### 7. Native调用Js
在JS中注册插件

```
 WebViewJavascriptBridge.registerHandler("functionInJs", function(data, responseCallback) {
        document.getElementById("show").innerHTML = ("data from Java: = " + data);
        var responseData = "Javascript Says Right back aka!";
        responseCallback(responseData);
    });    });
```

在原生中调用

```
webView.callHandler("functionInJs", new Gson().toJson(user), new CallBackFunction() {
        @Override
        public void onCallBack(String data) {

        }
    });
```
### 8. Js调用Native
在原生中注册插件 

```
//注册来自h5的网络请求，只负责收发请求，请求参数拼装及返回参数解析在h5内完成 
mBaseWebView.addPlugin(new NetPlugin("networklugin", this));
```

在H5调用 

``` 
//url中可以写相对路径或绝对路径 
function netGetClick(){
	window.WebViewJavascriptBridge.callHandler(
            'networklugin',{'url':"tg/netdemo/delay?time=1&user=zhangsan",'type':"get",'data':""},function(responseData){
            alert(responseData)
            });

       }

function netPostClick(){
	window.WebViewJavascriptBridge.callHandler(
            'networklugin',{'url':"tg/netdemo/delay?time=1&user=zhangsan",'type':"post",'data':""},function(responseData){
            alert(responseData)
            });

       }
```

### 9. H5打开原始页面

```
//参照路由配置
<a href="ect://m.emf.com/fund/FundList">原始页面</a> 
<a href="http://m.emf.com/fund/FundList?key=value1">原始页面，可携带参数</a> 
<a href="https://m.emf.com/fund/FundList">原始页面</a>
```