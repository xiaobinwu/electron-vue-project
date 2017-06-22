import { remote, shell } from 'electron'

const { Menu, MenuItem } = remote
// 右键菜单-渲染进程
export const createContextMenu = function (menuItems) {
    const menu = new Menu()
    menuItems.forEach(menuItem => {
        menu.append(new MenuItem(menuItem))
    })
    window.addEventListener('contextmenu', e => {
        e.preventDefault()
        menu.popup(remote.getCurrentWindow())
    }, false)
}

// 应用菜单
export const createApplicationMenu = function () {
    const template = [
        // {
        //     label: '编辑',
        //     submenu: [
        //         {
        //             label: '撤销',
        //             accelerator: 'CmdOrCtrl+Z',
        //             role: 'undo'
        //         },
        //         {
        //             label: '重做',
        //             accelerator: 'Shift+CmdOrCtrl+Z',
        //             role: 'redo'
        //         },
        //         {
        //             type: 'separator'
        //         },
        //         {
        //             label: '剪切',
        //             accelerator: 'CmdOrCtrl+X',
        //             role: 'cut'
        //         },
        //         {
        //             label: '复制',
        //             accelerator: 'CmdOrCtrl+C',
        //             role: 'copy'
        //         },
        //         {
        //             label: '黏贴',
        //             accelerator: 'CmdOrCtrl+V',
        //             role: 'paste'
        //         },
        //         {
        //             label: '全选',
        //             accelerator: 'CmdOrCtrl+A',
        //             role: 'selectall'
        //         }
        //     ]
        // },
        {
            label: '视图',
            submenu: [
                {
                    label: '重载',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.reload()
                        }
                    }
                },
                {
                    label: '切换全屏显示',
                    accelerator: (function () {
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F'
                        } else {
                            return 'CmdOrCtrl+F11'
                        }
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                        }
                    }
                }
            ]
        },
        {
            label: '窗口',
            role: 'window',
            submenu: [
                {
                    label: '最小化',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: '关闭',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                }
            ]
        },
        {
            label: 'Toggle Developer Tools',
            accelerator: (function () {
                if (process.platform === 'darwin') {
                    return 'Alt+Command+I'
                } else {
                    return 'F12'
                }
                })(),
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        },
        {
            label: '帮助',
            role: 'help',
            submenu: [
                {
                    label: '关于系统',
                    click: function () { shell.openExternal('http://electron.atom.io') }
                },
                {
                    label: '五洲会商城',
                    click: function () { shell.openExternal('http://www.wzhouhui.com') }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}