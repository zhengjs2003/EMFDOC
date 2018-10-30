
## <a name="bus"></a>服务总线(路由总线)  

&emsp;&emsp;原生路由方案一般是通过显式intent和隐式intent两种方式实现的，而在显式intent的情况下，因为会存在直接的类依赖的问题，导致耦合非常严重；而在隐式intent情况下，则会出现规则集中式管理，导致协作变得非常困难。而且一般而言配置规则都是在Manifest中的，这就导致了扩展性较差。  
&emsp;&emsp;服务总线(路由)涉及两方面的内容：  
&emsp;&emsp;一方面是组件化，组件化就是将APP按照一定的功能和业务拆分成多个小组件，不同的组件由不同的开发小组来负责，这样就可以解决大型APP开发过程中的开发与协作的问题。  
&emsp;&emsp;另一方面就是Native和H5的问题，因为现在的APP很少是纯Native的，也很少会有纯H5的，一般情况下都是将两者进行结合。这时候就需要非常便捷并且统一的跳转方案，因为在H5中是无法使用StartActivity()跳转到Native页面的，而从Native跳转到H5页面也只能通过配置浏览器的方式实现。  

&emsp;&emsp;服务总线(路由) 封装了阿里的[ARouter](https://github.com/alibaba/ARouter)，实现了以下功能:  

1. 支持直接解析URL进行跳转、参数按类型解析到Bundle，支持Java基本类型，JSON数据和Parcelable类型数据。* 支持应用内的标准页面跳转，API接近Android原生接口* 支持多模块工程中使用，允许分别打包，包结构符合Android包规范即可* 支持自定义拦截逻辑，自定义拦截顺序，解决一些面向行为编程上出现的问题。* 支持服务托管，提供IoC容器，通过ByName,ByType两种方式获取服务实例，方便面向接口开发与跨模块调用解耦* 映射关系自动注册，并按组分类、多级管理，按需初始化，减少内存占用提高查询效率* 灵活的降级策略，提供很多种降级策略供用户自行选择，而原生的路由方案存在无法灵活降级的问题，StartActivity()一旦失败将会抛出运营级异常。* 支持获取Fragment* 支持多种方式配置转场动画使用规则  
1）组件间的调用必须通过服务总线(路由)调用  
2）H5调用原生必须通过服务总线(路由)调用  
3）路由的命名规则：  
&emsp;&emsp;&emsp;&emsp;path＝“/模块名/逻辑名”  
&emsp;&emsp;&emsp;&emsp;extras = ConstValue.BUS_FLAG_LOGIN 表示进入该页面必须进行用户登录验证典型应用
### 1. 基本配置
1）在各模块的build.gradle添加依赖和配置  

```
android {
    defaultConfig {
		javaCompileOptions {
		    	annotationProcessorOptions {
				arguments = [ moduleName : project.getName() ]
		   }
		}
    }
}

dependencies {
    // 替换成最新版本, 需要注意的是api
    // 要与compiler匹配使用，均使用最新版可以保证兼容
    compile 'com.alibaba:arouter-api:1.2.1'
    annotationProcessor 'com.alibaba:arouter-compiler:1.1.2'  
    ...
}
```
2) 添加注解

```
// 在支持路由的页面上添加注解(必选)
// 这里的路径需要注意的是至少需要有两级，path＝“/模块名/逻辑名”
@Route(path="/app/YourActivity")
public class YourActivity extend Activity {
    ...
}
```

### 2. 组件间挑转携带参数  
参数按类型自动解析到Bundle，支持Java基本类型，JSON数据和Parcelable类型数据。  

```
//声明@Route(path = "/app/BusTestActivity")public class BusTestActivity {
	@Autowired
	String name;
	
	@Autowired(name = "boy")
    boolean girl;

    @Autowired
    TestObj obj;
    ...
}//调用TestObj testObj = new TestObj("Rose", 777);ARouter.getInstance().build("/app/BusTestActivity")        .withString("name", "老王")
        .withBoolean("boy", true)        .withObject("obj", testObj)        .navigation();
```
### 3. 登录拦截
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在访问目标页面时，如果用户未登录，会先跳转到登录页面，用户登录成功后，再跳转到目标页面。  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Route中的extras = ConstValue.BUS_FLAG_LOGIN表示进入该页面需要先登录验证，只有登录后的用户才可访问。  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;所有页面中的配置都能够浓缩到这一个页面中，也就是高内聚低耦合的思想，不希望页面的配置逃出页面，配置到像Manifest的其他地方。Route中提供了extras参数，它是int类型，其实是因为int本身在Java中是由4个字节实现的，每个字节是8位，所以一共是32个标志位，去除掉符号位还剩下31个，也就是说转化成为二进制之后，一个int中可以配置31个1或者0，而每一个0或者1都可以表示一项配置，这时候只需要从这31个位置中挑选出一个表示是否需要登录就可以了，只要将标志位置为1，就可以在刚才声明的拦截器中获取到这个标志位，通过位运算的方式判断目标页面是否需要登录，这样是简单并且高效的，因为位运算的速度要远远高于字符串比对以及其他的方式的，而且一个int值就可以提供31个开关。

```
//定义拦截器@Interceptor(priority = 1)public class LoginInterceptor implements IInterceptor {@Overridepublic void process(final Postcard postcard, final InterceptorCallback callback) {	//处理拦截	if ( (postcard.getExtra() & ConstValue.BUS_FLAG_LOGIN)  == ConstValue.BUS_FLAG_LOGIN) {	ARouter.getInstance().build("/user/loginactivity").navigation();	}｝@Subscribe(threadMode = ThreadMode.MAIN)public void login(LoginEvent event){	mCallback.onContinue(mPostcard); //登录成功后，继续跳转到目标页面}｝//声明@Route(path = "/app/BusTestActivity", extras = ConstValue.BUS_FLAG_LOGIN)public class BusTestActivity //调用ARouter.getInstance().build("/app/BusTestActivity").navigation();
```
### 4. 通过URL跳转
1) 新建一个Activity用于监听Schame事件,之后直接把url传递给ARouter即可

```public class SchameFilterActivity extends Activity {    @Override    protected void onCreate(Bundle savedInstanceState) {	super.onCreate(savedInstanceState);	Uri uri = getIntent().getData();	ARouter.getInstance().build(uri).navigation();	finish();    }}```2) 在AndroidManifest.xml定义  

```
<activity
    android:name=".sample.bus.SchemeFilterActivity"
    android:noHistory="true">

    <!-- Schame -->
    <intent-filter>
        <data
            android:scheme="ect"
            android:host="m.emf.com" />

        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
    </intent-filter>

    <!-- App Links -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

       <data
			android:scheme="http"
			android:host="m.emf.com" />
		<data
			android:scheme="https"
			android:host="m.emf.com" />
    </intent-filter>
</activity>
```
3) 为每一个参数声明一个字段，并使用 @Autowired 标注  

```// URL中不能传递Parcelable类型数据，通过ARouter api可以传递Parcelable对象@Route(path = "/test/activity")	public class Test1Activity extends Activity {    @Autowired    public String name;    @Autowired    int age;    @Autowired(name = "girl") // 通过name来映射URL中的不同参数    boolean boy;    @Autowired    TestObj obj;    // 支持解析自定义对象，URL中使用json传递    @Override    protected void onCreate(Bundle savedInstanceState) {		super.onCreate(savedInstanceState);		ARouter.getInstance().inject(this);		// ARouter会自动对字段进行赋值，无需主动获取		Log.d("param", name + age + boy);    }}```4) 如果需要传递自定义对象，需要实现 SerializationService,并使用@Route注解标注(方便用户自行选择序列化方式)

```@Route(path = "/service/json")public class JsonServiceImpl implements SerializationService {    @Override    public void init(Context context) {    }    @Override    public <T> T json2Object(String text, Class<T> clazz) {        return JsonHelper.parserJson2Object(text, clazz);    }    @Override    public String object2Json(Object instance) {        return JsonHelper.parserObject2Json(instance);    }}

```
5) H5调用 
 
```<a href="http://m.emf.com/app/BusTestActivity?name=alex&age=18&boy=true&high=180&obj=%7b%22name%22%3a%22jack%22%2c%22id%22%3a666%7d ">URL跳转携带参数?name=alex&age=18&boy=true&high=180&obj={"name":"jack","id":"666"} </a>
```
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在H5的URL中“？”之后就是参数，通过服务总线框架不但可以跳转到目标页面也可以将后面的一些Get参数注入到目标页面的对应字段中。  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;通常情况下使用隐式intent的时候，每一个从外面跳转进来的页面都需要注册上intent-filter，每个页面都需要设置export=true，也就是需要让每一个页面都可以导出，在外部可以访问到。但是这样做会带来非常严重的安全风险，就像是一个房子有十个门还是只有一个门，看门的成本是不同的。而现在使用的这种场景只需要对外暴露出一个activity，然后在这个activity中注册一个intent-filter，这样之后所有的外部路由请求都会经过这唯一的门，然后在这个activity中获取到URL并将其交给服务总线，剩下的就由路由框架做分发了。

### 5. 返回跳转结果
```ARouter.getInstance().build("/app/BusTestActivity")        .withBoolean("ret", true)        .navigation(this, 666);
```&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;666是一个requestCode，在activity的onActivityResult可以获得调用的返回结果。
### 6. 降级策略
```
//跳转失败，单独降级ARouter.getInstance().build("/xx/xx")        .navigation(this, new NavigationCallback() {            @Override            public void onFound(Postcard postcard) {                MyToast.showText("onFound"+postcard.getPath());            }            @Override            public void onLost(Postcard postcard) {                MyToast.showText("onLost"+postcard.getPath());            }            @Override            public void onArrival(Postcard postcard) {                MyToast.showText("onArrival"+postcard.getPath());            }            @Override            public void onInterrupt(Postcard postcard) {                MyToast.showText("onInterrupt"+postcard.getPath());            }});
            //声明全局降级服务@Route(path = "/xxx/xxx")public class DegradeServiceImpl implements DegradeService {    @Override    public void onLost(Context context, Postcard postcard) {        MyToast.showText("服务未发现 Path="+postcard.getPath()+" Group＝"+postcard.getGroup());    }
```