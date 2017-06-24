<template>
    <section class="pre-expired-list">
        pre-expired-list
        <el-button type="primary" class="pull-right" @click="goBack">返回主菜单</el-button>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
Vue.use(Button)
export default {
    methods: {
        goBack () {
            this.$router.replace({ path: '/' })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";

</style>