## <a name="timber"></a>统一日志管理
EMF集成了[Timber](https://github.com/JakeWharton/timber)服务。  
1. Timber是一款可扩展的Logger工具  
2. Timber通过Timber.plant来添加tree实例  
3. Timber需要在使用前添加完成tree实例,最好在Application的onCreate中实现  
4. Timber默认实现的DebugTree将调用它的类的名称作为Tag(没有指定tag时使用)  

典型应用

```
Timber.d("疯狂输出吧!");
Timber.i("疯狂输出吧!");
Timber.w("疯狂输出吧!");
Timber.e("疯狂输出吧!");
```