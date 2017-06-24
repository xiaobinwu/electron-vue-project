<template>
    <section>
        <content-header title="临期品处理" sub-title="临保商品特价单申请列表" :is-add-shortcut="true"></content-header>
        <section class="discount-bill">
            discount-bill
            <el-button type="primary" class="pull-right" @click="goBack">返回主菜单</el-button>
        </section>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
Vue.use(Button)
import ContentHeader from 'components/ContentHeader'
export default {
    methods: {
        goBack () {
            this.$router.replace({ path: '/' })
        }
    },
    components: {
        contentHeader: ContentHeader
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";

</style>