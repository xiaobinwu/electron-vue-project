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
                <el-form-item>
                    <el-button class="submit-btn" type="primary" @click="clickSubmit('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import { setStore } from 'common/js/storage'
import shortcut from 'common/js/shortcut'
import ajaxUrl, { commonAjax } from 'common/js/api'
import Vue from 'vue'
import { Form, FormItem, Button, Input, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
export default {
    data () {
        return {
            ruleForm: {
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
                }
            })
        },
        doSubmit () {
            commonAjax({
                method: 'post',
                url: ajaxUrl.doLogin,
                data: {
                    username: this.ruleForm.username,
                    password: this.ruleForm.password
                },
                responseType: 'json'
            })
            .then((res) => {
                if (res.status === 0) {
                    setStore('userInfo', { username: this.ruleForm.username })
                    this.$store.commit('UPDATEUSERINFO', {
                        username: this.ruleForm.username
                    })
                    this.$router.replace({ path: this.$route.query.redirect })
                } else {
                    Message({
                        message: '账户或密码错误',
                        type: 'error',
                        duration: 1000
                    })
                }
            })
        }
    },
    mounted () {
        const _self = this
        shortcut.init({
            keyCodeArr: [
                { key: 'Enter', keyCode: 13, keyDec: '回车提交', callback: () => {
                    _self.clickSubmit('ruleForm')
                } }
            ]
        })
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
    .submit-btn{
        margin-top: 22px;
    }
}
</style>