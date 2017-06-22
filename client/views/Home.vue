<template>
  <div class="page">
    <counter></counter>
    <p>
     {{eventsCount}} To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
  <!-- <div><webview src="https://www.github.com/" allowpopups></webview></div> -->
</template>

<script>
import Counter from 'components/Counter'
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
        createApplicationMenu()
        // 右键菜单
        createContextMenu([
            { label: 'MenuItem1', click: () => { console.log('item 1 clicked') } },
            { type: 'separator' },
            { label: 'MenuItem2', type: 'checkbox', checked: true },
            { label: 'MenuItem3', type: 'radio', checked: true }
        ])
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
        Counter
    }
}
</script>
