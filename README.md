# E-Book

[前端代码](https://github.com/Uric369/E-Book/tree/frontend)

[后端代码](https://github.com/Uric369/E-Book/tree/backend)

## 基本功能
### 用户管理
- 管理员身份登录后可以进行用户管理，包括禁用/解禁用户
- 用户分为顾客和管理员，具有不同的界面和权限
- 用户登录需要用户名和密码，新用户需要注册并填写相关信息

### 书籍管理
- 管理员可以浏览已有书籍并进行搜索、修改、删除和添加操作
- 包括书名、作者、封面、ISBN编码和库存量信息的编辑
- 书籍列表以列表形式展示

### 浏览书籍
- 顾客和管理员都可以浏览数据库中已有的书籍
- 提供搜索功能，并能查看书籍详细信息
- 可以将书籍放入购物车进行购买

### 购买书籍
- 用户可以将书籍放入购物车，并在购物车中进行结算
- 结算后清空购物车，并更新书籍库存
- 生成订单并存入数据库

### 订单管理
- 顾客和管理员可查看订单并使用搜索功能进行过滤

### 统计
- 管理员可以统计销售情况和用户消费情况，并以图表展示
- 顾客可以统计自己的购书情况

## 技术栈
- 前端: React
- 后端: SpringBoot、Maven
- 数据库: MySQL、Redis、MongoDB、Neo4j、InfluxDB
- 中间件: Kafka、WebSocket、Eureka、Nginx
- 其他: Docker、Spark、Hadoop

## 技术概述
- Kafka 实现下订单消息队列
- Transaction 保证下订单事务的原子性，实现异常回滚
- Redis 缓存数据库书籍信息，提高访问速度
- Microservice 将后端分离为微服务，使用 Eureka Server 和 Eureka Client 构建 SpringBoot 微服务架构，实现服务解耦，使用 Gateway 进行路由
- MongoDB 将用户头像转换为base64 字符串存入，实现数据库表分离
- Neo4j 为书籍添加标签，可供查询标签关系以及相似书籍查找
- Nginx 构建集群，实现负载均衡
- Docker 容器化后端
- InfluxDB 监控系统
