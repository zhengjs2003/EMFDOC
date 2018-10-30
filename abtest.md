## <a name="abtest"></a>A/B测试
EMF集成了ARoute服务总线，通过实现PathReplaceService服务，可动态修改总线路由表，以达到A/B测试功能。
CMS通过配置中心配置路由表，并分发给APP，以实现不同的用户跳转到不同的页面。

```
public class PathReplaceServiceImpl implements PathReplaceService {
   final String[][] tables = {
            { "/app/path/replace", "/app/BusTestActivity1"}
        };
    
    @Override
    public String forString(String path) {
        for(String[] arr : tables) {
            if (arr[0].equals(path)) {
                return arr[1];
            }
        }

        return path;
    }

    @Override
    public Uri forUri(Uri uri) {
        return uri;
    }
}
```