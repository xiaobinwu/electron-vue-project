<template>
    <section class="box"> <!--box-->
        <section class="scroll-content"> <!--rightbox-->
            <section class="content"> <!--content-->
                <slot></slot>
            </section>
        </section>
        <section class="scroll-bar-container">
            <section class="scroll-bar" @mousedown="barMouseDown($event)"></section>
        </section>
    </section>
</template>
<script>
export default {
    data () {
        return {
            height: 0
        }
    },
    mounted () {
        this.$box = document.querySelector('.box')
        this.$bar = document.querySelector('.scroll-bar')
        this.$rightBox = document.querySelector('.scroll-bar-container')
        this.$contentBox = document.querySelector('.content')
        this.$scrollContent = document.querySelector('.scroll-content')
        // 算滚动块的高度
        this.$bar.style.height = this.$scrollContent.offsetHeight / this.$contentBox.offsetHeight * this.$rightBox.offsetHeight + 'px'
        this.addWheel(this.$bar, (bDown) => {
            let t = this.$bar.offsetTop
            if (bDown) {
                t += 10
            } else {
                t -= 10
            }
            this.setTop(t)
        })
    },
    methods: {
        barMouseDown (ev) {
            const oEvent = ev || window.event
            const disY = oEvent.clientY - this.$bar.offsetTop
            document.onmousemove = (ev) => {
                const oEvent = ev || window.event
                const t = oEvent.clientY - disY
                this.setTop(t)
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
                // 关闭鼠标捕获
                this.$bar.releaseCapture && this.$bar.releaseCapture()
            }
            ev.preventDefault()
        },
        addWheel (obj, fn) {
            function fnWheel (ev) {
                const oEvent = ev || window.event
                let bDown = false
                if (oEvent.wheelDelta) {
                    if (oEvent.wheelDelta < 0) {
                        bDown = true
                    } else {
                        bDown = false
                    }
                } else {
                    if (oEvent.detail > 0) {  // ff浏览器
                        bDown = true
                    } else {
                        bDown = false
                    }
                }
                fn && fn(bDown)
                oEvent.preventDefault && oEvent.preventDefault()
                return false
            }
            // ff浏览器滚动事件特殊
            if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
                obj.addEventListener('DOMMouseScroll', fnWheel, false)
            } else {
                obj.onmousewheel = fnWheel
            }
        },
        setTop (t) {
            t < 0 && (t = 0)
            t > this.$rightBox.offsetHeight - this.$bar.offsetHeight && (t = this.$rightBox.offsetHeight - this.$bar.offsetHeight)
            this.$bar.style.top = t + 'px'
            const scale = t / (this.$rightBox.offsetHeight - this.$bar.offsetHeight)
            this.$contentBox.style.marginTop = -(this.$contentBox.offsetHeight - this.$scrollContent.offsetHeight) * scale + 'px'
        }
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
.box{
    position:relative;
    height: 100%;
    .scroll-bar-container{
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 100%;
        .scroll-bar{
            border-radius: 5px;
            height: 20px;
            width: 10px;
            background:#bcbcbc;
            position:absolute;
            right: 2px;
            top:0;
            cursor: pointer;
        }
    }
    .scroll-content{
        height: 100%;
        overflow: hidden;
        padding-right: 14px;
        position: relative;
    }
}

</style>