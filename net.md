## 网络通信和缓存管理

编程思想：降低耦合，让接口开发灵活，不同API互相不干扰  代码风格：使用注解方式，代码简洁，易懂，易上手  设计思想：采用建造者模式，开发构建简便      
完美封装RxJava的响应式编程和Retrofit的注解式请求, 实现了以下功能：  

1. 全方位请求模式: 支持多种方式访问网络（get,put, post ,delete）
*  自动生成代码: 利用注解功能，在编译期自动生成网络请求API实现代码，提高开发效率
* 强大的缓存模式: 支持离线缓存，无网络智能加载缓存，可配置是否需要缓存
* 统一请求头: 支持请求头统一添加
* 统一报文处理: 支持报文加密传输和不加密传输
* 统一返回结果: 支持对返回结果的统一处理
* 统一错误处理: 对网络请求的错误信息进行统一处理；  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;支持通过配置文件对错误码进行转换
* 统一无网处理: 支持无网时，进行统一判断处理
* 统一生命周期处理：利用RxLifecycle管理生命周期，防止泄露
* 统一进度条处理：便捷的加入Processbar进度
* 特殊处理：支持自定义的扩展API


典型应用  
### 1. 利用注解，自动生成代码  
1) 添加依赖和配置  在使用模块的Build.gradle中加入配置如下所示：
  
```dependencies {  
    annotationProcessor project(':ect_processor')  
    compile project(path: ':ect_annotaion')  
}  
```
2) 添加注解@Gateway  
移动开发框架定义了三种注解。  
@Gateway 只有添加了@Gateway的注解，才会自动生成代码  
@Cached 添加缓存功能， 如不添加默认无缓存。  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;参数value表示缓存时间，单位秒；  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;cachedFirst＝true表示先从缓存获取，再从网络获取；  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;cachedFirst＝false表示先从缓存获取，缓存无数据或过期时，再从网络获取。  
@Encrypt 报文传输加密功能， 如不添加默认为加密传输。  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;参数value为true时(默认)表示报文传输时使用加密功能。  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;参数value为false时表示报文传输时不使用加密功能。  


``` @Gatewaypublic interface ApiService {    @GET("emf/getList")    Observable<NetWrapper> getList(@QueryMap Map<String, Object> params);｝
``` 3) 编译自动生成代码  编译成功后，会自动生成对应的java代码，即Ect+接口类名，如：

``` public class EctApiService implements ApiService {
	public Observable<NetWrapper> getList(final Map<String, Object> params) {
		//自动生成的代码
	}}
``` 4) 接口调用

``` 
//初始化生成的类  
public class ServiceGenerator {
    public static APIService apiService;
    static {
        apiService = EctApiService.get();
    }
}

//调用网络请求  
ServiceGenerator.apiService.getList(params)
                .compose(HttpRequest.schedulersMain())
                .compose(Utils.<NetWrapper>applyProgressBar(this))
                .compose(this.<NetWrapper>bindToLifecycle())
                .subscribe(new DefaultObserver<NetWrapper>() {
                    @Override
                    public void onOk(NetWrapper response) {
                        tvName.setText(response.content);
                    }
                });
``` 





### 2. 缓存使用 
利用自动代码生成功能,Cached注解说明：  
@Cached 添加缓存功能， 如不添加默认无缓存。  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;参数value表示缓存时间，单位秒；  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;cachedFirst＝false表示先从缓存获取，再从网络获取；  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;cachedFirst＝true表示先从缓存获取，如缓存无数据或过期时，再从网络获取。

``` @Gatewaypublic interface ApiService {
	 //缓存10分钟，先从缓存获取，再从网络获取    @GET("emf/getList")
    @Cached(value=600, cachedFirst=true)    Observable<NetWrapper> getList(@QueryMap Map<String, Object> params);｝
``` 

### 3. 非自动生成网络接口使用
1) 无缓存的网络请求

``` 
 Map<String, Object> params = new HashMap<String, Object>();
 new HttpRequest.Builder()
                .setHintPath("emf/getList") //出错时，提示请求路径
                .build()
                .createService(ApiService.class)
                .getList(params)
                .compose(HttpRequest.schedulersMain())
                .compose(Utils.<NetWrapper>applyProgressBar(this))
                .compose(this.<NetWrapper>bindToLifecycle())
                .subscribe(new DefaultObserver<NetWrapper>() {

                    @Override
                    public void onOk(NetWrapper response) {
                        tvName.setText(response.content);
                    }
                }); 
``` 
2） 先从缓存读取数据，如无缓存或过期，再从网络请求
  
``` 
Map<String, Object> params = new HashMap<String, Object>();
HttpRequest httpRequest = new HttpRequest.Builder().setHintPath("emf/getList")
        .setCache(60, true)
        .setEncrypt(false)
        .build();

Observable observable = httpRequest.createService(NetDemoService.class). getList(params);
httpRequest.contact(params, observable, NetWrapper.class)
        .compose(HttpRequest.schedulersMain())
        .compose(HttpRequest.handleErrTransformer())
        .compose(Utils.<NetWrapper>applyProgressBar(NetDetailActivity.this))
        .compose(this.<NetWrapper>bindToLifecycle())
        .subscribe(new DefaultObserver<NetWrapper>() {

            @Override
            public void onOk(NetWrapper response) {
                tvName.setText(response.content);
            }
        });
                    
``` 

3）先从缓存读取数据，再从网络请求  

``` 
Map<String, Object> params = new HashMap<String, Object>();
HttpRequest httpRequest = new HttpRequest.Builder().setHintPath("emf/getList")
        .setCache(60)
        .setEncrypt(false)
        .build();

Observable observable = httpRequest.createService(NetDemoService.class). getList(params);
httpRequest.contact(params, observable, NetWrapper.class)
        .compose(HttpRequest.schedulersMain())
        .compose(HttpRequest.handleErrTransformer())
        .compose(Utils.<NetWrapper>applyProgressBar(NetDetailActivity.this))
        .compose(this.<NetWrapper>bindToLifecycle())
        .subscribe(new DefaultObserver<NetWrapper>() {

            @Override
            public void onOk(NetWrapper response) {
                tvName.setText(response.content);
            }
        });
``` 


### 4. 统一返回结果处理
DefaultObserver类，对网络请求返回的数据进行统一处理。 返回数据使用统一的JSON报文格式，各请求返回数据Bean继承BaseResponse。网络层统一做JSON转换处理。

```
public class BaseResponse {
    public String resultCode; //“1”表示返回成功，非“1”表示失败
    public String errMsg; 		//错误的提示信息
}

public class NetWrapper extends BaseResponse {
    public String content;
}
```

### 5. 统一错误处理
1）错误码转换  
网络模块统一把捕获异常，并把异常信息转换成EmfException，出现错误时，统一展示EmfException中的message信息。 
对服务端返回的错误码，默认直接展示。

``` 
 /*
  * 服务端返回的HTTP异常
  */
    public static final int HTTP_BAD_REQUEST = 400;
    public static final String HTTP_BAD_REQUEST_MSG = "无效的请求";

    public static final int HTTP_UNAUTHORIZED = 401;
    public static final String HTTP_UNAUTHORIZED_MSG = "未授权的请求";

    public static final int HTTP_FORBIDDEN = 403;
    public static final String HTTP_FORBIDDEN_MSG = "禁止访问";

    public static final int HTTP_NOT_FOUND = 404;
    public static final String HTTP_NOT_FOUND_MSG = "服务器地址未找到";

    public static final int HTTP_METHOD_NOT_ALLOWED = 405;
    public static final String HTTP_METHOD_NOT_ALLOWED_MSG = "请求的方法不允许";

    public static final int HTTP_REQUEST_TIMEOUT = 408;
    public static final String HTTP_REQUEST_TIMEOUT_MSG = "请求超时";

    public static final int HTTP_INTERNAL_SERVER_ERROR = 500;
    public static final String HTTP_INTERNAL_SERVER_ERROR_MSG = "服务器内部错误";

    public static final int HTTP_BAD_GATEWAY = 502;
    public static final String HTTP_BAD_GATEWAY_MSG = "无效的请求";

    public static final int HTTP_SERVICE_UNAVAILABLE = 503;
    public static final String HTTP_SERVICE_UNAVAILABLE_MSG = "服务器不可用";

    public static final int HTTP_GATEWAY_TIMEOUT = 504;
    public static final String HTTP_GATEWAY_TIMEOUT_MSG = "网关响应超时";

    public static final int HTTP_ACCESS_DENIED = 302;
    public static final String HTTP_ACCESS_DENIED_MSG = "网络错误";

    public static final int HTTP_HANDEL_ERRROR = 417;
    public static final String HTTP_HANDEL_ERRROR_MSG = "接口处理失败";

    /*
     * APP本地连接错误
     */
    public static final int APP_SSL_ERROR = 1001;
    public static final String APP_SSL_ERROR_MSG = "证书验证失败";

    public static final int APP_SSL_NOT_FOUND = 1002;
    public static final String APP_SSL_NOT_FOUND_MSG = "证书路径没找到";

    public static final int APP_SSL_INVALID = 1003;
    public static final String APP_SSL_INVALID_MSG = "无有效的SSL证书";

    public static final int APP_UNKOWNHOST_ERROR = 1004;
    public static final String APP_UNKOWNHOST_ERROR_MSG = "服务器地址未找到";

    public static final int APP_TIMEOUT_ERROR = 1005;
    public static final String APP_TIMEOUT_ERROR_MSG = "连接超时";
    ...
    
``` 

2）根据配置文件转换错误码

在配置文件emf-config.json中，可定义成功的返回码，错误的返回码和对应的提示信息。

```
{
  "sucessCode": [ //成功的返回码
    "1",
    "200"
  ],
  "error": { //错误码及信息
    "404":"访问路径不存在",
    "500":"服务端内部错误"
  }
}
```
网络模块慧根据配置文件中的信息，进行统一转码。   
配置文件的信息优先级高于代码中定义的错误码信息。

### 6. 特殊处理
对某些网络请求返回的数据不是按规定的统一报文格式，网络层ApiService提供了通用的请求方法。

```
@POST()
@FormUrlEncoded
Observable<ResponseBody> post(
        @Url() String url,
        @FieldMap Map<String, Object> params);

@POST()
 Observable<ResponseBody> postBody(
        @Url String url,
        @Body Object object);

@GET()
Observable<ResponseBody> get(
        @Url String url,
        @QueryMap Map<String, Object> params);

@DELETE()
Observable<ResponseBody> delete(
        @Url String url,
        @QueryMap Map<String, Object> params);

@PUT()
Observable<ResponseBody> put(
        @Url String url,
        @FieldMap Map<String, Object> params);
```

使用CommonObserver，并返回ResponseBody格式的数据，由使用者自行处理。

```
CommonObserver<ResponseBody> obser = new CommonObserver<ResponseBody>(){

    @Override
    public void onOk(ResponseBody response) {
        if(null != response){
            try {
                tvName.setText(new String(response.bytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
};

Map<String, Object> params = new HashMap<String, Object>();

new HttpRequest.Builder().setHintPath(url).build()
        .get(url, params,  ResponseBody.class, obser,
            Utils.<ResponseBody>applyProgressBar(this),
            this.<ResponseBody>bindToLifecycle());
```