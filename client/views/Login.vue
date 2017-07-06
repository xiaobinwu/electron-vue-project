<template>
    <section class="content login-content-box">
        我是登录页面
    </section>
</template>

<script>
import electron from 'electron'
export default {
    data () {
        return {
            eventsCount: electron.ipcRenderer._eventsCount
        }
    },
    mounted () {
        console.log(this.$route.query)
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.login-content-box {
    height: 590px;
    width: 1024px;
    margin: auto;
    background: url(../common/img/bg.jpg) no-repeat center center;
    background-size: cover;
    position: relative;
}
</style>