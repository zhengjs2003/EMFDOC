## <a name="widgets"></a>通用UI组件库
  
##1. 基础Adapter  
BaseAdapter就Android应用程序中经常用到的基础数据适配器，它的主要用途是将一组数据传到像ListView、Spinner、Gallery及GridView等UI显示组件，它是继承自接口类Adapter。  
通过对BaseAdapter的封装，使用Databinding和非Databinding方式，抽取共性内容，简化开发过程。

目的：

1. 减少Adapter基础逻辑重复书写  
* 优化Adapter结构 使得代码更清晰  
* 将通用逻辑封装 集中优化处理 减少不必要环节出错  
  
方式：  
  
1. 泛型传参
* 使用抽象类
* 父类封装通用逻辑
* 子类只需实现抽象方法，而不必关注Adapter内部具体处理逻辑

典型应用

### 1) Databinding方式

#### (1) 定义Adapter

```
public class HelpAdapter
        extends EmfDataBindingAdapter<HelpWrapper.HelpBean, HelpAdapter.HelpViewHolder> {

    public HelpAdapter(Context context) {
        super(context);
    }

    @Override
    protected ViewDataBinding createBinding(@NonNull LayoutInflater mLayoutInflater,
            @NonNull ViewGroup parent) {
        return DataBindingUtil.inflate(mLayoutInflater, R.layout.common_listitem, parent, false);
    }

    @Override
    protected HelpViewHolder createViewHolder(ViewDataBinding binding) {
        return new HelpViewHolder(binding);
    }
}
```

#### (2) 创建ViewHolder

 ```
public static class HelpViewHolder
        extends EmfDataBindingHolder<HelpWrapper.HelpBean, CommonListitemBinding> {

    public HelpViewHolder(ViewDataBinding binding) {
        super(binding);
    }

    @Override
    public void bind(HelpWrapper.HelpBean bean) {
        mBinding.tvName.setText(bean.title);
    }
} 
 ```   

#### (3) ListView绑定Adapter

```
 mAdapter = new HelpAdapter(this);
mBinding.lvList.setAdapter(mAdapter);
mBinding.lvList.setOnItemClickListener(this);
```
### (4) Adapter设置数据

```
List<HelpBean> helpList = new ArrayList<HelpBean>();
...
mAdapter.addData(helpList); //添加数据
mAdapter.setData(helpList); //设置数据，原有数据将被清空
```
 
#### (5) 点击事件处理

```
mBinding.lvList.setOnItemClickListener(new OnItemClickListener() {
        @Override
        public void onItemClick(View view, int position, Object item) {
            ...
	    }
	});
```


### 2) 非Databinding方式
#### (1) 定义Adapter

```
public class CombinationHomePageAdapter
        extends EmfBaseAdapter<CombinationBean, ItemCombinationHomePage> {
    private IUserInfoClick mUserInfoClick;

    public AdapterCombinationHomePage(Context context) {
        super(context);
    }

    @Override
    protected View createView(@NonNull LayoutInflater layoutInflater, @NonNull ViewGroup parent) {
    	//1. 加载View
        return layoutInflater.inflate(R.layout.item_combination_home_page, parent, false);
    }

    @Override
    protected ItemCombinationHomePage createViewHolder(View view) {
    	//2. 创建ViewHolder
        return new ItemCombinationHomePage(view,mUserInfoClick);
    }

    public void setCallback(IUserInfoClick callback) {
        this.mUserInfoClick = callback;
    }
}
```
#### (2) 创建ViewHolder

 ```
public class ItemCombinationHomePage extends EmfBaseHolder<CombinationBean> {
    public ItemCombinationHomePage(View root, IUserInfoClick userInfoClick) {
        super(root);
        mUserInfoClick = userInfoClick;
        //查找View
        tvName = (TextView) vRoot.findViewById(R.id.tv_name);
    ｝
    
    @Override
    public void bind(final CombinationBean bean) {
		//数据填充
		tvName.setText(bean.userInfoDTO.userName);
		 
		 //设置点击事件
         vgUserInfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mUserInfoClick != null) {
                     mUserInfoClick.onUserInfoClick(bean.userInfoDTO);
                }
            }
        });
	｝
｝
 ```

#### (3) ListView绑定Adapter

```
mAdapter = new AdapterCombinationHomePage(mContext);
mBinding.lvFund.setAdapter(mAdapter);
```
### (4) Adapter设置数据

```
List<FundBean> fundList = new ArrayList<FundBean>();
...
mAdapter.addData(fundList); //添加数据
mAdapter.setData(fundList); //设置数据，原有数据将被清空
```
 
#### (5) 点击事件处理

```
mBinding.lvFund.setOnItemClickListener(new OnItemClickListener() {
	    @Override
	    public void onItemClick(View view, int position, Object item) {
			...
	    }
	});
```

##3. 基础RecyclerView  
RecyclerView与ListView原理是类似的：都是仅仅维护少量的View并且可以展示大量的数据集。    
通过对BaseAdapter的封装，使用Databinding和非Databinding方式，抽取共性内容，简化开发过程。

目的：

1. 减少Adapter基础逻辑重复书写  
* 优化Adapter结构 使得代码更清晰  
* 将通用逻辑封装 集中优化处理 减少不必要环节出错  
  
方式：  
  
1. 泛型传参
* 使用抽象类
* 父类封装通用逻辑
* 子类只需实现抽象方法，而不必关注Adapter内部具体处理逻辑

典型应用  
### 1）在xml布局文件中创建一个RecyclerView的布局

```
<android.support.v7.widget.RecyclerView
        android:id="@+id/rv_fundlist"
        android:cacheColorHint="@null"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" /> 
```

### 2）RecyclerView绑定Adapter

```
mAdapter = new FundListAdapter();
mBinding.rvFundlist.setNestedScrollingEnabled(false);
mBinding.rvFundlist.setLayoutManager(
        new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
mBinding.rvFundlist.setAdapter(mAdapter);
mBinding.rvFundlist.addItemDecoration(new NoBottomLineItemDecoration(getContext(), R.drawable.divide_left_right_miss));
```
### 3）Adapter设置数据

```
List<FundBean> fundList = new ArrayList<FundBean>();
...
mAdapter.addData(fundList); //添加数据
mAdapter.setData(fundList); //设置数据，原有数据将被清空
```
 
### 4）Adapter的创建

```
public class FundListAdapter
        extends EmfRecyclerViewAdapter<ItemFundlistBindingistBinding, FundBean> {

    @Override
    public EmfRecyclerViewHolder<ItemFundlistBinding> onCreateViewHolder(
            ViewGroup parent, int viewType) {
        ItemFundlistBinding binding = DataBindingUtil
                .inflate(LayoutInflater.from(parent.getContext()),
                        R.layout.item_fundlist, parent, false);
        return new EmfRecyclerViewHolder<>(binding);
    }

    public class ViewHolder extends EasyRecyclerViewHolder<ItemFundlistBinding, FixedFinanceBean>{

        public ViewHolder(ItemFundlistBinding itemBinding) {
            super(itemBinding);
        }

        @Override
        public void bind(FixedFinanceBean bean) {
            super.bind(bean);
            //数据填充    
            binding.tvTitle.setText(bean.getProductName());
      			 ...
      	}
    }
}
```
### 5）点击事件处理

```
 mAdapter.setOnItemClickListener(
        new EasyRecyclerViewHolder.OnItemClickListener<FixedFinanceBean>() {
            @Override
            public void onItemClick(int position, FixedFinanceBean bean) {
                ...
            }
        });
```
