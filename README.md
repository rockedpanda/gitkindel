# 用于kindle阅读github源码的服务端程序

## 功能

* 支持文件目录查看
* 支持文件内容查看
* 支持语法高亮
[ ]JavaScript
[ ]Java
[ ]C++
* 支持指定源码地址

## 支持版本
* Kindle PaperWhite 1 2【1024×768】
* Kindle PaperWhite 3[1448*1072]

## 功能实现

### 源码拉取
根据github的项目名称，将代码checkout到临时目录temp下，根据同名文件夹解压缩。
临时文件夹每周清理一次。
目前只保留源码文件，即文件后缀为：js,txt,md,json,c,cpp,java,jsp,xml,pdf,properties,ini,html,yml,sh格式的文件；
图片文件只保留500kB以内的文件，格式为：jpg,png,gif,jepg;
其他格式的文件不保留。

临时文件夹temp与项目根目录平级存放，项目文件夹按照 用户名/项目名 两层格式存放。
举例: 对于项目 indexzero/http-server， 存放路径为 ${__dir}/temp/indexzero/http-server
对应的，在kindle上的访问地址为：
http://xxx.xxx.xxx/kpw/indexzero/http-server

### 文件展示
* 使用serve-index插件实现文件夹列表展示
* 对于单个文件，根据url路径判断文件是否存在，如果存在，则设置响应头 Content-Type:text/plain; charset=UTF-8 同时使用fs创建读取流，并把流pipe到res，实现文件查看（这样子在kindle上所有文件的查看均按照纯文本展示；图片不受此限制）

## TODO
* 屏蔽大文件展示
* 屏蔽压缩文件展示
* 增加文件格式过滤器[黑名单方式，根据后缀，没有后缀则放行]