
## <a name="bus"></a>服务总线(路由总线)  

&emsp;&emsp;原生路由方案一般是通过显式intent和隐式intent两种方式实现的，而在显式intent的情况下，因为会存在直接的类依赖的问题，导致耦合非常严重；而在隐式intent情况下，则会出现规则集中式管理，导致协作变得非常困难。而且一般而言配置规则都是在Manifest中的，这就导致了扩展性较差。  
&emsp;&emsp;服务总线(路由)涉及两方面的内容：  
&emsp;&emsp;一方面是组件化，组件化就是将APP按照一定的功能和业务拆分成多个小组件，不同的组件由不同的开发小组来负责，这样就可以解决大型APP开发过程中的开发与协作的问题。  
&emsp;&emsp;另一方面就是Native和H5的问题，因为现在的APP很少是纯Native的，也很少会有纯H5的，一般情况下都是将两者进行结合。这时候就需要非常便捷并且统一的跳转方案，因为在H5中是无法使用StartActivity()跳转到Native页面的，而从Native跳转到H5页面也只能通过配置浏览器的方式实现。  

&emsp;&emsp;服务总线(路由) 封装了阿里的[ARouter](https://github.com/alibaba/ARouter)，实现了以下功能:  

1. 支持直接解析URL进行跳转、参数按类型解析到Bundle，支持Java基本类型，JSON数据和Parcelable类型数据。
1）组件间的调用必须通过服务总线(路由)调用  
2）H5调用原生必须通过服务总线(路由)调用  
3）路由的命名规则：  
&emsp;&emsp;&emsp;&emsp;path＝“/模块名/逻辑名”  
&emsp;&emsp;&emsp;&emsp;extras = ConstValue.BUS_FLAG_LOGIN 表示进入该页面必须进行用户登录验证
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
//声明
	@Autowired
	String name;
	
	@Autowired(name = "boy")
    boolean girl;

    @Autowired
    TestObj obj;
    ...
}
        .withBoolean("boy", true)
```
### 3. 登录拦截
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在访问目标页面时，如果用户未登录，会先跳转到登录页面，用户登录成功后，再跳转到目标页面。  

```
//定义拦截器
```
### 4. 通过URL跳转
1) 新建一个Activity用于监听Schame事件,之后直接把url传递给ARouter即可

```

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

```

```

```
5) H5调用 
 
```
```
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;在H5的URL中“？”之后就是参数，通过服务总线框架不但可以跳转到目标页面也可以将后面的一些Get参数注入到目标页面的对应字段中。  

### 5. 返回跳转结果
```
```
### 6. 降级策略
```
//跳转失败，单独降级
            
```