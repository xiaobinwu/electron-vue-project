<template>
  <div id="app">
    <header class="nav-bar">
        <span class="main-header-info">门店管理系统</span>
        <span class="main-header-info user" v-if="username">
            <i class="iconfont icon-user"></i>
            {{username}}
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
            <template v-if="username">
                <a href="javascript:void(0);" class="logout" @click="logout">退出登录></a>
                <i class="iconfont icon-icon_shu shu"></i>
            </template>
            <i class="iconfont icon-jianhao" @click="hideWindow"></i>
            <i class="iconfont icon-window" @click="toggleWindowSize"></i>
            <i class="iconfont icon-guanbi1" @click="closeWindow"></i>
        </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
import { ipcRenderer, remote } from 'electron'
import { MessageBox, Message } from 'element-ui'
import { getNowFormatDate } from 'common/plugin/time'
import { removeStore, getStore } from 'common/plugin/storage'
import { loggedIn } from 'common/plugin/auth'
export default {
    data () {
        return {
            mainWindow: null,
            nowTime: ''
        }
    },
    created () {
        this.getLoginState()
        this.nowTimeCount()
        this.mainWindow = remote.getCurrentWindow()
    },
    methods: {
        getLoginState () {
            if (loggedIn()) {
                const storage = JSON.parse(getStore('userInfo'))
                this.$store.commit('UPDATEUSERINFO', {
                    username: storage.username,
                    password: storage.password
                })
            } else {
                this.$store.commit('UPDATEUSERINFO', {
                    username: null,
                    password: null
                })
            }
        },
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
                        _self.$store.commit('UPDATEUSERINFO', {
                            username: null,
                            password: null
                        })
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
        username () {
            return this.$store.state.userInfo.username
        }
    }
}
</script>
<style lang="scss">
@import '../common/css/common.scss';
.nav-bar{
    height: 30px;
    background-color: #601e39;
    padding: 0 20px;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // z-index: 1030;
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
//解决引入字体文件路径问题
//放弃这种做法，以cdn引入
// @font-face {font-family: "iconfont";
//   src: url(../common/font/iconfont.eot); /* IE9*/
//   src: url(../common/font/iconfont.eot#iefix) format('embedded-opentype'), /* IE6-IE8 */
//   url(../common/font/iconfont.woff) format('woff'), /* chrome, firefox */
//   url(../common/font/iconfont.ttf) format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
//   url(../common/font/iconfont.svg#iconfont) format('svg'); /* iOS 4.1- */
// }

// .iconfont {
//   font-family:"iconfont" !important;
//   font-size:16px;
//   font-style:normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }

// .icon-close:before { content: "\e614"; }

// .icon-jian:before { content: "\e608"; }
</style>
