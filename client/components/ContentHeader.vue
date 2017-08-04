<template>
    <section class="content-header">
        <h1>
            {{title}}
            <small>{{subTitle}}</small>
            <template v-if="!isOrdinaryHeader">
                <a href="javascript:void(0);" class="add_shortcut" v-show="!hasShortcut" @click="changeFastMenu">{{$t('btn.addToFastMenu')}}</a>
                <a href="javascript:void(0);" class="del_shortcut" v-show="hasShortcut" @click="changeFastMenu">{{$t('btn.addedToFastMenu')}}</a>
                <el-button class="header-btn" type="primary" @click="$router.go(-1)">{{$t('btn.back')}}</el-button>
            </template>
        </h1>
    </section>
</template>
<script>
import Vue from 'vue'
import { Button } from 'element-ui'
Vue.use(Button)
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String
        },
        isAddShortcut: {
            type: Boolean,
            default: false
        },
        isOrdinaryHeader: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            hasShortcut: this.isAddShortcut
        }
    },
    methods: {
        changeFastMenu () {
            this.hasShortcut = !this.hasShortcut
            this.$emit('fastmenuchange', this.hasShortcut)
        }
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
.content-header{
    position: relative;
    height: 33px;
    background-color: #fff5fa;
    padding: 0 23px;
    h1{
        @include clearfix();
        margin: 0;
        font-size: $size-h3;
        line-height: 33px;
        small{
            font-size: $size-base;
            display: inline-block;
            padding-left: 4px;
            font-weight: 300;
        }
        .header-btn{
            float: right;
            width: 148px;
            height: 30px;
            line-height: 15px;
            padding: 0;
            margin-top: 1px;
        }
    }
    .add_shortcut{
        color: $blue;
        font-size: $size-h5;
        margin-left: 30px;
        &:before {
            content: '+';
            display: inline-block;
            width: 15px;
            height: 15px;
            line-height: 15px;
            color: $white;
            border-radius: $circle-radius;
            margin-right: 3px;
            background-color: $blue;
            vertical-align: text-bottom;
            font-size: $size-base;
            text-align: center;
        }
    }
    .del_shortcut {
        color: $red;
        font-size: $size-h5;
        margin-left: 30px;
        &:after {
            content: '-';
            display: inline-block;
            width: 15px;
            height: 15px;
            line-height: 15px;
            color: $white;
            border-radius: $circle-radius;
            margin-left: 3px;
            background-color: $red;
            vertical-align: text-bottom;
            font-size: $size-base;
            text-align: center;
        }
    }
}
</style>
