<template>
    <footer class="main-footer"></footer>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
.main-footer{
    background: #ececec;
    height: 40px;
    color: #444;
    border-top: 1px solid #d2d6de;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1001;
    ul{
        margin: 0;
        padding: 0 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        li{
            float: left;
            height: 20px;
            line-height: 20px;
            list-style: none;
            margin-right: 10px;
            font-size: 13px;
        }
    }
}
</style>
