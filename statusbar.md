
### 统一状态栏
在BaseActivity中已统一设置了状态栏，如需定制重载setStatusBar()方法。

1）状态栏背景颜色 

自定义背景颜色
 
```
@Override
protected void setStatusBar() {
	StatusBarUtil.setColor(this, getResources().getColor(R.color.colorPrimary));
}
    
```

半透明设置

```
StatusBarUtil.setTranslucent(this, StatusBarUtil.DEFAULT_STATUS_BAR_ALPHA);
```

全透明设置
  
```
StatusBarUtil.setTransparent(this);
```

2）状态栏字体和图标颜色 

```
//通过设置LightMode或DarkMode来改变状态栏字体和图标颜色.  
if(isLightMode) {  
    StatusBarUtil.setLightMode(this);  
} else {  
    StatusBarUtil.setDarkMode(this);  
}  
```