
## <a name="eventbus"></a>事件总线
EventBus是一款针对Android优化的发布/订阅事件总线。简化了应用程序内各组件间、组件与后台线程间的通信。优点是开销小，代码更优雅，以及将发送者和接收者解耦。  
EventBus有三个主要的元素需要我们先了解一下：  
1） Event：事件，可以是任意类型的对象。  
2） Subscriber：事件订阅者，需要在使用的地方添加一个注解@Subscribe。  
3） Publisher：事件发布者，可以在任意线程任意位置发送事件，直接调用EventBus的post(Object)方法。可以自己实例化EventBus对象，但一般使用EventBus.getDefault()就好了，根据post函数参数的类型，会自动调用订阅相应类型事件的函数。  

EventBus的四种ThreadMode（线程模型）

1） POSTING（默认）：如果使用事件处理函数指定了线程模型为POSTING，那么该事件在哪个线程发布出来的，事件处理函数就会在这个线程中运行，也就是说发布事件和接收事件在同一个线程。在线程模型为POSTING的事件处理函数中尽量避免执行耗时操作，因为它会阻塞事件的传递，甚至有可能会引起ANR。  
2） MAIN: 
事件的处理会在UI线程中执行。事件处理时间不能太长，长了会ANR的。  
3） BACKGROUND：如果事件是在UI线程中发布出来的，那么该事件处理函数就会在新的线程中运行，如果事件本来就是子线程中发布出来的，那么该事件处理函数直接在发布事件的线程中执行。在此事件处理函数中禁止进行UI更新操作。  
4） ASYNC：无论事件在哪个线程发布，该事件处理函数都会在新建的子线程中执行，同样，此事件处理函数中禁止进行UI更新操作。

典型应用

1.自定义一个事件类  

```
public class MessageEvent {
    ...
}
```  

2.在需要订阅事件的地方注册事件 

```
EventBus.getDefault().register(this);
```

3.发送事件  

```
EventBus.getDefault().post(messageEvent);
```

4.处理事件  

```
@Subscribe(threadMode = ThreadMode.MAIN)  
public void XXX(MessageEvent messageEvent) {  
    ...  
}  
```

5.取消事件订阅 
 
```
EventBus.getDefault().unregister(this);
```