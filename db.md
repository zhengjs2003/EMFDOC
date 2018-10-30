## 数据库

    
EMF集成[Realm](https://github.com/realm/realm-java)，Realm是一款移动端数据库框架，核心数据引擎C++打造，比普通的Sqlite型数据库快的多。并且具有很多现代数据库的特性，比如支持JSON，流式api，数据变更通知，自动数据同步,简单身份验证，访问控制，事件处理，最重要的是跨平台，目前已有Java，Objective C，Swift，React-Native，Xamarin这五种实现。

典型应用  
### 1. 创建表  
Realm 数据模型定义需要继承自 RealmObject 类。一个数据模型对应一个表。  
ealm 支持以下字段类型：boolean、byte、short、int、long、float、double、String、Date和byte []。整数类型 short、int 和 long 都被映射到 Realm 内的相同类型（实际上为 long ）。
  
```
public class User extends RealmObject {
    private String name;
    private int age;
    private String email;
    ...  
}  
```
主键 (primary keys)  
@PrimaryKey 可以用来定义字段为主键，该字段类型必须为字符串（String）或整数（short、int 或 long）以及它们的包装类型（Short、Int 或 Long）。不可以存在多个主键。  
使用主键会对性能产生影响。创建和更新对象将会慢一点，而查询则会变快。

### 2. 增 操作
由于 Realm 对象都强依赖于 Realm，它们应该直接通过 Realm 被实例化：

``` 
realm.beginTransaction();
User user = realm.createObject(User.class); // Create a new object
user.setName("John");
user.setEmail("john@corporation.com");
realm.commitTransaction();
``` 

事务执行块（Transaction blocks）  

``` 
realm.executeTransaction(new Realm.Transaction() {
	@Override
	public void execute(Realm realm) {
		for(int i=0; i<100; i++){
			User user = realm.createObject(User.class);
			user.setName("John");
			user.setEmail("john@corporation.com");
		}
	}
});
``` 

异步事务（Asynchronous Transactions）  
事务会相互阻塞其所在的线程，在后台线程中开启事务进行写入操作可以有效避免 UI 线程被阻塞。

``` 
realm.executeTransactionAsync(new Realm.Transaction() {
    @Override
    public void execute(Realm bgRealm) {
        User user = bgRealm.createObject(User.class);
        user.setName("John");
        user.setEmail("john@corporation.com");
    }
}, new Realm.Transaction.OnSuccess() {
    @Override
    public void onSuccess() {
        // Transaction was a success.
    }
}, new Realm.Transaction.OnError() {
    @Override
    public void onError(Throwable error) {
        // Transaction failed and was automatically canceled.
    }
});
``` 

使用copyToRealmOrUpdate或copyToRealm方法插入数据  
当Model中存在主键的时候，推荐使用copyToRealmOrUpdate方法插入数据。如果对象存在，就更新该对象；反之，它会创建一个新的对象。若该Model没有主键，使用copyToRealm方法，否则将抛出异常。

``` 
final User user = new User();
      user.setName("Jack");
      user.setId("2");
      mRealm.executeTransaction(new Realm.Transaction() {
          @Override
          public void execute(Realm realm) {
              realm.copyToRealmOrUpdate(user);
          }
      });
``` 

### 3. 删 操作
使用deleteFromRealm()  

``` 
//先查找到数据
final RealmResults<User> userList = mRealm.where(User.class).findAll();
mRealm.executeTransaction(new Realm.Transaction() {
  @Override
  public void execute(Realm realm) {
      userList.get(0).deleteFromRealm();
  }
});
``` 
使用deleteFromRealm(int index)  

```
mRealm.executeTransaction(new Realm.Transaction() {
  @Override
  public void execute(Realm realm) {
		userList.deleteFromRealm(0); //使用index删除
		userList.deleteFirstFromRealm(); //删除user表的第一条数据
		userList.deleteLastFromRealm();//删除user表的最后一条数据
		results.deleteAllFromRealm();//删除user表的全部数据
  }
});

```

### 4. 改 操作

```
mRealm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        //先查找后得到User对象
        User user = mRealm.where(User.class).findFirst();
        user.setAge(26);
    }
});
```

### 6. 查 操作

Realm 中的所有读取（包括查询）操作都是延迟执行的，且数据绝不会被拷贝。  
查找操作并不需在事务中操作，直接查询即可。
findAll ——查询  

``` 
RealmResults<User> userList = mRealm.where(User.class).findAll();
``` 

findAllAsync——异步查询

``` 
//当数据量较大，可能会引起ANR的时候，就可以使用findAllAsync
RealmResults<User> userList = mRealm.where(User.class)
              .equalTo("name", "Gavin")
              .findAllAsync();
``` 

条件查询

``` 
RealmResults<User> userList = mRealm.where(User.class)
         .equalTo("name", "Gavin").findAll();
``` 
查询方法  

```
sum()：对指定字段求和。
average()：对指定字段求平均值。
min(): 对指定字段求最小值。
max() : 对指定字段求最大值。count : 求结果集的记录数量。
findAll(): 返回结果集所有字段，返回值为RealmResults队列
findAllSorted() : 排序返回结果集所有字段，返回值为RealmResults队列
between(), greaterThan(),lessThan(), greaterThanOrEqualTo() & lessThanOrEqualTo()
equalTo() & notEqualTo()
contains(), beginsWith() & endsWith()
isNull() & isNotNull()
isEmpty()& isNotEmpty()
```
RealmQuery以及or的使用

```
RealmResults<User> userList = mRealm.where(User.class)
          .equalTo("name", "Gavin")
          .or().equalTo("name", "Eric")
          .findAll();
```
排序

```
RealmResults<User> userList = mRealm.where(User.class) .findAll();
userList = result.sort("age"); //根据age，正序排列
userList = result.sort("age", Sort.DESCENDING);//逆序排列
```
### 6. 关系
多对一

```
public class Contact extends RealmObject {
    private Email email;  //声明一个 Realm 模型类的属性即可
    // Other fields…
}
```

多对多

```
public class Contact extends RealmObject {
    public String name;
    public RealmList<Email> emails;//使用 RealmList<T> 为一个对象关联0或多个其它对象
}
```

关联查询

```
public class Person extends RealmObject {
  private String id;
  private String name;
  private RealmList<Dog> dogs;
  // getters and setters
}

public class Dog extends RealmObject {
  private String id;
  private String name;
  private String color;
  // getters and setters
}

RealmResults<Person> persons = realm.where(Person.class)
                                .equalTo("dogs.color", "Brown")
                                .findAll();
```

### 7. 版本升级
当数据结构发生变化是，需要升级数据库。对于Realm来说，数据库升级就是迁移操作，把原来的数据库迁移到新结构的数据库。  
Realm 的数据模型用标准 Java 对象来定义，改变数据模型只需要改变数据对象定义即可。

如果没有旧 Realm 数据文件存在，那么代码的改变即会反应到相应的 Realm 数据文件改变。但如果已经有旧版本的 Realm 数据文件存在，Realm 会抛出异常提示数据库文件需要迁移。请在相应的 RealmConfiguration 设置 schema 版本和 migration 代码来正确处理并避免该异常抛出。

```
RealmConfiguration config = new RealmConfiguration.Builder()
    .schemaVersion(2) // Must be bumped when the schema changes
    .migration(new CustomMigration()) // Migration to run instead of throwing an exception
    .build()
```

```
/**
  * 升级数据库
  */
 class CustomMigration implements RealmMigration {
     @Override
     public void migrate(DynamicRealm realm, long oldVersion, long newVersion) {
         RealmSchema schema = realm.getSchema();
	     // 增加新的模型
	     if (oldVersion == 0) {
	        schema.create("Person")
	            .addField("name", String.class)
	            .addField("age", int.class);
	        oldVersion++;
	     }
	
	     // 在原模型上增加字段
	     if (oldVersion == 1) {
	        schema.get("Person")
	            .addField("id", long.class, FieldAttribute.PRIMARY_KEY)
	            .addRealmObjectField("favoriteDog", schema.get("Dog"))
	            .addRealmListField("dogs", schema.get("Dog"));
	        oldVersion++;
	     }
     }
 }
```

### 7. 支持数据库加密
Realm 文件可以通过传递一个512位（64字节）的密钥参数给 Realm.getInstance().encryptionKey() 来加密存储在磁盘上。

```
RealmConfiguration config = new RealmConfiguration.Builder()
  .encryptionKey(key)
  .build();
Realm realm = Realm.getInstance(config);
```