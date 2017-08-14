<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" :close-on-press-escape="false" :close-on-click-modal="false" size="full" @close="cancel">
            <el-form ref="form" :model="form">
                <div class="form-table">
                    <div class="form-tr">
                        <div class="form-th">{{$t('table.barcode')}}</div>
                        <div class="form-th">{{$t('table.sku')}}</div>
                        <div class="form-th">{{$t('table.goodsName')}}</div>
                        <div class="form-th">{{$t('table.producedDate')}}</div>
                        <div class="form-th">{{$t('table.overdueDate')}}</div>
                        <div class="form-th">{{$t('table.shelfLife')}}</div>
                        <div class="form-th">{{$t('table.remainingShelfLife')}}</div>
                        <div class="form-th">{{$t('table.applyNum')}}</div>
                        <div class="form-th" v-if="!isEdit">{{$t('operating')}}</div>
                    </div>
                    <div class="form-tr" v-for="(item, index) in form.data">
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.barcode'"
                                :rules="{ required: true, message: $t('enterGroup', [$t('table.barcode')]), trigger: 'blur' }">
                                <el-input v-model="item.barcode"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.sku'"
                                :rules="{ required: true, message: $t('enterGroup', [$t('table.sku')]), trigger: 'blur' }">
                                <el-input v-model="item.sku"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.goods_name'"
                                :rules="{ required: true, message: $t('enterGroup', [$t('table.goodsName')]), trigger: 'blur' }">
                                <el-input v-model="item.goods_name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.produce_date'"
                                :rules="{  type: 'date', required: true, message: $t('selectGroup', [$t('table.producedDate')]), trigger: 'blur,change' }">
                                <el-date-picker
                                v-model="item.produce_date"
                                :placeholder="$t('table.producedDate')"
                                align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.expiry_date'"
                                :rules="{  type: 'date', required: true, message: $t('selectGroup', [$t('table.overdueDate')]), trigger: 'blur,change' }">
                                <el-date-picker
                                v-model="item.expiry_date"
                                :placeholder="$t('table.overdueDate')"
                                align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.shelf_life'"
                                :rules="[
                                  { required: true, message: $t('enterGroup', [$t('table.shelfLife')]) },
                                  { type: 'number', message: $t('enterGroup', [$t('table.num')]) }
                                ]">
                                <el-input v-model.number="item.shelf_life"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.last_shelf_life'"
                                :rules="[
                                  { required: true, message: $t('enterGroup', [$t('table.remainingShelfLife')]) },
                                  { type: 'number', message: $t('enterGroup', [$t('table.num')]) }
                                ]">
                                <el-input v-model.number="item.last_shelf_life"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td">
                            <el-form-item
                                :prop="'data.' + index + '.currentNumber'"
                                :rules="[
                                  { required: true, message: $t('enterGroup', [$t('table.applyNum')]) },
                                  { type: 'number', message: $t('enterGroup', [$t('table.num')]) }
                                ]">
                                <el-input v-model.number="item.currentNumber"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-td" v-if="!isEdit">
                            <el-button type="text" @click="deleteRow(index)" v-if="index !==0">{{$t('btn.delete')}}</el-button>
                        </div>
                    </div>
                    <div class="form-tr" v-if="!isEdit">
                        <div class="form-td">
                            <el-button @click="addRow()">{{$t('btn.add')}}</el-button>
                        </div>
                        <div class="form-td" v-for="n in 8">&nbsp;</div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="save">{{$t('save')}}</el-button>
                <el-button type="primary" @click="cancel">{{$t('cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import ajaxUrl, { commonAjax } from 'common/js/api'
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
    shelf_life: '',
    last_shelf_life: '',
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
                data: this.initFormData(this.formData)
            }
        }
    },
    methods: {
        initFormData (val) {
            const data = JSON.parse(JSON.stringify(val))
            data.forEach((item) => {
                item.produce_date = new Date(item.produce_date)
                item.expiry_date = new Date(item.expiry_date)
            })
            return data.length > 0 ? data : [JSON.parse(JSON.stringify(tplData))]
        },
        save () {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    commonAjax({
                        method: 'post',
                        url: this.isEdit ? ajaxUrl.editPreExpired : ajaxUrl.addPreExpired,
                        data: {
                            temporaryGoods: this.form.data
                        },
                        responseType: 'json'
                    })
                    .then((res) => {
                        if (res.status === 0) {
                            this.$emit('success')
                            Message({
                                message: this.$t('message.saveSuccess'),
                                type: 'success',
                                duration: 1000
                            })
                            this.$emit('update:visible', false)
                        } else {
                            Message({
                                message: this.$t('message.saveError'),
                                type: 'error',
                                duration: 1000
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        cancel () {
            this.$emit('update:visible', false)
            this.$refs['form'].resetFields()
        },
        deleteRow (index) {
            this.form.data.splice(index, 1)
        },
        addRow () {
            this.form.data.push(JSON.parse(JSON.stringify(tplData)))
        }
    },
    computed: {
        isEdit () {
            return this.formData.length !== 0
        }
    },
    watch: {
        formData (val) {
            this.form = {
                data: this.initFormData(val)
            }
        }
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
$color: rgb(236, 223, 227);
.form-table{
    width: 100%;
    display: table;
    .form-tr{
        display: table-row;
        .form-th, .form-td{
            border: 1px $color solid;
            display: table-cell;
            padding: 10px;
            text-align: center;
        }
    }
    .el-date-editor.el-input {
        width: 100%;
    }
}
</style>
