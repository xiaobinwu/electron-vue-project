<template>
    <header class="nav-bar">
        <span class="main-header-info">门店管理系统</span>
        <span class="main-header-info user" v-if="islogin">
            <i class="iconfont icon-user"></i>
            某某人
        </span>
        <span class="main-header-info time-clock">
            <i class="iconfont icon-time1"></i>
            {{nowTime}}
        </span>
        <span class="main-header-info refresh-window" @click="refreshWindow">
            <i class="iconfont icon-refresh"></i>
            刷新
        </span>
        <div class="operate-area pull-right">
            <template v-if="islogin">
                <a href="javascript:void(0);" class="logout" @click="logout">退出登录></a>
                <i class="iconfont icon-icon_shu shu"></i>
            </template>
            <i class="iconfont icon-jianhao" @click="hideWindow"></i>
            <i class="iconfont icon-window" @click="toggleWindowSize"></i>
            <i class="iconfont icon-guanbi1" @click="closeWindow"></i>
        </div>
    </header>
</template>
<script>
import { ipcRenderer, remote } from 'electron'
import { MessageBox, Message } from 'element-ui'
import { getNowFormatDate } from 'common/plugin/time'
import { removeStore } from 'common/plugin/storage'
import { loggedIn } from 'common/plugin/auth'

export default {
    data () {
        return {
            mainWindow: null,
            nowTime: ''
        }
    },
    created () {
        this.nowTimeCount()
        this.mainWindow = remote.getCurrentWindow()
    },
    methods: {
        hideWindow () {
            if (this.mainWindow.isMinimized()) {
                return
            }
            this.mainWindow.minimize()
        },
        toggleWindowSize () {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
        },
        closeWindow () {
            ipcRenderer.send('close-main-window')
        },
        logout () {
            const _self = this
            MessageBox.confirm('您将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeStore('userInfo')
                Message({
                    type: 'success',
                    message: '退出登录成功!',
                    duration: 1000,
                    onClose: function () {
                        _self.$router.push({ path: '/login', query: { redirect: _self.$route.fullPath }})
                    }
                })
            }).catch(() => {

            })
        },
        refreshWindow () {
            this.mainWindow.reload()
        },
        nowTimeCount () {
            const _self = this
            setInterval(() => {
                _self.nowTime = getNowFormatDate()
            }, 1000)
        }
    },
    computed: {
        islogin () {
            return loggedIn()
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.nav-bar{
    height: 30px;
    background-color: #601e39;
    padding: 0 20px;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    .operate-area,
    .refresh-window{
        -webkit-app-region: no-drag;
    }
    .main-header-info,
    .logout{
        color: #e0dcde;
        line-height: 30px;
        margin-right: 10px;
        text-shadow: 0 1px 1px #000;
        font-size: $size-base;
    }
    .refresh-window{
        cursor: pointer;
        margin-left: 40px;
        font-size: $size-h5;
    }
    .logout{
        vertical-align: top;
    }
    .iconfont{
        &:not(:last-of-type){
            margin-right: 10px;
        }
        &.shu{
            cursor: none;
            color: rgba(255,255,255, .2);
        }
        display: inline-block;
        color: $white;
        font-size: $size-base;
        cursor: pointer;
        vertical-align: top;
    }
    .operate-area{
        .iconfont{
            vertical-align: -webkit-baseline-middle;
        }
    }
    .time-clock,
    .user{
        font-size: $size-h5;
    }
    .time-clock{
        display: inline-block;
        width: 165px;
    }
}
</style>
