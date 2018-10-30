## <a name="monintor"></a>APP监控

1, 官方工具  
Android本身给我们提供了很多App性能测试和分析工具, 而且大部分都集成到Android Studio或DDMS中, 非常方便使用.  

http://www.jianshu.com/p/da2a4bfcba68

1) StrictMode  
"严格模式", 主要用来限制应用做一些不符合性能规范的事情. 一般用来检测主线程中的耗 时操作和阻塞. 开启StrictMode后, 如果线程中做一些诸如读写文件, 网络访问等操作, 将会在Log console输出一些警告, 警告信息包含Stack Trace来显示哪个地方出了问题.  

作用：主要用来做主线程优化分析
参考：[StrictMode](https://developer.android.google.cn/reference/android/os/StrictMode.html)

2）Systrace  
Systrace是一个收集和检测时间信息的工具, 它能显示CPU和时间被消耗在哪儿了, 每个进程和线程都在其CPU时间片内做了什么事儿. 而且会指示哪个地方出了问题, 以及给出Fix建议.
其以trace文件(html)的方式记录. 可以直接用Chrome浏览器打开查看.  
作用：主要用来分析UI的绘制时间, 结合Hierarchy Viewer来提升UI性能.也可以用来发现耗时操作.  
参考：[Systrace](https://developer.android.google.cn/studio/profile/systrace.html)

3）Hierarchy Viewer  
Hierarchy Viewer提供了一个可视化的界面来观测布局的层级, 让我们可以优化布局层级, 删除多余的不必要的View层级, 提升布局速度.  
作用：用来做View层级分析, 可以分析出View Tree中的性能阻塞点, 以便对症下药, 提升布局性能.  
参考：[Hierarchy](https://developer.android.google.cn/studio/profile/hierarchy-viewer.html)

4) TraceView
一个图形化的工具, 用来展示和分析方法的执行时间.
作用：分析方法调用栈以及其执行时间, 优化方法执行.

参考：[TraceView](https://developer.android.google.cn/studio/profile/traceview.html)

5）Memory Monitor
内存使用检测器, 可以实时检测当前Application的内存使用和释放等信息, 并以图形化界面展示.  
作用：  
a)用来做内存分析, 内存泄露排查的不二之选. 可以结合heap viewer, allocation tracker来分析.  
b) 可以导出hprof文件结合第三方的MAT工具分析泄露点.

Android Studio的Monitor还提供了其他三个Motinor --- CPU, GPU, Network.

参考：[Memory Monitor](https://developer.android.google.cn/studio/profile/am-memory.html)

2, 第三方工具
1）Google的Battery Historian

Google出品, 通过Android系统的bugreport文件来做电量使用分析的工具.

作用: 用来做电量使用分析.

参考：[Battery Historian](https://github.com/google/battery-historian)


2.2 网易的Emmagee

针对Android App的CPU, 内存, 网络, 电量等多项综合的测试分析.

作用:比官方工具更适合国人使用来做App的整体性能分析.

参考：[Emmagee](https://github.com/NetEase/Emmagee)

2.3 leakcanary

App探针的内存泄露监测工具.

作用:用来做内存问题预防

参考：[leakcanary](https://github.com/square/leakcanary)

2.4 AndroidDevMetrics

一个library, 用来检测Activity生命周期执行性能, Dagger2注入性能以及帧率性能的工具.

作用:如果你的应用使用的Dagger2, 这个就比较必要了.

[AndroidDevMetrics](https://github.com/frogermcs/AndroidDevMetrics)

