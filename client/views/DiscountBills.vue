<template>
    <section>
        <content-header title="临期品处理" sub-title="临保商品特价单申请列表" :is-add-shortcut="true"></content-header>
        <section class="discount-bill">
            <el-row :gutter="15">
                <el-col :span="20"><div class="search-container">asdasdas</div></el-col>
                <el-col :span="4"><div>asdasdas</div></el-col>
            </el-row>
        </section>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
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
.discount-bill{
    padding: 15px;
    .search-container{
        padding: 0 8px;
    }
}
</style>