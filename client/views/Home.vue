<template>
    <section class="content">
        <div class="front-index">
            <h2>我的快捷菜单</h2>
            <div class="fast-menu clearfix">
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
                <div class="fast-menu-item">快捷菜单</div>
            </div>
        </div>
        <div class="front-gray"></div>
        <div class="front-index">
            <h2>主菜单</h2>
            <div class="front-content">
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu1.png">
                        <p>临期商品</p>
                    </router-link>
                </div>
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu2.png">
                        <p>门店叫货</p>
                    </router-link>
                </div>
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu3.png">
                        <p>卫检关单查询</p>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import electron from 'electron'
import { createNotification } from 'common/plugin/notification'
import { createContextMenu, createApplicationMenu } from 'common/plugin/menu'
export default {
    data () {
        return {
            eventsCount: electron.ipcRenderer._eventsCount
        }
    },
    mounted () {
        // console.log(process.getCPUUsage())
        //  HTML5 Notification API
        // 应用菜单
        // createApplicationMenu()
        // 右键菜单
        // createContextMenu([
        //     { label: 'MenuItem1', click: () => { console.log('item 1 clicked') } },
        //     { type: 'separator' },
        //     { label: 'MenuItem2', type: 'checkbox', checked: true },
        //     { label: 'MenuItem3', type: 'radio', checked: true }
        // ])
        // 通知
        createNotification({
            title: 'Title',
            body: 'Lorem Ipsum Dolor Sit Amet',
            callback: () => {
                console.log('Notification clicked')
            }
        })
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.content{
    margin-right: auto;
    margin-left: auto;
    padding: 0 40px;
    .front-index{
        h2 {
            margin: 0;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            width: calc(100% + 80px);
            margin-left: -40px;
            text-indent: 40px;
            border-bottom: 1px solid #ececec;
        }
        .fast-menu{
            padding: 20px 0;
            .fast-menu-item{
                width: 150px;
                height: 35px;
                line-height: 35px;
                background-color: #fdf1f6;
                border: 1px solid #d7b7c4;
                border-radius: 30px;
                text-align: center;
                margin-right: 20px;
                float: left;
                margin-bottom: 12px;
            }
        }
    }
    .front-gray {
        width: calc(100% + 80px);
        margin-left: -40px;
        background-color: #ecebeb;
        height: 10px;
        box-shadow: inset 0 2px 10px rgba(253,241,246,.6), inset 0 2px 1px rgba(0,0,0,.1);
    }
    .front-content {
        .content-item{
            float: left;
            margin-right: 58px;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            p{
                text-indent: -8px;
            }
        }
    }
}
</style>