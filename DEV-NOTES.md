# DEV-NOTES — eye 插件开发上下文(会话压缩前的固化笔记)

> 本文件保存了开发 eye 插件所需的全部关键上下文。会话被 `/compact` 压缩后,
> 把本文件内容发给 AI 即可恢复完整上下文。

## 1. 工作区与仓库

- 工作区:`D:\WORK_VSCODE\Vibe-coding\deepseekH`(主仓 `dsh-workspace`,remote: https://github.com/wenliang9527/dsh-workspace.git)
- 插件目录:`plugins/<name>/`,每个插件一个独立仓库,主仓经 git submodule 挂载
  - `plugins/one-click-launcher` → `dsh-one-click-launcher`(已完成的一键启动器插件,含 plugin/host.js + client.js 完整可运行示例)
  - `plugins/eye` → `dsh-eye`(骨架,待开发)
- 克隆工作区:`git clone --recursive https://github.com/wenliang9527/dsh-workspace.git`
- 本地启动 Harness:`npm run dsh` / `npm start`,或双击根目录 `start-dsh.bat`(本地用,不入库)

## 2. 动态插件标准流程(每轮开发都这样)

1. `cordis_define`:新建插件用 `plugin.kind: "new"` + `idPrefix`(3-6 小写字母,如 `eye`);修改用 `kind: "existing"` + 原 pluginId
2. `code.host` / `code.client` 是**纯 JS 函数体**,返回 Cordis Plugin(`return { apply(ctx) {...} }`);禁 JSX/TS/import
3. `cordis_run` 激活(`run` 首次/`update` 换版本);Client 包需要用户在界面批准授权
4. 失败修法:读 `cordis_inspect_self(pluginId, packageId)` 诊断 → `cordis_define` 追加新 Package(不覆盖旧包)→ 重跑
5. 动态插件是**会话级**的,重启即失;产物要落盘/提交才持久

## 3. Host 半区关键契约(踩坑总结)

- 服务用 `ctx.get('name')` + 判空;硬依赖才 `inject: ['name']`
- 写文件:`const fs = ctx.get('fs')`;`const sp = ctx.get('sandboxPolicy')`;`sp.resolve()` 返回含 `workspaceRoot` 的策略;`await fs.resolve('文件名', { cwd: root })` → `fs.writeText(target, content, undefined, undefined, policy)`
- Client RPC:`harness.handle('方法名', async (args) => json)`;Client 端 `host.call('方法名', args)`;只传 JSON
- 动态工具三步(注意契约!):
  - `const tool = harness.defineTool({ name, description, parameters, output: { schema, render, presentationMeta? }, execute })`
  - `output.schema` 用**值模式 DSL**:必填是属性级 `{ type: 'boolean', required: true }`;object 必须显式 `additionalProperties: true|false`;**没有**顶层 required 数组
  - `output.render(args, value)` 必须返回**内容块数组**:`[{ type: 'text', text: '...' }]`
  - `execute(args, exec)` 返回 JSON
  - 注册:`harness.registerTool(ctx, tool)` —— 必须是 defineTool 的返回值,否则报 "dynamic tool registration must use a tool returned by harness.defineTool"
- 清理:apply 里收集 disposer(harness.handle/registerTool 都返回函数),`return () => {...}` 统一释放

## 4. Client 半区关键契约

- 插槽:`const slots = ctx.get('slots')` 判空;`slots.inject('插槽名', () => slots.register({ name, id, order, label }, (props) => 组件))`
- 注册 UI 前必须 `cordis_inspect_query`(Slots.listSubTree,不传 root 看目录 / 传 root 看契约+occupants)
- 侧边栏底部按钮:`sidebar.footer.action`(list 型,registration 需 `id`;ownerProps 只有 `{ wide }`;label 可为函数)
- React 只用 `React.createElement(...)`;样式可用 `styles.insert(css)` 或内联 style;状态用 `React.useState/useEffect`
- 错误提示:按钮旁内联红/绿文字即可

## 5. 工具/环境注意

- 受限沙箱下:PowerShell/curl/git 的 HTTPS 会报 `SEC_E_NO_CREDENTIALS`(schannel 限制)→ npm install / git push / git submodule 需要 `sandbox_permissions: "danger-full-access"` 重试一次;Node/Go(gh/npm fetch)自带 TLS 不受影响
- `git submodule add` 需要完整权限(cygwin sh 信号管道);插件目录内已有 .git 时 submodule add 会直接登记("Adding existing repo")
- Windows 批处理坑:bat 必须 **CRLF** 换行 + 纯 ASCII(避免 cmd 解析 bug 导致闪退);避免多行括号块,用 goto
- exe 启动器(one-click-launcher)是 csc 编译的 C#(launcher.cs),base64 内嵌在 bat 里首次运行自举生成

## 6. eye 骨架现状

- `plugins/eye/host.js` / `client.js`:`apply(ctx)` 全注释骨架,可直接 define 加载(空插件不报错)
- `plugins/eye/README.md`:占位说明
- 待定:eye 的功能需求(等用户说明后再实现)

## 7. 常用参考

- 完整可运行示例:`plugins/one-click-launcher/plugin/host.js`、`client.js`、`INSTALL.md`
- 插件安装到其他 DSH 会话:把 host.js/client.js 喂给对方的 cordis_define
- 开发新插件流程:见工作区 README「开发新插件」一节
