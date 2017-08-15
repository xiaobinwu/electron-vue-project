var grunt = require('grunt')

// 配置
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            authors: 'xiaobinwu <xiaobin_wu@yahoo.com>',
            projectUrl: '',
            appDirectory: './package/TEST-win32-x64', // 要打包的输入目录
            outputDirectory: './package_dir', // grunt打包后的输出目录
            exe: 'TEST.exe',
            description: 'My Superb Vue Project For Electron',
            setupIcon: './app/hots.ico',
            noMsi: true
        }
    }
})

// 加载任务
grunt.loadNpmTasks('grunt-electron-installer')

// 设置为默认
grunt.registerTask('default', ['create-windows-installer'])