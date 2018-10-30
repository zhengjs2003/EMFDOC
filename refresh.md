## <a name="refresh"></a>下拉刷新
下拉刷新可使用以下控件：  
    1.android.support.v4.widget.SwipeRefreshLayout -- Android默认的下拉刷新控件  
    2. com.scwang.smartrefresh.layout.[SmartRefreshLayout](https://github.com/scwang90/SmartRefreshLayout) -- 智能下拉刷新框架  
      
      Android智能下拉刷新框架  
		1) 支持嵌套多层的视图结构 Layout (LinearLayout,FrameLayout...)  
		2) 支持所有的 View（AbsListView、RecyclerView、WebView....View）  
		3) 支持自定义并且已经集成了很多炫酷的 Header 和 Footer  
		4) 支持和ListView的无缝同步滚动 和 CoordinatorLayout 的嵌套滚动   
		5) 支持自动刷新、自动上拉加载（自动检测列表惯性滚动到底部，而不用手动上拉）  
		6) 支持自定义回弹动画的插值器，实现各种炫酷的动画效果  
		7) 支持设置主题来适配任何场景的App，不会出现炫酷但很尴尬的情况  
		8) 支持设多种滑动方式：平移、拉伸、背后固定、顶层固定、全屏  
		9) 支持所有可滚动视图的越界回弹   

典型应用

```
//xml文件
<com.scwang.smartrefresh.layout.SmartRefreshLayout
    android:id="@+id/refreshLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    </ScrollView>
</com.scwang.smartrefresh.layout.SmartRefreshLayout>

//java
//设置 Header 为 Material风格
//refreshLayout.setRefreshHeader(MaterialHeader(activity).setShowBezierWave(true))
refreshLayout.setRefreshHeader(WaveSwipeHeader(activity))
```