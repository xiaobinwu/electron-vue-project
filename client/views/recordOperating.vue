<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" :close-on-press-escape="false" :close-on-click-modal="false" size="full" @close="cancel">
            <el-form ref="form" :model="form">
                <div class="form-table">
                    <div class="form-tr">
                        <div class="form-th">商品条码</div>
                        <div class="form-th">商品代码</div>
                        <div class="form-th">商品名称</div>
                        <div class="form-th">生产日期</div>
                        <div class="form-th">过期日期</div>
                        <div class="form-th">保质天数</div>
                        <div class="form-th">剩余保质天数</div>
                        <div class="form-th">当前数量</div>
                    </div>
                    <div class="form-tr" v-for="(item, index) in form.data">
                        <div class="form-td">
                            <el-form-item
                                prop="barcode"
                                :rules="[
                                  { required: true, message: '请输入商品条码', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.barcode"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="sku"
                                :rules="[
                                  { required: true, message: '请输入商品代码', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.sku"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="goods_name"
                                :rules="[
                                  { required: true, message: '请输入商品名称', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.goods_name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="produce_date"
                                :rules="[
                                  { required: true, message: '请选择生产日期', trigger: 'blur' }
                                ]"
                              >
                                <el-date-picker
                                v-model="item.produce_date"
                                placeholder="生产日期"
                                align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>

                        <div class="form-td">
                            <el-form-item
                                prop="expiry_date"
                                :rules="[
                                  { required: true, message: '请选择过期日期', trigger: 'blur' }
                                ]"
                              >
                                <el-date-picker
                                v-model="item.expiry_date"
                                placeholder="过期日期"
                                align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="shelfLife"
                                :rules="[
                                  { required: true, message: '请输入保质天数', trigger: 'blur' },
                                  { type: 'number', message: '请输入数字', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.shelfLife"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="remainingShelfLife"
                                :rules="[
                                  { required: true, message: '请输入剩余保质天数', trigger: 'blur' },
                                  { type: 'number', message: '请输入数字', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.remainingShelfLife"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                prop="currentNumber"    
                                :rules="[
                                  { required: true, message: '请输入当前数量', trigger: 'blur' },
                                  { type: 'number', message: '请输入数字', trigger: 'blur' }
                                ]"
                              >
                                <el-input v-model="item.currentNumber"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="save">保存</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import { Button, DatePicker, Input, Message, Form, FormItem, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
const tplData = {
    barcode: '',
    sku: '',
    goods_name: '',
    produce_date: '',
    expiry_date: '',
    shelfLife: '',
    remainingShelfLife: '',
    currentNumber: ''
}
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            default: false
        },
        formData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            form: {
                data: this.formData.length > 0 ? this.formData : [tplData]
            }
        }
    },
    methods: {
        save () {

        },
        cancel () {
            this.$emit('update:visible', false)
        }
    },
    computed: {
        isEdit () {
            return this.formData.length === 0
        }
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
$color: 'rgb(236, 223, 227)';
.form-table{
    display: table;
    .form-tr{
        border: 1px $color solid;
        &:not(:last-child){
            border-bottom: 0;
        } 
        display: table-row;
        .form-th, .form-td{
            &:not(:last-child){
                border-right: 1px $color solid;
            }
            display: table-cell;
            padding: 10px;
            text-align: center;
            vertical-align: middle;
        }
    }
}
</style>
