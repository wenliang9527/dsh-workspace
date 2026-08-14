# 安装指南:把"一键启动器"装成 DSH 插件

目标:别人的 DSH Web 界面侧边栏底部出现 **⚡ 启动器** 按钮,点击即在当前工作区生成
`start-dsh.bat` + `DeepSeekHarness.exe`。

## 方法 A:让 AI 帮你装(推荐)

把下面的说明整段发给对方 DSH 会话里的 AI:

> 请帮我安装一个动态 Cordis 插件(名称:One-Click Launcher):
> 1. 用 cordis_define 新建插件,idPrefix 用 `launch`
> 2. code.host 的内容见 `host.js` 文件,code.client 的内容见 `client.js` 文件(把文件内容完整贴给 AI,或让 AI 读取文件)
> 3. 然后用 cordis_run 激活,等待授权批准
> 4. 激活后检查:侧边栏底部应有"⚡ 启动器"按钮

## 方法 B:手动步骤

1. 打开 DSH Web 界面,新建会话
2. 让 AI 依次执行:
   - `cordis_define`:`plugin.kind = "new"`,`idPrefix = "launch"`,`name = "One-Click Launcher"`
   - `code.host` ← 粘贴 `host.js` 全部内容
   - `code.client` ← 粘贴 `client.js` 全部内容
3. `cordis_run` 激活返回的 pluginId/packageId,在界面上批准授权
4. 侧边栏底部出现 **⚡ 启动器** 按钮,点击即在工作区生成启动器文件

## 说明

- 插件是**会话级**的:重启 Harness 后按钮消失,但生成的文件永久保留,双击照常可用。
- 插件生成的是 `start-dsh.bat`(便携版:首次运行自动装 dsh 依赖),exe 由 bat 首次运行时自动生成。
- 要求:目标机器是 Windows(生成的是 Windows 启动器);目标会话的沙箱模式允许写工作区(默认 workspace-write 即可)。
- 按钮点击失败时,按钮旁会显示红色错误信息,把内容发给 AI 排查。
