# ⚡ dsh Plugins Workspace

DeepSeek Harness 插件开发工作区:一个插件项目一个文件夹(各自独立 GitHub 仓库,主仓用 submodule 引用)。

**Topics:** `dsh-plugin` · `deepseek-harness` · `one-click-launcher` · `windows` · `bat`

## 仓库清单

| 仓库 | 说明 |
|---|---|
| [dsh-workspace](https://github.com/wenliang9527/dsh-workspace) | 本工作区(README、package.json,submodule 引用各插件) |
| [dsh-one-click-launcher](https://github.com/wenliang9527/dsh-one-click-launcher) | ⚡ 一键启动器插件 |
| [dsh-eye](https://github.com/wenliang9527/dsh-eye) | 👁 eye 插件 |

克隆工作区(含所有插件):

```sh
git clone --recursive https://github.com/wenliang9527/dsh-workspace.git
```

## 目录结构

```
deepseekH\
├── plugins\                        # 插件项目(每个插件 = 一个独立仓库,经 submodule 挂载)
│   ├── one-click-launcher\         # ⚡ 一键启动器插件 → dsh-one-click-launcher
│   │   ├── start-dsh.bat           #   主启动器(便携版:自动装依赖 + 自动生成 exe)
│   │   ├── DeepSeekHarness.exe     #   exe 壳
│   │   ├── make-launcher.ps1       #   独立生成器(免 DSH,任何 Windows 机器可用)
│   │   ├── launcher.cs             #   exe 的 C# 源码
│   │   ├── README.md               #   该插件的使用说明
│   │   └── plugin\                 #   DSH 动态插件源码
│   │       ├── host.js             #     Host 半区
│   │       ├── client.js           #     Client 半区
│   │       └── INSTALL.md          #     安装到 DSH 会话的步骤
│   └── eye\                        # 👁 eye 插件(骨架)→ dsh-eye
├── package.json                    # 工作区 npm 配置(dsh CLI)
├── start-dsh.bat                   # 本工作区自己的启动器(本地使用,不入库)
├── DeepSeekHarness.exe             # 同上
└── README.md
```

## 现有插件

### ⚡ one-click-launcher(一键启动器)

双击即启动 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness),不用记任何命令。

**快速使用**:把 `plugins/one-click-launcher/` 整个文件夹复制到目标机器(Windows),双击 `start-dsh.bat`(或 `DeepSeekHarness.exe`)。首次运行自动 `npm install -D @deepseek-ai/dsh`(需联网),之后浏览器打开终端显示的地址(默认 `http://127.0.0.1:3080`)。使用期间保持窗口打开,关窗 = 关闭 Harness。

**安装为 DSH 插件(侧边栏 ⚡ 启动器 按钮)**:已经在跑 DSH Web 界面的机器,可把生成器装成动态插件:

1. 在 DSH 会话里让 AI 用 `cordis_define` 新建插件(`idPrefix: "launch"`)
2. `code.host` ← `plugins/one-click-launcher/plugin/host.js` 的内容
3. `code.client` ← `plugins/one-click-launcher/plugin/client.js` 的内容
4. `cordis_run` 激活并在界面批准授权
5. 侧边栏底部出现 **⚡ 启动器** 按钮,点击即在工作区生成 `start-dsh.bat` + `DeepSeekHarness.exe`

> 详细步骤见 `plugins/one-click-launcher/plugin/INSTALL.md`。插件是会话级的,重启后按钮消失,但生成的文件永久可用。

## 开发新插件

1. 在 `plugins/` 下新建项目文件夹:`plugins/<my-plugin>/`
2. 按需创建文件:`host.js`(Host 半区)、`client.js`(Client 半区)、`README.md`
3. 在本工作区的 DSH 会话里用 `cordis_define` 加载调试(流程参考 `plugins/one-click-launcher/plugin/INSTALL.md`)
4. 开发期复用工作区根部的 `package.json` / `node_modules`,用 `npm run dsh` 或 `npm start` 启动 Harness
5. 成熟后独立建仓:在插件目录内 `git init` + 建 GitHub 仓库推送,然后回主仓:
   ```sh
   git submodule add https://github.com/<你>/<dsh-插件名>.git plugins/<my-plugin>
   ```

> 小技巧:插件目录内已有独立 `.git` 时,`git submodule add` 会直接把它登记进主仓("Adding existing repo"),无需重新克隆。

## 说明

- 仅限 Windows(bat/exe 为 Windows 专属)
- exe 是 bat 的壳,两者需放在同一目录;exe 未签名,SmartScreen 提示时点"仍要运行"
- 端口 3080 被占用时提示 `EADDRINUSE`,先关闭旧实例
- 需要 Node.js(npm):https://nodejs.org
- 根目录的 `start-dsh.bat` / `DeepSeekHarness.exe` 是**本工作区的本地启动器**(已在 .gitignore,不入库);`plugins/one-click-launcher/` 内的才是分发用成品
