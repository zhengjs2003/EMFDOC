###统一标题栏
EMF定义了统一标题栏Header类，各页面引入该标题栏，保持整体风格的一致性。  
1）返回按钮处理  
	状态栏字体颜色统一封装了back返回按钮事件处理。  
2）设置标题  

```
public void setTitle(CharSequence title);

public void setTitle(@StringRes int title);
```

3）设置右侧文本  

```
public void setSubtitle(@StringRes int subtitle);
```

4）设置右侧图片  

```
 public void setRightIcon(@DrawableRes int icon);
```

5）设置点击事件 

```
//左侧返回按钮点击事件
public Observable<Object> leftClicks();

//右侧文本点击事件
public Observable<Object> rightTextClicks();

//右侧图片点击事件
public Observable<Object> rightIconClicks();

使用示例  
header.rightTextClicks()
    .subscribe(new Consumer<Object>() {
        @Override
        public void accept(Object o) throws Exception {
            //do something
        }
    });
```
