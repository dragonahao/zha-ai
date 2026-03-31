---
name: yapi-create
description: 解读yapi文档,从yapi接口文档中创建实体类文件
---

# 用户输入

- 输入一个包含`https://yapi.lucahealthcare.cn/`的URL地址,存放在变量`userUrl`

# 加载URL地址并解读返回值

尝试从最外层的项目目录的文件`yapi.env`(ls 来查找是否存在)中读取用户名称`userName`和密码`userPwd`,如果`yapi.env`文件存在，保存到`envPath`中

```bash
    python3 yapi-create.py "${userUrl}" "${userName}" "${userPwd}"
```

- **失败**:需要启用[登录逻辑]
- **成功**:直接把内容存放在变量`apiDefinition`中

# 登录逻辑

1. **输入用户名称**:存放在变量`userName`中
2. **输入用户密码**:存放在变量`userPwd`中
3. 等待用户输入
4. **执行登录脚本**

```bash
    python3 yapi-create.py "${userUrl}" "${userName}" "${userPwd}"
```

5. 输出脚本返回的内容,存放在变量`apiDefinition`中

# 创建接口文件

## **第一步(用户输入保存目录)**
- 请输入文件保存的目录
- 等待用户输入保存的目录,保存到变量`${saveDir}`中

## **第二步(询问需要使用的语言)**:
- 请选择需要使用的语言菜单:["java","kotlin","swift","oc","dart","python","typescript","javascript"]

## **第三步(生成接口文件)**:
- 确保目录存在
```bash
    mkdir -p "${saveDir}"
```
- 根据文件名规则，大驼峰拼接,保存到`${saveDir}`

### 文件数量控制与初始化

| 语言       | 文件后缀 | 所有类在同一个文件 |
| ---------- | -------- | ------------------ |
| java       | .java    | 否                 |
| kotlin     | .kt      | 是                 |
| swift      | .swift   | 是                 |
| oc         | .h       | 是                 |
| oc         | .m       | 是                 |
| dart       | .dart    | 是                 |
| python     | .py      | 是                 |
| typescript | .ts      | 是                 |
| javascript | .js      | 是                 |

### 解读规则

#### 规则与约束

1. 类名规则，大驼峰拼接
2. 不需要init方法
3. 对于.m不需要显式写 @synthesize,对于.py不需要to_dict/from_dict方法,对于.dart必需读取模板`reference/fileName.dart`并保留全参数构造方法
4. swift类需要使用Codable协议
5. 解读返回参数时将 data 字段直接展开到 ResponseBody 中，而不是单独创建 Data 类
6. 构建纯粹的实体类，不包含任何业务逻辑和初始化方法

#### 1.从`apiDefinition`中解读基本信息

- 输出基本信息
- 解读基本信息中的"接口路径"属性`method`和`method_url`，取`method_url`后两个单词，依次放入变量`UrlSliceA`,`UrlSliceB`

#### 2.从`apiDefinition`中解读请求参数

- **Headers 请求头参数**
- **Body 请求体类型**，`${UrlSliceA}${UrlSliceB}RequestBody`

#### 3.从`apiDefinition`中解读返回参数中的data属性

- 返回参数说明: 固定结构包含了 ``traceId`、`code`、`message`、`data`
- 响应体类型的数据源: **仅解析 data 字段内部的业务属性**，所有回答、解释、字段说明均只围绕 data 对象内容展开
- **不解读属性说明**: 与`data`同一层级的`traceId`,`code`,`message`不解读、不分析、不展开、不生成说明
- 响应体类名称规则: `data`对象名称就是`${UrlSliceA}${UrlSliceB}ResponseBody`，我应该将 data 字段直接展开到 ResponseBody 中，而不是单独创建 Data 类
- 内部子对象名称规则: `data`对象内部子对象名称 `${UrlSliceA}${UrlSliceB}Data${PropertyKey}`
- 必需阅读[responseBody.md](references/responseBody.md)

# 文件生成完成

- 提示文件生成完成
- 提示请求方法:"${method}"
- 提示接口路径:"${method_url}"
- 提示生成的文件名称
