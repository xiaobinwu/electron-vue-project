<template>
    <section class="content login-content-box">
        <div class="login-form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checked">
                    <el-checkbox v-model="ruleForm.checked">记住我</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clickSubmit('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import { setStore } from 'common/plugin/storage'
import Vue from 'vue'
import { Form, FormItem, Button, Input, Checkbox, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(FormItem)
export default {
    data () {
        return {
            ruleForm: {
                checked: false,
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true,  message: '账号不能为空' }
                ],
                password: [
                    { required: true,  message: '密码不为空' }
                ]
            }
        }
    },
    methods: {
        clickSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.doSubmit()
                } else {
                    Message({
                        message: '请先填写账号和密码',
                        type: 'error'
                    })
                }
            })
        },
        doSubmit () {
            // ajax登录
            // ...
            // 存储localStorage
            if (this.ruleForm.username === 'xiaobin' && this.ruleForm.password === '123456') {
                // debugger
                setStore('userInfo', { username: this.ruleForm.username, password: this.ruleForm.password })
                console.log(this.$route.query.redirect)
                this.$router.replace({ path: String(this.$route.query.redirect) })
            } else {
                Message({
                    message: '账户或密码错误',
                    type: 'error'
                })
            }
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
    margin: auto;
    background: url(../common/img/bg.jpg) no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100% - 30px);
    .login-form-box {
        width: 273px;
        height: auto;
        background-color: $white;
        padding: 20px;
        position: absolute;
        top: 87px;
        right: 67px;
    }
    .el-button {
        width: 100%;
    }
}
</style>