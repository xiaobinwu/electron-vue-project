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
import * as electron from 'electron'
export default {
  data () {
    return {
      eventsCount: electron.ipcRenderer._eventsCount
    }
  },
  mounted () {
    // console.log(electron.remote)
    // console.log(process.getCPUUsage())
    //  HTML5 Notification API
  	let myNotification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet'
  	})
  	myNotification.onclick = () => {
      console.log('Notification clicked')
  	}
},
  components: {
    Counter
  }
}
</script>
