## <a name="fingerpirnt"></a>指纹识别
EMF定义了指纹识别工具类，调用FingerFragment可弹出指纹识别对话框进行指纹识别。 

典型应用

```
//初始化
FingerFragment fingerFragment = new FingerFragment();

//开始指纹识别
fingerFragment.show(getFragmentManager(),"fingerFragment");
fingerFragment.setmFragmentCallBack(new FingerFragment.Callback() {
    @Override
    public void onSuccess() {
       //识别成功 Toast.makeText(MainActivity.this, "成功", Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onError() {
       //识别失败 Toast.makeText(MainActivity.this, "失败", Toast.LENGTH_SHORT).show();
    }
});
```