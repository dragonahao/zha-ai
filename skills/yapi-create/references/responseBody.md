# 响应体类解读
接口路径：GET /iMTT/doctor/patient/infoV2
apiDefinition 返回参数的的值： 
```html
traceId	string	
非必须
code	integer	
非必须
message	string	
非必须
data	object	
非必须
备注:

projectCode	string	
非必须
项目code	
siteId	integer	
非必须
site
```
我们生成的响应体类名是 `PatientInfoV2ResponseBody`，
我应该将 data 字段直接展开到 ResponseBody 中，而不是单独创建  Data 类
``` java
class PatientInfoV2ResponseBody{
    String projectCode;
    int siteId;
}
```