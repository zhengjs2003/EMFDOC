## <a name="push"></a>Push推送
EMF集成了小米推送服务。小米推送目前支持两种消息传递方式：透传方式和通知栏方式。  
&emsp;&emsp;1) 透传消息到达手机端后，SDK会将消息通过广播方式传给AndroidManifest中注册的PushMessageReceiver的子类的onReceivePassThroughMessage；  
&emsp;&emsp;2) 对于通知栏消息，SDK会根据消息中设置的信息弹出通知栏通知，通知消息到达时会到达PushMessageReceiver子类的onNotificationMessageArrived方法,用户点击之后再传给您的PushMessageReceiver的子类的onNotificationMessageClicked方法；对于应用在前台时不弹出通知的通知消息，SDK会将消息通过广播方式传给AndroidManifest中注册的PushMessageReceiver的子类的onNotificationMessageArrived方法

参考文件:  
[小米推送服务](https://dev.mi.com/doc/?p=544)