<template>
    <section class="content">
        <div class="front-index">
            <h2>{{$t('btn.myQuickMenu')}}</h2>
            <div class="fast-menu clearfix">
                <div class="fast-menu-item" v-for="item in fastMenus">
                    <router-link :to="item.href" :title="item.isTc ? $t(item.name) : $tc(item.name, item.tcValue)">{{item.isTc ? $t(item.name) : $tc(item.name, item.tcValue)}}</router-link>
                </div>
            </div>
        </div>
        <div class="front-gray"></div>
        <div class="front-index">
            <h2>{{$t('btn.mainMenu')}}</h2>
            <div class="front-content">
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu1.png">
                        <p>{{$t('entrance.temporaryGoods')}}</p>
                    </router-link>
                </div>
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu2.png">
                        <p>{{$t('entrance.storeDelivery')}}</p>
                    </router-link>
                </div>
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu3.png">
                        <p>{{$t('entrance.checkInspection')}}</p>
                    </router-link>
                </div>
                <div class="content-item">
                    <router-link to="/pre_expired">
                        <img src="../common/img/menu4.png">
                        <p>{{$t('entrance.suggestions')}}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getStore } from 'common/js/storage'
import electron from 'electron'
import { createNotification } from 'common/js/notification'
import { createContextMenu, createApplicationMenu } from 'common/js/menu'
export default {
    data () {
        return {
            fastMenus: [],
            eventsCount: electron.ipcRenderer._eventsCount
        }
    },
    created () {
        this.getFastMenu()
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
            title: '提示',
            body: '个人electron项目练习',
            callback: () => {
                console.log('Notification clicked')
            }
        })
    },
    methods: {
        getFastMenu () {
            let fastMenus = JSON.parse(getStore('fastMenus'))
            let fastMenusArr = []
            for (let i in fastMenus) {
                const fastMenusTempArr = fastMenus[i].split('|')
                fastMenusArr.push({
                    name: fastMenusTempArr[0],
                    isTc: typeof fastMenusTempArr[1] === 'undefined',
                    tcValue: parseInt(fastMenusTempArr[1]),
                    href: i
                })
            }
            this.fastMenus = fastMenusArr
        }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
@import "../common/css/_placeholders.scss";
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
                a{
                    padding: 0 10px;
                    display: inline-block;
                    width: 100%;
                    @extend %ellipsis;
                }
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