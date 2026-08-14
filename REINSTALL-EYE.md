# 重启后快速恢复 eye 插件(2 分钟)

动态插件是会话级的,服务重启后失效。按下面步骤重装。

## 步骤

1. 打开 DSH Web 界面,新开/复用会话
2. 把本文件内容发给 AI(或直接说"用 plugins/eye/host.js 和 client.js 重装 eye 插件"):

> 请用 `plugins/eye/host.js` 的内容作为 code.host、`plugins/eye/client.js` 的内容作为 code.client,
> 用 cordis_define 重建插件(idPrefix: "eye"),然后 cordis_run 激活并在界面批准。

3. 批准后,侧边栏出现 **👁 诊断 / 切换到eye** 按钮;设置里出现 **eye 视觉桥** 页面
4. **无需再切换模型**:settings.yaml 里默认模型已持久化为 `eye-vision/deepseek-v4-flash`,
   重装后自动生效,直接拖图上传即可

## 如果重启后模型报错(还没重装时)

打开模型选择器,把当前模型切回 `deepseek-official / deepseek-v4-flash`(或重装 eye 插件后自动恢复 eye-vision)。

## 文件位置

- 插件源码:`D:\WORK_VSCODE\Vibe-coding\deepseekH\plugins\eye\host.js`、`client.js`
- 运行时脚本/配置:`D:\WORK_VSCODE\Vibe-coding\deepseekH\.eye\`(eye.config.json 含 VLM key,已 gitignore)
- 已推送 GitHub:dsh-eye / dsh-workspace
