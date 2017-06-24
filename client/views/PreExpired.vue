<template>
    <section class="pre-expired">
        <el-button type="primary" class="pull-right" @click="goBack">返回主菜单</el-button>
        <div class="menu-container">
            <div class="menu-item menu-item-l">
                <router-link to="/pre_expired_list">
                    <img src="../common/img/pre-goods-1.png">
                    <p>临期品记录列表<img src="../common/img/arrow.png"></p>
                </router-link>
            </div>
            <div class="menu-item">
                <router-link to="/discount-bills">
                    <img src="../common/img/pre-goods-2.png">
                    <p>特价单申请列表<img src="../common/img/arrow.png"></p>
                </router-link>
            </div>
        </div>
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
.pre-expired {
    padding: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    .menu-container {
        text-align: center;
        width: 618px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .menu-item{
            float: left;
            font-size: 19px;
            p{
                margin-top: 5px;
                img{
                    vertical-align: sub;
                    margin-left: 5px;
                }
            }
            &.menu-item-l{
                margin-right: 100px;
            }
        }
    }
}
</style>