<template>
    <section class="content-header">
        <h1>
            {{title}}
            <small>{{subTitle}}</small>
            <a href="javascript:void(0);" class="add_shortcut" v-show="!isAddShortcut" @click="changeShortcut">添加至常用菜单</a>
            <a href="javascript:void(0);" class="del_shortcut" v-show="isAddShortcut" @click="changeShortcut">已添加至常用菜单</a>
        </h1>
    </section>
</template>
<script>
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
        }
    },
    methods: {
        changeShortcut () {
            this.isAddShortcut = !this.isAddShortcut
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.content-header{
    position: relative;
    height: 33px;
    background-color: #fff5fa;
    padding: 0 23px;
    h1{
        margin: 0;
        font-size: $size-h3;
        line-height: 33px;
        small{
            font-size: $size-base;
            display: inline-block;
            padding-left: 4px;
            font-weight: 300;
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
