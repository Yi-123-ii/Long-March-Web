@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 请先安装 Node.js 18 或更高版本，然后重新双击此文件。
  echo 下载地址：https://nodejs.org/
  pause
  exit /b 1
)
echo 山河印记 - 本地预览
echo 网页地址：http://127.0.0.1:5173
echo 保持此窗口开启，关闭窗口后本地服务会停止。
node server.mjs --open
pause
