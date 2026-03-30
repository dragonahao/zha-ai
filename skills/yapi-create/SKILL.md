---
name: yapi
description: 从yapi接口文档中创建实体类文件,解读yapi文档
---

# 用户输入
- 输入一个包含`https://yapi.lucahealthcare.cn/`的URL地址,存放在变量`userUrl`

# 加载URL地址并解读返回值
```bash
    python3 yapi.py "${userUrl}"
```
- **失败**:需要启用[登录逻辑]
- **成功**:直接把输出内容,存放在变量`apiDefinition`中
  
# 登录逻辑
尝试从 .yapi-env(可能在最外层的项目目录)中读取用户名称和密码
1. **输入用户名称**:存放在变量`userName`中
2. **输入用户密码**:存放在变量`userPwd`中
3. 等待用户输入
4. 如果.yapi-env文件存在，保存到`envPath`中
5. **执行登录脚本**   
```bash
    python3 yapi-bean.py "${userUrl}" "${userName}" "${userPwd}" "${envPath}"
```
5. 输出脚本返回的内容,存放在变量`apiDefinition`中

# 创建接口文件
如果用的语言是java,需要分多个文件存储，否则只需要一个生成的文件来存储;如果是语言oc需要同时生成.h和.m文件

## **第一步(用户输入保存目录)**
    - 请输入文件保存的目录
    - 等待用户输入保存的目录,保存到变量`${saveDir}`中
## **第二步(询问需要使用的语言)**: 
    - 请选择需要使用的语言:["java","kotlin","swift","oc","dart","python","typescript","javascript"]
## **第三步(生成接口文件)**:  
    - 根据文件名规则，大驼峰拼接,保存到`${saveDir}`
1. 从`apiDefinition`中解读基本信息
    - 输出基本信息
    - 解读基本信息中的"接口路径"属性`method`和`method_url`，取`method_url`后两个单词，依次放入变量`UrlSliceA`,`UrlSliceB`
2. 从`apiDefinition`中解读请求参数
    - **Headers 请求头参数**
    - **Body 请求体类型**，类名规则，大驼峰拼接 `${UrlSliceA}${UrlSliceB}RequestBody`
3. 从`apiDefinition`中解读返回参数
    - **返回数据 响应体类型**，类名规则，大驼峰拼接 `${UrlSliceA}${UrlSliceB}ResponseBody`，内部子对象，用对应的大驼峰`${UrlSliceA}${UrlSliceB}${PropertyKey}`


# 文件生成完成
- 提示文件生成完成
- 提示请求方法:"${method}"
- 提示接口路径:"${method_url}"
- 提示生成的文件名称

