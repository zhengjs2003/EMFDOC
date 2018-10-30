## <a name="recycleview"></a>RecycleView
[BRVAH](https://www.jianshu.com/p/b343fcff51b0)是一个强大的RecyclerAdapter框架(什么是RecyclerView？)，它能节约开发者大量的开发时间，集成了大部分列表常用需求解决方案。  

1）优化Adapter代码  
和原始的adapter相对，减少70%的代码量。  
2）添加Item事件  
Item的点击事件  
Item的长按事件  
Item子控件的点击事件  
Item子控件的长按事件  
3）添加列表加载动画  
一行代码轻松切换5种默认动画。  
4）添加头部、尾部  
一行代码搞定，感觉又回到ListView时代。  
5）自动加载  
上拉加载无需监听滑动事件,可自定义加载布局，显示异常提示，自定义异常提示。同时支持下拉加载。  
6）分组布局  
随心定义分组头部。  
7）多布局  
简单配置、无需重写额外方法。  
8）设置空布局  
比Listview的setEmptyView还要好用。  
9）添加拖拽、滑动删除  
开启，监听即可，就是这么简单。  
10）树形列表  
比ExpandableListView还要强大，支持多级。  
11）自定义ViewHolder  
支持自定义ViewHolder，让开发者随心所欲。  
11）扩展框架  
组合第三方框架，轻松实现更多需求定制。  

典型应用

```
//自定义adapter类
public class HomeAdapter extends BaseQuickAdapter<HomeItem, BaseViewHolder> {
    public HomeAdapter(int layoutResId, List data) {
        super(layoutResId, data);
    }

    @Override
    protected void convert(BaseViewHolder helper, HomeItem item) {
        helper.setText(R.id.text, item.getTitle());
        helper.setImageResource(R.id.icon, item.getImageResource());
        // 加载网络图片
      Glide.with(mContext).load(item.getUserAvatar()).crossFade().into((ImageView) helper.getView(R.id.iv));
    }
}

//RecycleView设置adapter，并传入layout和data
HomeAdapter adapter = new HomeAdapter(R.layout.market_card_head, mData）
mBinding.rvList.setAdapter(adapter);
```