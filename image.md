## <a name="image"></a>图片处理
EMF集成了[Glide](https://github.com/bumptech/glide)图片处理框架。

典型应用

```
Glide.with(this)
    .load(url)
    .centerCrop()
    .placeholder(R.drawable.loading_spinner)
    .into(myImageView);
```