# NornJ-cli
The CLI for scaffolding NornJ template projects, and do more things.

### 安装

```sh
npm install -g nornj-cli
```

### 使用方法

#### 创建项目初始代码

* 在当前目录下创建新项目目录：

```sh
nj init # 或nj i

Template Name: react-mobx  # 项目模板名称
Project Name: projectName  # 新创建的项目名称
Do you need to use layout on server side(Y/N)?  # 是否使用服务端layout
```

#### 在已有代码中增加新页面

* 进入已有项目目录后，输入如下命令创建新页面：

```sh
nj add page # 或nj ap

Template Name: react-mobx  # 项目模板名称
Page Name: pageName  # 新创建的页面名称
Do you need to use layout on server side(Y/N)?  # 是否使用服务端layout
```

#### 选择项目模板

| 名称           | 描述                      |
|:---------------|:-------------------------|
| react-mobx     | 基于React+Mobx的多页面项目 |
| react-mobx-ls  | 基于React+Mobx的多页面项目(接入零智平台) |
| react-mst      | 基于React+Mobx-state-tree的单页面项目 |

#### 查看cli当前版本

```sh
nj version  # 或nj v
```

#### cli版本更新

```sh
nj upgrade  # 更新cli到最新版
```

## License

MIT