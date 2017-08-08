'use strict'
const electron = require('electron')
const path = require('path')
// 控制生命周期模块
const app = electron.app
// 创建原生窗口模块
const BrowserWindow = electron.BrowserWindow
// 表示一个图标，处于正在运行的系统通知区，通常被添加到一个 context menu 上
const Tray = electron.Tray
const Menu = electron.Menu

// 主线程ipc
const ipcMain = electron.ipcMain

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let mainWindow

const isDev = process.env.NODE_ENV === 'development'

let config

if (isDev) {
    config = require('../build/config')
} else {
    config = {}
}

console.log(path.join(__dirname, '/hots.png'))

function createWindow () {
    // 创建主体窗口
    mainWindow = new BrowserWindow({
        frame: false,
        width: 1024,
        height: 768,
        resizable: false,
        backgroundColor: '#FFF',
        icon: path.join(__dirname, 'hots.png')
    })
    mainWindow.setFullScreen(true)
    // 加载应用的 index.html
    const url = isDev ? `http://localhost:${config.port}` : `file://${__dirname}/dist/index.html`
    mainWindow.loadURL(url)

     // 打开开发者工具
    if (isDev) {
        // 扩展 Vue_DevTools[electron-devtools-installer-第三方插件]
        mainWindow.webContents.openDevTools()
        const installExtension = require('electron-devtools-installer')
        installExtension.default(installExtension.VUEJS_DEVTOOLS)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('An error occurred: ', err))
    }

    // 当 window 被关闭，这个事件会被触发
    mainWindow.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素
        mainWindow = null
    })

    // 下载文件
    mainWindow.webContents.session.on('will-download', (e, item) => {
        // 获取文件的总大小
        const totalBytes = item.getTotalBytes()

        // 设置文件的保存路径，此时默认弹出的 save dialog 将被覆盖
        // const filePath = path.join(app.getPath('downloads'), item.getFilename())
        // item.setSavePath(filePath)

        // 监听下载过程，计算并设置进度条进度
        item.on('updated', () => {
            mainWindow.setProgressBar(item.getReceivedBytes() / totalBytes)
        })

        // 监听下载结束事件
        item.on('done', (e, state) => {
            // 如果窗口还在的话，去掉进度条
            if (!mainWindow.isDestroyed()) {
                mainWindow.setProgressBar(-1)
            }

            // 下载被取消或中断了
            if (state === 'interrupted') {
                mainWindow.webContents.send('downloads-msg', 0, `下载失败，文件 ${item.getFilename()} 因为某些原因被中断下载`)
            }

            // 下载完成，让 dock 上的下载目录Q弹一下下
            if (state === 'completed') {
                mainWindow.webContents.send('downloads-msg', 1, '下载成功')
            }
        })
    })

    // Tray（系统通知区）
    let trayIcon = null
    if (process.platform === 'darwin') {
        trayIcon = new Tray(path.join(__dirname, 'tray-iconTemplate.png'))
    } else {
        trayIcon = new Tray(path.join(__dirname, 'tray-icon-alt.png'))
    }
    const contextMenu = Menu.buildFromTemplate([
        { label: '意见反馈', click: () => { createFeedbackWindow() } },
        { label: '关于系统', click: () => { createAboutWindow() } },
        { label: '退出系统', click: () => { app.quit() } }
    ])
    trayIcon.setToolTip('xxx-门店系统')
    trayIcon.setContextMenu(contextMenu)
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// ipc通讯
ipcMain.on('close-main-window', function () {
    app.quit()
})

// 关于系统窗口
let aboutWindow
function createAboutWindow () {
    if (aboutWindow) {
        return
    }
    aboutWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    })

    aboutWindow.loadURL(`file://${__dirname}/subsidiary/about/index.html`)

    aboutWindow.on('closed', function () {
        aboutWindow = null
    })
}

// 意见反馈窗口
let feedbackWindow
function createFeedbackWindow () {
    if (feedbackWindow) {
        return
    }
    feedbackWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    })

    feedbackWindow.loadURL(`file://${__dirname}/subsidiary/feedback/index.html`)

    feedbackWindow.on('closed', function () {
        feedbackWindow = null
    })
}
