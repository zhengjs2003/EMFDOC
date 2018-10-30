### 轮播图控件
轮播图引入了[BGABanner](https://github.com/bingoogolapple/BGABanner-Android)控件实现了如下功能   
 #1. 引导界面导航效果  
 ##. 支持根据服务端返回的数据动态设置广告条的总页数  
 支持大于等于1页时的无限循环自动轮播、手指按下暂停轮播、抬起手指开始轮播  
 支持自定义指示器位置和广告文案位置  
 支持图片指示器和数字指示器  
 支持 ViewPager 各种切换动画  
 支持选中特定页面  
 支持监听 item 点击事件  
 加载网络数据时支持占位图设置，避免出现整个广告条空白的情况  
 多个 ViewPager 跟随滚动    

1）创建轮播图  
 
```   
在xml中定义
<cn.bingoogolapple.bgabanner.BGABanner
    android:id="@+id/banner_guide"
    android:layout_width="match_parent"
    android:layout_height="155dp"
    app:banner_pageChangeDuration="2000"
    app:banner_pointAutoPlayAble="true"
    app:banner_pointContainerBackground="@android:color/transparent"
    app:banner_pointDrawable="@drawable/bga_banner_selector_point_hollow"
    app:banner_pointTopBottomMargin="15dp"
    app:banner_transitionEffect="alpha" />
```


2） 设置数据源
 
```
// Bitmap 的宽高在 maxWidth maxHeight 和 minWidth minHeight 之间
BGALocalImageSize localImageSize = new BGALocalImageSize(ScreenTools.getWidth(this.getContext()),
        ScreenTools.dip2px(this.getContext(), 155f), 320f, 640f);
// 设置数据源
mBinding.bannerGuide.setData(localImageSize, ImageView.ScaleType.CENTER_CROP,
        R.mipmap.tip_1,
        R.mipmap.tip_2,
        R.mipmap.tip_3,
        R.mipmap.tip_4);
    
```

3） 设置点击事件
 
```
mBinding.bannerGuide.setDelegate(new BGABanner.Delegate<ImageView, String>() {
    @Override
    public void onBannerItemClick(BGABanner banner, ImageView itemView, String model, int position) {
        Toast.makeText(banner.getContext(), "点击了" + position, Toast.LENGTH_SHORT).show();
    }
});
    
```
