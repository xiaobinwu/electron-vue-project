<template>
    <header class="nav-bar">
        <span class="main-header-info">门店管理系统</span>
        <span class="main-header-info">某某人</span>
        <span class="main-header-info time-clock"></span>
        <div class="pull-right">
            <a href="javascript:void(0);" class="logout">退出登录></a>
            <i class="iconfont icon-icon_shu shu"></i>
            <i class="iconfont icon-jianhao" @click="hideWindow"></i>
            <i class="iconfont icon-guanbi1" @click="closeWindow"></i>
        </div>
    </header>
</template>
<script>
    import { ipcRenderer, remote } from 'electron'
    export default {
        methods: {
            hideWindow () {
                const mainWindow = remote.getCurrentWindow()
                if (mainWindow.isMinimized()) {
                    return
                }
                mainWindow.minimize()
            },
            closeWindow () {
                ipcRenderer.send('close-main-window')
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
    .main-header-info,
    .logout{
        color: #e0dcde;
        line-height: 30px;
        margin-right: 10px;
        text-shadow: 0 1px 1px #000;
        font-size: $size-base;
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
        vertical-align: -webkit-baseline-middle;
    }
}
</style>
