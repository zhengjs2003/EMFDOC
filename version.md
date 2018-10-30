## <a name="version"></a>版本更新
自动检测版本更新，如发现新版本，在wifi环境下自动下载，并提示用户更新。非wifi环境下，提示用户下载和更新。
版本升级时，跟版本相关的数据将会被清除，详见数据管理。  

典型应用

```
手动检测版本更新
UpdateAppUtils.getInstance().checkUpdate(this@MainActivity)
```