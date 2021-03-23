# pos-file README

pos-file是一个专为千牵科技POS收银端服务的文件创建插件。开发这个插件的目的在于确保每个开发者的代码组织风格接近，每个新文件都尽量符合新框架的代码结构和代码分层，让开发者花更多的时间专注业务逻辑的开发。

## Features

> - 仅开发语言为TypeScript时才会启用插件。
> - 插件支持以下右键菜单：
>
> 1. createPage：一键创建功能
> 2. createAllModel：一键创建model层所有文件
> 3. createDao：一键创建dao层文件
> 4. createModel：一键创建model层文件
> 5. createService：一键创建service层文件
> 6. createView：一键创建view层文件（会自动添加路由）
> 7. createApi：一键创建api层文件
> 8. createPopup: 一键创建弹窗文件‘
> 9. createRoute: 一键添加路由（createView时会自动添加路由，目前仅备用）

## Requirements

确保pos项目目录下的src目录存在，确保鼠标右键针对src目录

## Extension Settings

* 右键src文件夹显示命令列表
* 暂不支持快捷键（后续考虑支持）

## Known Issues

欢迎大家提bug和提出可能的优化点 [抱拳][抱拳]

## Release Notes

### 0.0.1

- test


### 1.0.0

- 正式版本


### 1.1.0

- 2021/03/23【新增】 新增一键创建弹窗文件功能

### 1.1.1

2021/03/23【新增】 新增一键创建路由功能

2021/03/23【更新】更新createView命令，运行createView创建页面后会自动为页面添加路由



