## <a name="analysis"></a>用户行为分析
EMF集成了友盟和证通用户行为分析SDK，并实现了应用信息和页面访问的自动化埋点; 但事件埋点需要手动处理。

典型应用

```
 //页面访问，已实现自动化埋点

 //友盟事件埋点
 MobclickAgent.onEvent(context, eventId);
 
 //证通用户行为分析事件埋点
 ECTAnalytics.onEvent(eventId, label, userId, pagename);
```