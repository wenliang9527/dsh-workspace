# 重启后恢复指南(永久插件已安装)

## 当前状态(永久插件 dsh-eye-host 已安装)

**Host 核心能力重启后自动生效,无需任何操作:**
- eye-vision 模型路由 + 聊天图片自动转文本 + eye_see 工具
- 默认模型已持久化为 eye-vision,直接拖图上传即可

**重启后消失的(会话级,正常):**
- 侧边栏"👁 诊断 / 切换到eye"按钮
- 设置 → eye 视觉桥 页面
- 配置请直接编辑 `D:\WORK_VSCODE\Vibe-coding\deepseekH\.eye\eye.config.json`

## ⚠️ 不要重装完整会话级插件

永久插件已注册 eye-vision 提供商,再装会话级插件会报
`DUPLICATE_ADAPTER` 导致激活失败。**核心功能已够用,不需要重装。**

## 如果永久插件没有生效(排障)

1. 确认包在 loader 的解析路径:
   - `D:\WORK_VSCODE\Vibe-coding\deepseekH\node_modules\dsh-eye-host\`(package.json + index.js)
   - 若 dsh 从 npx 缓存启动,需复制到 `C:\Users\46166\AppData\Local\npm-cache\_npx\1e7f6d9597241db0\node_modules\dsh-eye-host\`
2. 确认挂载文件:`C:\Users\46166\.dsh\cordis.patch.yml` 存在且含:
   ```yaml
   - id: eye-host
     name: dsh-eye-host
   ```
3. 在 DSH 会话里让 AI 检查工具注册表是否有 `eye_see`(有 = 生效)
4. 回滚:删除 `C:\Users\46166\.dsh\cordis.patch.yml`

## 文件位置

- 永久插件源码:`D:\WORK_VSCODE\Vibe-coding\deepseekH\plugins\eye\host-native\`
- 运行时脚本/配置:`D:\WORK_VSCODE\Vibe-coding\deepseekH\.eye\`
- GitHub:dsh-eye / dsh-workspace
