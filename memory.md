## <a name="memory"></a>内存监测
在开发模式下，默认打开内存泄露检查功能，如遇到需要及时修复。

Android常见的内存泄露:  
 1) 单例造成：由于单例静态特性使得单例的生命周期和应用的生命周期一样长，如果一个对象（如Context）已经不使用了，而单例对象还持有对象的引用造成这个对象不能正常被回收；  
2) 非静态内部类创建静态实例造成：在Acitivity内存创建一个非静态内部类单例，避免每次启动资源重新创建。但是因为非静态内部类默认持有外部类（Activity）的引用，并且使用该类创建静态实例。造成该实例和应用生命周期一样长，导致静态实例持有引用的Activity和资源不能正常回收；  
3) Handler造成：子线程执行网络任务，使用Handler处理子线程发送消息。由于handler对象是非静态匿名内部类的对象，持有外部类（Activity）的引用。在Handler-Message中Looper线程不断轮询处理消息，当Activity退出还有未处理或者正在处理的消息时，消息队列中的消息持有handler对象引用，handler又持有Activity，导致Activity的内存和资源不能及时回收；  
4) 线程造成：匿名内部类Runnalbe和AsyncTask对象执行异步任务，对当前Activity隐式引用。当Activity销毁之前，任务还没有执行完，将导致Activity的内存和资源不能及时回收；  
5) 资源未关闭造成的内存泄露：对于使用了BroadcastReceiver，ContentObserver，File，Cursor，Stream，Bitmap等资源的使用，应该在Activity销毁时及时关闭或者注销，否则这些资源将不会被回收，造成内存泄露；

EMF集成了LeakCanary用于内存泄漏的检测。LeakCanary仅在Debug模式下有效。  
使用方法参照[leakcanary](https://github.com/square/leakcanary)。  