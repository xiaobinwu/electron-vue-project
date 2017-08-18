<template>
    <div class="clear">
        <div class="item">
            <div class="name">
                <span v-if="mytime">{{getdate}}</span> &nbsp;&nbsp;{{name}}（{{store}}）
            </div>
            <img :src="head" alt="" class="head">
            <div v-if="img">
                <img :src="img" alt="" class="img">
            </div>
            <span v-if="msg">
                {{msg}}
            </span>
        </div>
    </div>
</template>

<script>
    import { dateFormat } from 'common/js/time'
    export default{
        props: ['name', 'img', 'msg', 'head', 'mytime', 'store'],
        computed: {
            getdate () {
                return dateFormat(new Date(this.mytime), 'yyyy-MM-dd HH:mm:ss')
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../common/css/_mixins.scss";
    .clear{
        @include clearfix();
        margin-top: 10px;
        .item{
            position: relative;
            clear: both;
            display: inline-block;
            padding: 16px 40px 16px 20px;
            margin: 10px 10px 20px 10px;
            border-radius: 10px;
            background-color: rgba(25, 147, 147, 0.2);
            animation: show-chat-odd .8s ease-in;
            float: right;
            margin-right: 80px;
            color: #0AD5C1;
            .img{
                max-width: 200px;
            }
            span{
                word-break: break-all;
            }
            .time{
                position: absolute;
                top: -40px;
                width: 200px;
                height: 20px;
                right: -70px;
                text-align: right;
            }
            .name{
                position: absolute;
                top: -20px;
                width: 280px;
                height: 20px;
                right: -70px;
                text-align: right;
                overflow: hidden;
                -ms-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .head{
                position: absolute;
                top: 0;
                width: 50px;
                height: 50px;
                border-radius: 50px;
                right: -70px;
            }
            &:after{
                position: absolute;
                top: 15px;
                content: '';
                width: 0;
                height: 0;
                border-top: 15px solid rgba(25, 147, 147, 0.2);
                border-right: 15px solid transparent;
                right: -15px;
            }
        }
    }
    @keyframes show-chat-odd {
        0% {
            opacity: 0
        }

        100% {
            opacity:1
        }
    }
</style>
